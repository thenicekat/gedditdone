# DOCUMENTATION

## NOTE

-   All Responses return an object of the form CustomResponse
-   All Service layer functions return an Object of the form CustomReturn

## Hello Service

### GET `/hello/`

-   Returns hello world

## Posts Service

### GET `/posts/all`

-   Received data contains all posts unless an error occurred
-   Response is of the form:

```js
{
    error: False,
    message: "Posts retrieved Successfully",
    data: []
}
```

### GET `/posts/my`

-   Received data contains all the posts posted by a particular user
-   User has to be signed in for the same and in the session
-   It takes the user email address from the request
-   Response is of the form:

```js
{
    error: False,
    message: "My posts retrieved successfully",
    data: []
}
```

### POST `/posts/create`

-   Creates a post and returns status 201 if created
-   Request's session should contain user email i.e. user should be logged in
-   JSON body should be of the form:

```json
{
    "source": string,
    "destination": string
    "costInPoints": number,
    "service": string
}
```

-   Response is of the form:
