import { helloService } from "../src/service/hello.service";
import { expect, describe } from '@jest/globals';

describe("check hello service", () => {
    it('should return hello world', () => {
        expect(helloService()).toBe("Hello World!");
    })
});