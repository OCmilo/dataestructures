import RootedTree from "./rootedtree";
import { isDefined, Defined } from "./types";

class FreeTree {
  links: Map<Defined, Defined[]>;

  constructor() {
    this.links = new Map();
  }

  addEdge(startNode: Defined | null = null, endNode: Defined | null = null) {
    if (isDefined(startNode) && isDefined(endNode)) {
      if (this.links.size === 0) {
        this.links.set(startNode, [endNode]);
        this.links.set(endNode, [startNode]);
      } else {
        if (!this.links.has(startNode) && !this.links.has(endNode)) {
          throw new Error(
            `${startNode}-${endNode} creates an unconnected graph`
          );
        } else if (this.links.has(startNode) && !this.links.has(endNode)) {
          this.links.set(startNode, this.links.get(startNode)!.concat(endNode));
          this.links.set(endNode, [startNode]);
        } else if (this.links.has(endNode) && !this.links.has(startNode)) {
          this.links.set(endNode, this.links.get(endNode)!.concat(startNode));
          this.links.set(startNode, [endNode]);
        } else {
          throw new Error(`${startNode}-${endNode} creates a cycle`);
        }
      }
    } else {
      throw new Error("Both arguments are required");
    }
  }

  rootedTree(root: Defined | null = null) {
    if (!isDefined(root)) {
      throw new Error("root is a required parameter");
    }

    if (this.links.has(root)) {
      return this.recursiveTree(root, null);
    } else {
      throw new Error("root not found in tree nodes");
    }
  }

  private recursiveTree(node: Defined, lastNode: Defined | null): RootedTree {
    const currChildren = this.links
      .get(node)!
      .filter((elm) => elm !== lastNode);

    if (currChildren?.length === 0) {
      return new RootedTree(node);
    } else {
      return new RootedTree(
        node,
        ...currChildren?.map((child) => this.recursiveTree(child, node))
      );
    }
  }
}

export { FreeTree as default };
