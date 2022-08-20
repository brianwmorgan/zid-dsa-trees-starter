// 'BST' CLASS DEFINITION //

class BinarySearchTree {
  // CONSTRUCTOR DEFINITION FOR THE 'BST' CLASS //

  // This constructor represents a single node in the tree. You can optionally pass in a 'key', a 'value', and a 'pointer' to the 'parent' node.
  // If the 'key' property is 'null', then the object represents an empty tree.
  // If the 'parent' pointer is 'null', then you are dealing with a root node.
  // The node STARTS with the 'left' and 'right' pointers to their child nodes being 'null' (this will change as we add nodes to the BST).
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  // BSTs support three fundamental operations: 'insert()', 'find()', and 'remove()'. You will implement these operations next

  // 'INSERT()' METHOD //

  insert(key, value) {
    // If the tree is empty, then this key being inserted is the root node of the tree.
    if (this.key == null) {
      this.key = key;
      this.value = value;
      // If the tree already exists...
    } else if (key < this.key) {
      // ...then start at the root, and compare it to the key that you want to insert.
      // If the new key is less than the node's key, then the new node needs to live in the left-hand branch.
      // If the existing node does not have a left child, meaning that the `left` pointer is empty, ...
      if (this.left == null) {
        // then you can just instantiate and insert the new node as the left child of that node, passing `this` as the parent.
        this.left = new BinarySearchTree(key, value, this);
        // If the node has an existing left child, ...
      } else {
        // ...then you recursively call the `insert()` method so that the node is added further down the tree.
        this.left.insert(key, value);
      }
      // Similarly, if the new key is greater than the node's key, then you do the same thing, but on the right-hand side.
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  // 'FIND()' METHOD //

  find(key) {
    // If the 'key' item's value is found at the root, ...
    if (this.key == key) {
      // ...then return that value.
      return this.value;
      // If the item that you are looking for is less than the root, then follow the left child.
      // If there is an existing left child, ...
    } else if (key < this.key && this.left) {
      // ...then recursively check its left and/or right child until you find the item.
      return this.left.find(key);
      // If the item that you are looking for is greater than the root, then follow the right child.
      // If there is an existing right child, ...
    } else if (key > this.key && this.right) {
      // ...then recursively check its left and/or right child until you find the item.
      return this.right.find(key);
      // Otherwise, if you have searched the entire tree and the item isn't in the tree, ...
    } else {
      // ...throw an appropriate error
      throw new Error("Key Not Found");
    }
  }

  // 'REMOVE()' METHOD //

  // Removing a node from a BST is more complex. There are three scenarios to consider:

  // Scenario 1 - The node being removed has no children
  // This is the simplest case - you simply find the node to be removed and detach it from its parent node.

  // Scenario 2 - The node being removed has one child
  // First, make the parent of the node you are removing point to its one child.
  // Second, detach the node that you want to remove from its parent.

  // Scenario 3 - The node being removed had twp children
  // This is the most complex case.
  // To accomplish this, find a "successor" node that will replace the removed node. To do so, follow these steps:
  // (1.) Find the minimum value in the right subtree.
  // (2.) Replace the value of the node to be removed with the found minimum. Now, the right subtree contains a duplicate.
  // (3.) Apply 'remove()' to the right subtree to remove the duplicate.

  // The 'remove()' method uses two helper methods: '_findMin()' and '_replaceWith()'
  // These are be inclduded / explained below.

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        // If the node only has a left child, then you replace the node with its left child.
        this._replaceWith(this.left);
      } else if (this.right) {
        // And similarly, if the node only has a right child, then you replace it with its right child.
        this._replaceWith(this.right);
      } else {
        // If the node has no children, then simply remove it and any references to it by calling `this._replaceWith(null)`.
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Not Found");
    }
  }

  // HELPER FUNCTIONS FOR 'REMOVE()' METHOD //

  // '_replaceWith()' explanation:
  // '_replaceWith()' is used to find the node you want to use to replace a node that has children.
  // If the node that you are replacing has a parent, then you need to wire up the references from the parent to the replacement node, and the replacement node back to the parent.
  // Otherwise, if the node is a root node, then you simply copy over the properties of the replacement node.

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  // '_findMin()' explanation:
  // '_findMin()' is used to find the minimum value from the right subtree.
  // When you are removing a node from the tree that has two children, you want to replace the node with the smallest node from the right subtree.

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}
