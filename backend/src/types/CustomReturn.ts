export type CustomReturn<T> = {
    error: boolean,
    data: T | null | string
}