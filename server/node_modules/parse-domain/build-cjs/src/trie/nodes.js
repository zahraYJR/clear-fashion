"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrGetChild = exports.createRootNode = exports.NODE_TYPE_CHILD = exports.NODE_TYPE_ROOT = void 0;
exports.NODE_TYPE_ROOT = Symbol("ROOT");
exports.NODE_TYPE_CHILD = Symbol("CHILD");
const createRootNode = () => {
    return {
        type: exports.NODE_TYPE_ROOT,
        children: new Map(),
    };
};
exports.createRootNode = createRootNode;
const createOrGetChild = (parent, label) => {
    let child = parent.children.get(label);
    if (child === undefined) {
        child = {
            type: exports.NODE_TYPE_CHILD,
            label,
            children: new Map(),
            parent,
        };
        parent.children.set(label, child);
    }
    return child;
};
exports.createOrGetChild = createOrGetChild;
//# sourceMappingURL=nodes.js.map