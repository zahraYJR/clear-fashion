"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCEPTION = exports.WILDCARD = exports.RESET = exports.DOWN = exports.SAME = exports.UP = void 0;
// UP, SAME, DOWN, RESET should not be special regex characters in a character class.
exports.UP = "<"; // one level up
exports.SAME = ","; // same level
exports.DOWN = ">"; // one level down
exports.RESET = "|"; // reset level index and start new
exports.WILDCARD = "*"; // as defined by publicsuffix.org
exports.EXCEPTION = "!"; // as defined by publicsuffix.org
//# sourceMappingURL=characters.js.map