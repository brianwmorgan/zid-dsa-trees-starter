// IMPORT THE 'QUEUE' CLASS //
const Queue = require("./Queue");

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

  // '_REPLACEWITH()' EXPLANATION //

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

  // '_FINDMIN()' EXPLANATION //

  // '_findMin()' is used to find the minimum value from the right subtree.
  // When you are removing a node from the tree that has two children, you want to replace the node with the smallest node from the right subtree.

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // DEPTH-FIRST SEARCH (DFS) //

  // Depth-first search (DFS) is an algorithm for traversing or searching a tree.
  // It's typically implemented recursively.
  // You can use DFS to search a tree using in-order, pre-order, or post-order traversals
  // Each traversal will process the nodes in a different order. The sections below explore each of these traversals.

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // IN-ORDER TRAVERSALS //

  // In-order traversal means that the left branch of the node is visited, then the current node is handled, and then the right branch is visited.

  // This method accepts 'values' as a parameter, defaulted to an empty array, which is where the values of the processed nodes will be stored.
  dfsInOrder(values = []) {
    // First, process the left child node recursively
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }

    // Next, process the current node
    values.push(this.value);

    // Next, process the right child node recursively
    if (this.right) {
      values = this.right.dfsInOrder(values);
    }

    // Return the 'values' array
    return values;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // PRE-ORDER TRAVERSALS //

  // Pre-order traversal means that the current node is handled first, then the left branch of the node is visited, and then the right branch is visited.

  // This method accepts 'values' as a parameter, defaulted to an empty array, which is where the values of the processed nodes will be stored.
  dfsPreOrder(values = []) {
    // First, process the current node
    values.push(this.value);

    // Next, process the left child node recursively
    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }

    // Next, process the right child node recursively
    if (this.right) {
      values = this.right.dfsPreOrder(values);
    }

    // Return the 'values' array
    return values;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // POST-ORDER TRAVERSALS //

  // Post-order traversal means that the left branch of the node is visited, then the right branch is visited, and then the current node is handled last.

  // This method accepts 'values' as a parameter, defaulted to an empty array, which is where the values of the processed nodes will be stored.
  dfsPostOrder(values = []) {
    // First, process the left child node recursively
    if (this.left) {
      values = this.left.dfsPostOrder(values);
    }

    // Next, process the right child node recursively
    if (this.right) {
      values = this.right.dfsPostOrder(values);
    }

    // Next, process the current node
    values.push(this.value);

    // Return the 'values array
    return values;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // BREADTH-FIRST SEARCH (BFS) //

  // Breadth-first search (BFS) works across the rows of a tree.
  // In other words, the top row will be handled first, followed by the second row, and so on and so forth.
  // The tree is visited level by level. To implement a BFS algorithm, you need a first-in, first-out (FIFO) queue.
  // When you visit a node, you add it to the queue.
  // When all the nodes in the current level have been added to the queue, they are processed according to their order in the queue.
  // The nodes are then removed from the queue. Then their children are visited, adding more values onto the queue.
  // This process continues until all the nodes in the tree have been visited.

  // This method accepts two parameters:
  // (1.) 'tree', which is the node where we want to begin the tree transversal.
  // (2.) 'values', defaulted to an empty array, which is where the values of the processed nodes will be stored.
  bfs(tree, values = []) {
    // Initialize a new queue called 'queue'
    const queue = new Queue();
    // Start the traversal at the tree and add the tree node to the queue to kick off the BFS
    queue.enqueue(tree);
    // The node is removed from the queue to be processed (stored in a variable called 'node')
    let node = queue.dequeue();
    // Begin a 'while' loop to process removed nodes
    while (node) {
      // In each iteration of the loop, add that node value from the queue to an array (as long as it exists / is defined)
      values.push(node.value);
      // Add the left child to the queue (if it exists)
      if (node.left) {
        queue.enqueue(node.left);
      }
      // Add the right child to the queue (if it exists)
      if (node.right) {
        queue.enqueue(node.right);
      }
      // Set the 'node' to the next node we want to process from the queue
      node = queue.dequeue();
    }
    // When all the nodes have been processed (the queue is empty), return the final output of the 'values' array
    return values;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // SOLVING PROBLEMS WITH TREES //

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // PROBLEM #1 - FIND THE HEIGHT OF A GIVEN BST //

  // Challenge: Write an algorithm to find the height of a BST.
  // The height of a binary tree is equal to the number of edges between the root and the deepest node in the tree that has no children (the leaf node).

  // Solution: You can follow a recursive approach to solve this problem.
  // You can calculate the height for the current node, and then pass the height down as a variable to the left and right child nodes so they can evaluate their heights.
  // After traversing the entire tree, the variable will contain the result.

  // this method accepts a parameter 'currentHeight' that keeps track of the height of the current node (defaulted to '0')
  getHeight(currentHeight = 0) {
    // BASE CASE: If the current node doesn't have a left or right child, then the base case is reached, and the function can return the height.
    if (!this.left && !this.right) return currentHeight;

    // RECURSIVE CASES: Otherwise, use recursion by compute the new height.

    // First, a 'newHeight' is computed by adding '1' to the 'currentHeight'
    const newHeight = currentHeight + 1;

    // If there's no left child, recurse down the right subtree only, passing down the height of the current node.
    if (!this.left) return this.right.getHeight(newHeight);

    // Similarly, ff there's no right child, recurse down the left subtree only, passing down the height of the current node.
    if (!this.right) return this.left.getHeight(newHeight);

    // If both children exist, recurse down both subtrees, passing down the height of the current node.
    const leftHeight = this.left.getHeight(newHeight);
    const rightHeight = this.right.getHeight(newHeight);

    // Laslty, return the greater of the left or right subtree heights using 'Math.max()'.
    return Math.max(leftHeight, rightHeight);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // PROBLEM #2 - IS A GIVEN BINARY TREE A BST? //

  // Challenge: Write an algorithm to check whether an arbitrary binary tree is a BST, assuming that the tree doesn't contain duplicates.

  // Solution: You can make use of an "in-order" traversal depth-first search to solve this problem.
  // An "in-order" traversal of a BST generates a sorted array as an output.
  // Therefore, to check if a given binary tree is a BST, you can traverse the binary tree in order and ...
  // ... compare each current node's value to the previously visited node's value.
  // If the current node's value is always greater than the previously visited node's value, then the binary tree is a BST.

  isBST() {
    // Use the existing `dfsInOrder()` method to traverse the tree.
    // This method returns an array of visited nodes, which we will store in a variable called 'values'.
    const values = this.dfsInOrder();

    // Check if the array returned by the in-order DFS is a sorted array.
    for (let i = 1; i < values.length; i++) {
      // Compare the current and previous values.
      // If the current value is less than the previous value...
      if (values[i] < values[i - 1]) {
        // it is not a BST, so return 'false'.
        return false;
      }
    }
    // Otherwise, it is a BST, so return 'true'.
    return true;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // PROBLEM #3 - FIND THE THIRD-LARGEST NODE IN A BST //

  // Challenge: Write an algorithm that finds the third-largest node in a given BST.

  // Solution: You can make use of an "in-order" traversal depth-first search to solve this problem.
  // Again, you know that an in-order traversal of a BST would generate a sorted array as an output.
  // In fact, as a general rule, you can find the index position of the 'kth' largest node by subtracting 'k' from the length of the array.

  // This method accepts an integer 'k' as a parameter, which is the 'kth'-largest node we want to find.
  findKthLargestValue(k) {
    // Use the existing `dfsInOrder()` method to traverse the tree and collect the values into an array, which we will store in a variable, 'values'.
    const values = this.dfsInOrder();

    // Next, the index position of the 'kth'-largest node is computer by subtracting 'k' from the lenghth of the 'values' array.
    const kthIndex = values.length - k;

    // Ensure that the 'kth' index is within the bounds of the array.
    // If it is, ...
    if (kthIndex >= 0) {
      // ... return the value from the 'values' array at the 'kth' index ...
      return values[kthIndex];
    } else {
      // ... othewise, return an appropriate error message.
      console.error("k value exceeds the size of the BST.");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  }
}
