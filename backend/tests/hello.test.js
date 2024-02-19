"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_service_1 = require("../src/service/hello.service");
const globals_1 = require("@jest/globals");
(0, globals_1.test)("check hello service", () => {
    (0, globals_1.expect)((0, hello_service_1.helloService)()).toBe("Hello World!");
});
