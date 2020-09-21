import type { Defined } from "./types";

class RootedTree {
  protected data: Defined;
  protected descendants: RootedTree[];

  constructor(data: Defined, ...descendants: RootedTree[]) {
    this.data = data;
    this.descendants = descendants;
  }

  *preorder(): Generator {
    yield this;
    for (let d of this.descendants) yield* d.preorder();
  }

  *postorder(): Generator {
    for (let d of this.descendants) yield* d.postorder();
    yield this;
  }
}

export { RootedTree as default };
