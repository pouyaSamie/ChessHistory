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
  _children = new Map();
  _parent = null;
  _id = uniqueId();
  _name;
  _data = null;

  constructor(name, data) {
    if (!name || typeof name !== "string" || !name.trim().length) {
      throw new Error("Name must be a non-empty String");
    }

    this._name = name;
    this._data = data;
  }

  get name() {
    return this._name;
  }
  get data() {
    return this._data;
  }

  set name(newName) {
    if (!newName || typeof newName !== "string" || !newName.trim().length) {
      throw new Error("Cannot change name.Name must be a non-empty String");
    }

    this._name = newName;
  }

  get identifier() {
    return this._id;
  }

  get children() {
    return Array.from(this._children.values());
  }

  get parentNode() {
    return this._parent;
  }

  set parentNode(newParent) {
    if (
      newParent !== this.parentNode &&
      (newParent === null || newParent instanceof Tree)
    ) {
      if (this._parent) {
        this._parent.removeChildNode(this);
      }

      this._parent = newParent;

      if (newParent) {
        newParent.appendChildNode(this);
      }
    }
  }

  get childrenCount() {
    return this._children.size;
  }

  createChildNode(name, data) {
    const newNode = new Tree(name, data);
    this._children.set(newNode.identifier, newNode);
    newNode.parentNode = this;
    return newNode;
  }

  hasChildNode(needle) {
    if (needle instanceof Tree) {
      return this._children.has(needle.identifier);
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

    this._children.set(node.identifier, node);
    node.parentNode = this;
  }

  removeChildNode(needle) {
    if (!this.hasChildNode(needle)) return;

    let removedNode;

    if (needle instanceof Tree) {
      this._children.delete(needle.identifier);
      removedNode = needle;
    } else {
      for (let child of this.children) {
        if (child.name === needle || child.identifier === needle) {
          this._children.delete(child.identifier);
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

    this._children.set(node.identifier, node);
    node.parentNode = this;
  }

  _getTreeString = (node, spaceCount = 0) => {
    let str = "\n";

    node.children.forEach((child) => {
      str += `${" ".repeat(spaceCount)}|(${child.identifier})${
        child.name
      }${this._getTreeString(child, spaceCount + 2)}`;
    });

    return str;
  };

  print() {
    console.log(`\n${this.name}${this._getTreeString(this, 2)}`);
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

  findBranchById(id) {
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

  getAllParents() {
    let parents = [];
    let node = this;
    while (node.parentNode.name != "root") {
      parents.push(node.parentNode);
      node = this.parentNode;
    }

    return parents;
  }
}
