"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSIONKEY = exports.__test__ = exports.__prod__ = exports.PORT = void 0;
exports.PORT = 5000;
exports.__prod__ = parseInt(process.env.PRODUCTION) === 1;
exports.__test__ = parseInt(process.env.TESTING) === 1;
exports.SESSIONKEY = process.env.sessionKey;
