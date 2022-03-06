"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorType = exports.NO_HOSTNAME = exports.fromUrl = exports.ParseResultType = exports.parseDomain = void 0;
/* istanbul ignore file */
// Jest will report function coverage errors here otherwise
var parse_domain_1 = require("./parse-domain");
Object.defineProperty(exports, "parseDomain", { enumerable: true, get: function () { return parse_domain_1.parseDomain; } });
Object.defineProperty(exports, "ParseResultType", { enumerable: true, get: function () { return parse_domain_1.ParseResultType; } });
var from_url_1 = require("./from-url");
Object.defineProperty(exports, "fromUrl", { enumerable: true, get: function () { return from_url_1.fromUrl; } });
Object.defineProperty(exports, "NO_HOSTNAME", { enumerable: true, get: function () { return from_url_1.NO_HOSTNAME; } });
var sanitize_1 = require("./sanitize");
Object.defineProperty(exports, "ValidationErrorType", { enumerable: true, get: function () { return sanitize_1.ValidationErrorType; } });
//# sourceMappingURL=main.js.map