"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gauth_service_1 = require("../src/service/gauth.service");
const axios_1 = __importDefault(require("axios"));
describe('Check Google Oauth handler', () => {
    const mockRequest = {
        query: {
            code: 'mock-code'
        }
    };
    it('checks if google oauth tokens are returned', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the axios.post function to return a mock response
        jest.spyOn(axios_1.default, 'post').mockResolvedValue({
            data: {
                id_token: 'mock-id-token',
                access_token: 'mock-access-token'
            }
        });
        const result = yield (0, gauth_service_1.getGoogleOAuthTokens)({ code: 'mock-code' });
        expect(result.id_token).toBe('mock-id-token');
        expect(result.access_token).toBe('mock-access-token');
    }));
    it('checks if google user information is returned', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the axios.get function to return a mock response
        jest.spyOn(axios_1.default, 'get').mockResolvedValue({
            data: {
                email: 'mock-email'
            }
        });
        const result = yield (0, gauth_service_1.getGoogleUser)({
            id_token: 'mock-id-token',
            access_token: 'mock-access-token'
        });
        expect(result.email).toBe('mock-email');
    }));
    it('should return an error if unable to get Google OAuth tokens', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, gauth_service_1.googleOAuthHandler)(mockRequest);
        expect(result.error).toBe(true);
    }));
    it('should return an error if unable to get Google user information', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, gauth_service_1.googleOAuthHandler)(mockRequest);
        expect(result.error).toBe(true);
    }));
});
