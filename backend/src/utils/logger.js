"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.logger = void 0;
const winston_1 = __importStar(require("winston"));
const constants_1 = require("../constants");
const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};
const customFormatter = winston_1.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] => ${level}: ${message}`;
});
exports.logger = winston_1.default.createLogger({
    levels: logLevels,
    transports: [
        new winston_1.default.transports.File({ filename: './logs/warnings.log' }),
        new winston_1.default.transports.File({ level: "error", filename: './logs/errors.log' })
    ],
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'DD-MM-YYYY T hh:mm:ss.sss A'
    }), customFormatter)
});
if (!constants_1.__prod__) {
    exports.logger.add(new winston_1.default.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp({
            format: 'DD-MM-YYYY T hh:mm:ss.sss A'
        }), customFormatter),
    }));
}
