"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrieFromList = void 0;
const nodes_1 = require("./nodes");
const createTrieFromList = (list) => {
    const root = (0, nodes_1.createRootNode)();
    for (const rule of list) {
        let node = root;
        for (const label of rule.split(".").reverse()) {
            node = (0, nodes_1.createOrGetChild)(node, label);
        }
    }
    return root;
};
exports.createTrieFromList = createTrieFromList;
//# sourceMappingURL=create-trie.js.map