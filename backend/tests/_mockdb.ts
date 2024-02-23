import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from '../src/db'

jest.mock('../src/db.ts', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>