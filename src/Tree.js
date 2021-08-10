const uniqueId = (() => {
  function* uniqueIdGenerator() {
    let id = Date.now();

    while (true) {
      yield id++;
    }
  }

  const gen = uniqueIdGenerator();

  return () => gen.next().value;
})();

export default class Tree {
  #children = new Map();
  #parent = null;
  #id = uniqueId();
  #name;
  #data = null;

  constructor(name, data) {
    if (!name || typeof name !== "string" || !name.trim().length) {
      throw new Error("Name must be a non-empty String");
    }

    this.#name = name;
    this.#data = data;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    if (!newName || typeof newName !== "string" || !newName.trim().length) {
      throw new Error("Cannot change name.Name must be a non-empty String");
    }

    this.#name = newName;
  }

  get identifier() {
    return this.#id;
  }

  get children() {
    return Array.from(this.#children.values());
  }

  get parentNode() {
    return this.#parent;
  }

  set parentNode(newParent) {
    if (
      newParent !== this.parentNode &&
      (newParent === null || newParent instanceof Tree)
    ) {
      if (this.#parent) {
        this.#parent.removeChildNode(this);
      }

      this.#parent = newParent;

      if (newParent) {
        newParent.appendChildNode(this);
      }
    }
  }

  get childrenCount() {
    return this.#children.size;
  }

  createChildNode(name) {
    const newNode = new Tree(name);
    this.#children.set(newNode.identifier, newNode);
    newNode.parentNode = this;

    return newNode;
  }

  hasChildNode(needle) {
    if (needle instanceof Tree) {
      return this.#children.has(needle.identifier);
    }

    for (let child of this.children) {
      if (child.name === needle || this.identifier === needle) {
        return true;
      }
    }

    return false;
  }

  getChildNode(nameOrId) {
    for (let child of this.children) {
      if (child.name === nameOrId || this.identifier === nameOrId) {
        return child;
      }
    }

    return null;
  }

  appendChildNode(node) {
    if (!(node instanceof Tree) || this.hasChildNode(node)) return;

    if (node === this) throw new Error("Node cannot contain itself");

    let parent = this.parentNode;
    while (parent !== null) {
      if (parent === node)
        throw new Error("Node cannot contain one of its ancestors");
      parent = parent.parentNode;
    }

    this.#children.set(node.identifier, node);
    node.parentNode = this;
  }

  removeChildNode(needle) {
    if (!this.hasChildNode(needle)) return;

    let removedNode;

    if (needle instanceof Tree) {
      this.#children.delete(needle.identifier);
      removedNode = needle;
    } else {
      for (let child of this.children) {
        if (child.name === needle || child.identifier === needle) {
          this.#children.delete(child.identifier);
          removedNode = child;
          break;
        }
      }
    }

    if (removedNode) {
      removedNode.parentNode = null;
    }
  }

  appendChildNode(node) {
    if (!(node instanceof Tree) || this.hasChildNode(node)) return;

    if (node === this) throw new Error("Node cannot contain itself");

    let parent = this.parentNode;
    while (parent !== null) {
      if (parent === node)
        throw new Error("Node cannot contain one of its ancestors");
      parent = parent.parentNode;
    }

    this.#children.set(node.identifier, node);
    node.parentNode = this;
  }

  #getTreeString = (node, spaceCount = 0) => {
    let str = "\n";

    node.children.forEach((child) => {
      str += `${" ".repeat(spaceCount)}(${child.identifier})${
        child.name
      }${this.#getTreeString(child, spaceCount + 2)}`;
    });

    return str;
  };

  print() {
    console.log(`\n${this.name}${this.#getTreeString(this, 2)}`);
  }

  traverse(cb) {
    for (let child of this.children) {
      if (cb(child) === true || child.traverse(cb) === true) {
        return true;
      }
    }
  }

  findNodeByName(name) {
    let foundNode = null;

    this.traverse((node) => {
      if (node.name === name) {
        foundNode = node;
        return true;
      }
    });

    return foundNode;
  }

  findNodeById(id) {
    let foundNode = null;

    this.traverse((node) => {
      if (node.identifier === id) {
        foundNode = node;
        return true;
      }
    });

    return foundNode;
  }

  findBranch(id) {
    let branch = [];
    let node = this.findNodeById(id);
    branch.push(node);
    while (node.parent) {
      branch.push(node.parent);
      node = node.parent;
    }

    return branch;
  }

  findAllNodesByName(name) {
    const children = [];

    this.traverse((node) => {
      if (node.name === name) {
        children.push(node);
      }
    });

    return children;
  }

  getChildrenNodes(name) {
    let node = this.findNodeByName(name);
    if (!node) return [];
    return node.#children;
  }
}
