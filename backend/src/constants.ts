export const PORT: number = 5000;
export const __prod__ = parseInt(process.env.PRODUCTION as string) === 1;
export const __test__ = parseInt(process.env.TESTING as string) === 1;
export const SESSIONKEY: string = process.env.SESSIONKEY as string;