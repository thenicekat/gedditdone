import { Request } from 'express';
import { getGoogleOAuthTokens, getGoogleUser, googleOAuthHandler } from '../src/service/gauth.service';
import axios from 'axios';

describe('Check Google Oauth handler', () => {
    const mockRequest = {
        query: {
            code: 'mock-code'
        }
    } as unknown as Request;

    it('checks if google oauth tokens are returned', async () => {
        // Mock the axios.post function to return a mock response
        jest.spyOn(axios, 'post').mockResolvedValue({
            data: {
                id_token: 'mock-id-token',
                access_token: 'mock-access-token'
            }
        });

        const result = await getGoogleOAuthTokens({ code: 'mock-code' });
        expect(result.id_token).toBe('mock-id-token');
        expect(result.access_token).toBe('mock-access-token');
    });

    it('checks if google user information is returned', async () => {
        // Mock the axios.get function to return a mock response
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                email: 'mock-email'
            }
        });

        const result = await getGoogleUser({
            id_token: 'mock-id-token',
            access_token: 'mock-access-token'
        });
        expect(result.email).toBe('mock-email');
    });

    it('should return an error if unable to get Google OAuth tokens', async () => {
        const result = await googleOAuthHandler(mockRequest);
        expect(result.error).toBe(true);
    });

    it('should return an error if unable to get Google user information', async () => {
        const result = await googleOAuthHandler(mockRequest);
        expect(result.error).toBe(true);
    });
});
