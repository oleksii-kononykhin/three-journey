import { Renderer, Scene } from "three";

declare var __THREE_DEVTOOLS__: any;

export function initDevtools(scene: Scene, renderer: Renderer) {
  if (typeof __THREE_DEVTOOLS__ !== "undefined") {
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("observe", { detail: scene })
    );
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("observe", { detail: renderer })
    );
  }
}
