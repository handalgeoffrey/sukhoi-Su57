/**
 * Normalize the Su-57 GLB:
 *  - center the aircraft at the origin
 *  - rotate so the nose points toward -Z
 *  - scale to a real-world-ish length of 20.1 units (meters)
 *  - write public/models/su57_raw.glb (compression happens afterwards)
 *
 * The original source file is never modified.
 * Run: npm run model:normalize
 */
import { NodeIO, getBounds } from "@gltf-transform/core";
import { Matrix4, Vector3 } from "three";
import fs from "node:fs";
import path from "node:path";

const INPUT = path.resolve("sukhoi_su-57_felon_-_fighter_jet_-_free.glb");
const OUT_DIR = path.resolve("public/models");
const OUTPUT = path.join(OUT_DIR, "su57_raw.glb");

// Set after inspecting per-mesh bounds. Nose currently points toward +X.
const NOSE_DIRECTION = "+X";
const TARGET_LENGTH = 20.1; // Su-57 length, metres (publicly reported)

const io = new NodeIO();
const doc = await io.read(INPUT);
const root = doc.getRoot();
const scene = root.listScenes()[0];

// The source model ships with landing gear extended. Remove the extended gear
// and its light so the aircraft reads as a clean flying airframe. The retracted
// gear-door node (SU57-landingOff_5) stays.
for (const name of ["SU57-landingOn_6", "SU57-landingOnLight_7"]) {
  const node = root.listNodes().find((n) => n.getName() === name);
  if (node) {
    node.getParentNode()?.removeChild(node);
    node.dispose();
    console.log("Removed node:", name);
  }
}

const bounds = getBounds(scene);
const size = new Vector3(
  bounds.max[0] - bounds.min[0],
  bounds.max[1] - bounds.min[1],
  bounds.max[2] - bounds.min[2],
);
const center = new Vector3(
  (bounds.min[0] + bounds.max[0]) / 2,
  (bounds.min[1] + bounds.max[1]) / 2,
  (bounds.min[2] + bounds.max[2]) / 2,
);

const scale = TARGET_LENGTH / size.x;
const angle = NOSE_DIRECTION === "+X" ? Math.PI / 2 : -Math.PI / 2;

// M = R_y(angle) * S(scale) * T(-center)
const translate = new Matrix4().makeTranslation(-center.x, -center.y, -center.z);
const rotateScale = new Matrix4()
  .makeRotationY(angle)
  .scale(new Vector3(scale, scale, scale));
const matrix = rotateScale.multiply(translate);

// Create a wrapper node that holds the whole original scene.
const wrapper = doc.createNode("SU57_ROOT");
for (const child of scene.listChildren()) {
  scene.removeChild(child);
  wrapper.addChild(child);
}
wrapper.setMatrix(matrix.elements);
scene.addChild(wrapper);

fs.mkdirSync(OUT_DIR, { recursive: true });
await io.write(OUTPUT, doc);

// Verify the result.
const checkDoc = await io.read(OUTPUT);
const checkScene = checkDoc.getRoot().listScenes()[0];
const b = getBounds(checkScene);
console.log("Normalized bounds:");
console.log("  min:", b.min.map((n) => n.toFixed(3)).join(", "));
console.log("  max:", b.max.map((n) => n.toFixed(3)).join(", "));
console.log(
  "  size:",
  (b.max[0] - b.min[0]).toFixed(3),
  (b.max[1] - b.min[1]).toFixed(3),
  (b.max[2] - b.min[2]).toFixed(3),
);
console.log("\nNormalized part centers:");
for (const node of checkDoc.getRoot().listNodes()) {
  const name = node.getName() || "";
  if (!/SU57-(airframe|canopy|cockpit|hud|landingOff)/.test(name)) continue;
  const pb = getBounds(node);
  console.log(
    `${name} | center=(${((pb.min[0] + pb.max[0]) / 2).toFixed(2)}, ${((pb.min[1] + pb.max[1]) / 2).toFixed(2)}, ${((pb.min[2] + pb.max[2]) / 2).toFixed(2)}) | minY=${pb.min[1].toFixed(2)} maxY=${pb.max[1].toFixed(2)}`,
  );
}
console.log("Wrote", OUTPUT);
