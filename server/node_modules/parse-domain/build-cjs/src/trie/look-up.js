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
exports.lookUpTldsInTrie = void 0;
const characters = __importStar(require("./characters"));
const lookUpTldsInTrie = (labels, trie) => {
    const labelsToCheck = labels.slice();
    const tlds = [];
    let node = trie;
    while (labelsToCheck.length !== 0) {
        const label = labelsToCheck.pop();
        const labelLowerCase = label.toLowerCase();
        if (node.children.has(characters.WILDCARD)) {
            if (node.children.has(characters.EXCEPTION + labelLowerCase)) {
                break;
            }
            node = node.children.get(characters.WILDCARD);
        }
        else {
            if (node.children.has(labelLowerCase) === false) {
                break;
            }
            node = node.children.get(labelLowerCase);
        }
        tlds.unshift(label);
    }
    return tlds;
};
exports.lookUpTldsInTrie = lookUpTldsInTrie;
//# sourceMappingURL=look-up.js.map