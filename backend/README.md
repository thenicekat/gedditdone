# Geddit - Backend

-   Tech Stack: Express + Prisma + Typescript
-   Prisma Scheme takes care of all the database schemas and the structures
-   Whenever you update your Prisma schema, you will need to run the prisma db push command to create new indexes and regenerate Prisma Client.
-   Run dev environment using `yarn dev`
-   Run production environment using `yarn start`
-   Run tests using `yarn test`

## Sample

1. Service

```js
export const helloService = () => {
    return "Hello World!";
};
```

2. Route

```js
helloRouter.get("/", (_, res) => {
    const response: CustomResponse = {
        err: false,
        message: helloService(),
        data: null,
    };

    res.status(HttpCodes.OK).json(response);
});
```

3. Test

```js
test("check hello service", () => {
    expect(helloService()).toBe("Hello World!");
});
```