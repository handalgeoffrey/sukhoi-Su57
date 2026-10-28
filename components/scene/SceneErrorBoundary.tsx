"use client";

import { Component, type ReactNode } from "react";

type SceneErrorBoundaryProps = {
  children: ReactNode;
  onError: (message: string) => void;
};

type SceneErrorBoundaryState = {
  failed: boolean;
};

/** Catches WebGL / GLTF failures so the static dossier can take over. */
export class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[SU-57] 3D scene failed", error);
    this.props.onError("model");
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
