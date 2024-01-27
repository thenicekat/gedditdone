import { helloService } from "../src/service/hello.service";
import { expect, test } from '@jest/globals';

test("check hello service", () => {
    expect(helloService()).toBe("Hello World!");
});