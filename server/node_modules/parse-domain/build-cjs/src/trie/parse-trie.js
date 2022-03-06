"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTrie = void 0;
const characters = __importStar(require("./characters"));
const nodes_1 = require("./nodes");
const parseTrie = (serializedTrie) => {
    const rootNode = (0, nodes_1.createRootNode)();
    let domain = "";
    let parentNode = rootNode;
    // Type assertion necessary here due to a TypeScript unsoundness
    // https://github.com/microsoft/TypeScript/issues/9998#issuecomment-235963457
    let node = rootNode;
    const addDomain = () => {
        node = (0, nodes_1.createOrGetChild)(parentNode, domain);
        domain = "";
    };
    for (let i = 0; i < serializedTrie.length; i++) {
        const char = serializedTrie.charAt(i);
        switch (char) {
            case characters.SAME: {
                addDomain();
                continue;
            }
            case characters.DOWN: {
                addDomain();
                parentNode = node;
                continue;
            }
            case characters.RESET: {
                addDomain();
                parentNode = rootNode;
                continue;
            }
            case characters.UP: {
                if (parentNode.type === nodes_1.NODE_TYPE_ROOT) {
                    throw new Error(`Error in serialized trie at position ${i}: Cannot go up, current parent node is already root`);
                }
                addDomain();
                parentNode = parentNode.parent;
                continue;
            }
        }
        domain += char;
    }
    if (domain !== "") {
        addDomain();
    }
    return rootNode;
};
exports.parseTrie = parseTrie;
//# sourceMappingURL=parse-trie.js.map