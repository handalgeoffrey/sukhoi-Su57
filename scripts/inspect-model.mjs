/**
 * Inspect the source GLB: hierarchy, mesh bounds, materials, triangle counts.
 * Run: npm run model:inspect
 */
import { NodeIO, getBounds } from "@gltf-transform/core";
import path from "node:path";

const INPUT = path.resolve("sukhoi_su-57_felon_-_fighter_jet_-_free.glb");

const io = new NodeIO();
const doc = await io.read(INPUT);
const root = doc.getRoot();
const scene = root.listScenes()[0];

const fmt = (v) => v.toFixed(2);
const vec = (v) => `[${fmt(v[0])}, ${fmt(v[1])}, ${fmt(v[2])}]`;

const sceneBounds = getBounds(scene);
console.log("\n=== SCENE ===");
console.log("name:", scene.getName() || "(unnamed)");
console.log("min:", vec(sceneBounds.min), "max:", vec(sceneBounds.max));
console.log(
  "size:",
  vec([
    sceneBounds.max[0] - sceneBounds.min[0],
    sceneBounds.max[1] - sceneBounds.min[1],
    sceneBounds.max[2] - sceneBounds.min[2],
  ]),
);

console.log("\n=== NODES ===");
for (const node of root.listNodes()) {
  const mesh = node.getMesh();
  const t = node.getTranslation();
  const r = node.getRotation();
  const s = node.getScale();
  const parent = node.getParentNode();
  console.log(
    `- ${node.getName() || "(unnamed)"} | parent=${parent?.getName() ?? "scene"} | mesh=${mesh?.getName() ?? "-"} | t=${vec(t)} r=${vec(r)} s=${vec(s)}`,
  );
}

console.log("\n=== MESH BOUNDS (world) ===");
for (const node of root.listNodes()) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const b = getBounds(node);
  const size = [
    b.max[0] - b.min[0],
    b.max[1] - b.min[1],
    b.max[2] - b.min[2],
  ];
  let tris = 0;
  let verts = 0;
  let mats = new Set();
  for (const prim of mesh.listPrimitives()) {
    const indices = prim.getIndices();
    const position = prim.getAttribute("POSITION");
    tris += indices ? indices.getCount() / 3 : (position?.getCount() ?? 0) / 3;
    verts += position?.getCount() ?? 0;
    mats.add(prim.getMaterial()?.getName() ?? "(none)");
  }
  console.log(
    `- ${mesh.getName() || "(unnamed)"} | tris=${tris} verts=${verts} | mat=${[...mats].join(",")} | min=${vec(b.min)} max=${vec(b.max)} | size=${vec(size)} | centerX=${fmt((b.min[0] + b.max[0]) / 2)}`,
  );
}

console.log("\n=== MATERIALS ===");
for (const mat of root.listMaterials()) {
  console.log(
    `- ${mat.getName()} | baseColor=${mat.getBaseColorFactor().map(fmt).join(",")} | metallic=${mat.getMetallicFactor()} roughness=${mat.getRoughnessFactor()} | alpha=${mat.getAlphaMode()} | doubleSided=${mat.getDoubleSided()}`,
  );
}

console.log("\n=== TOTALS ===");
let totalTris = 0;
for (const mesh of root.listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    const indices = prim.getIndices();
    const pos = prim.getAttribute("POSITION");
    totalTris += indices ? indices.getCount() / 3 : (pos?.getCount() ?? 0) / 3;
  }
}
console.log("triangles:", totalTris);
console.log("meshes:", root.listMeshes().length, "nodes:", root.listNodes().length);
