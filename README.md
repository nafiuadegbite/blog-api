# Blog RESTful API

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3309be1bea7c46c6abc5a467ec86381e)](https://www.codacy.com/gh/nafiuadegbite/blog-api/dashboard?utm_source=github.com\&utm_medium=referral\&utm_content=nafiuadegbite/blog-api\&utm_campaign=Badge_Grade)

> This is a simple blogging service provide **REST API** for consumer to build their own blogging platform on demand.

## Features

* Authentication with JWT
* User Create, Read, Update and Delete (CRUD) operations
* CRUD operations for blog post
* Pagination and search where necessary
* API Security (NoSQL Injections, XSS Attacks, http param pollution etc)

## API Documentation

Hosted on vercel: [Blog API](https://blog-api-flax.vercel.app/)\
Extensive and testing documentation with postman: [Blog API](https://documenter.getpostman.com/view/12586388/2s8YYFt4dh)

## Requirements

* NodeJS
* MongoDB

## Configuration File

Modify the config/.env file to your environment variables, and set your JWT\_SECRET.

```plaintext
PORT=8000
MONGO_URL=YOUR_URL
JWT_SECRET=YOUR_SECRET
JWT_EXPIRE=1h
JWT_COOKIE_EXPIRE=1

```

## Installation

Install all dependencies

```plaintext
npm install

```

## Start Server

```plaintext
npm start

```

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

## Endpoints

- [Blog RESTful API](#blog-restful-api)
  - [Features](#features)
  - [API Documentation](#api-documentation)
  - [Requirements](#requirements)
  - [Configuration File](#configuration-file)
  - [Installation](#installation)
  - [Start Server](#start-server)
  - [Endpoints](#endpoints)
  - [Blog](#blog)
    - [1. GET All Published Articles](#1-get-all-published-articles)
      - [PAGINATION](#pagination)
      - [SEARCH, SELECT AND SORT IN COLLECTIONS](#search-select-and-sort-in-collections)
      - [I. Example Request: GET All Published Articles](#i-example-request-get-all-published-articles)
      - [I. Example Response: GET All Published Articles](#i-example-response-get-all-published-articles)
    - [2. Get Single Published Article](#2-get-single-published-article)
      - [I. Example Request: New Request](#i-example-request-new-request)
      - [I. Example Response: New Request](#i-example-response-new-request)
    - [3. Create Article](#3-create-article)
      - [I. Example Request: Create Article](#i-example-request-create-article)
      - [I. Example Response: Create Article](#i-example-response-create-article)
    - [4. Update Article](#4-update-article)
      - [I. Example Request: Update Article](#i-example-request-update-article)
      - [I. Example Response: Update Article](#i-example-response-update-article)
    - [5. Delete Article](#5-delete-article)
      - [I. Example Request: Delete Article](#i-example-request-delete-article)
      - [I. Example Response: Delete Article](#i-example-response-delete-article)
    - [6. Article List Per User](#6-article-list-per-user)
      - [I. Example Request: Article List Per User](#i-example-request-article-list-per-user)
      - [I. Example Response: Article List Per User](#i-example-response-article-list-per-user)
  - [Users](#users)
    - [1. Register User](#1-register-user)
      - [I. Example Request: Register User](#i-example-request-register-user)
      - [I. Example Response: Register User](#i-example-response-register-user)
    - [2. Login User](#2-login-user)
      - [I. Example Request: Login User](#i-example-request-login-user)
      - [I. Example Response: Login User](#i-example-response-login-user)
    - [3. Profile](#3-profile)
      - [I. Example Request: Profile](#i-example-request-profile)
      - [I. Example Response: Profile](#i-example-response-profile)
    - [4. Logout](#4-logout)
      - [I. Example Request: Logout](#i-example-request-logout)
      - [I. Example Response: Logout](#i-example-response-logout)
    - [5. Update User's Detail](#5-update-users-detail)
      - [I. Example Request: Update User's Detail](#i-example-request-update-users-detail)
      - [I. Example Response: Update User's Detail](#i-example-response-update-users-detail)
  - [Coded by Nafiu Adegbite](#coded-by-nafiu-adegbite)

***

## Blog

### 1. GET All Published Articles

Fetch all the published articles from the database with pagination also you can search, select and sort post.

#### PAGINATION

| **Query** | **Description** |
| --- | --- |
| ?page=1 | The page number |
| ?limit=20 | The number of items per page |

#### SEARCH, SELECT AND SORT IN COLLECTIONS

| **Query** | **Description** |
| --- | --- |
| ?title=hello | Search the published articles where title equals hello (title and the value can be anything in the collection) |
| ?authorName=Nafiu | Search the published articles where author name equals Nafiu |
| ?tags=love | Search the published articles where tag equals love |
| ?sort=-read\_count | Get data in descending order using that field |
| ?sort=read\_count | Get data in ascending order using that field |

***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:8000/api/v1/blog
```

***More example Requests/Responses:***

#### I. Example Request: GET All Published Articles

***Body: None***

#### I. Example Response: GET All Published Articles

```js
{
    "pagination": {},
    "publishedArticles": [
        {
            "_id": 1,
            "body": "First post here",
            "created_at": "2022-10-29T04:22:47.899Z",
            "description": "First",
            "state": "published",
            "tags": [
                "first",
                "one"
            ],
            "title": "My first post",
            "updated_at": "2022-11-04T05:44:25.453Z",
            "read_count": 17
        },
        {
            "_id": 9,
            "author": {
                "first_name": "Nafiu",
                "last_name": "Adegbite"
            },
            "body": "Second post here",
            "created_at": "2022-11-01T18:08:16.253Z",
            "description": "Second",
            "read_count": 7,
            "state": "published",
            "tags": [
                "second",
                "one"
            ],
            "title": "My tenth post",
            "updated_at": "2022-11-01T22:18:14.555Z"
        },
        {
            "_id": 10,
            "author": {
                "first_name": "Nafiu",
                "last_name": "Adegbite"
            },
            "body": "Love all",
            "created_at": "2022-11-02T13:16:52.275Z",
            "description": "Second",
            "read_count": 2,
            "state": "published",
            "tags": [
                "second",
                "one"
            ],
            "title": "Love",
            "updated_at": "2022-11-04T05:44:32.901Z"
        },
        {
            "_id": 12,
            "author": {
                "first_name": "Nafiu",
                "last_name": "Adegbite"
            },
            "authorName": "Nafiu",
            "body": "Love all Business demands continuous delivery of value. Value is created only when a product is delivered to a satisfied customer. It's not created when one silo in the process is completed. It demands that you reset focus from silos to an end-to-end flow of value. The core idea is to create a repeatable, reliable, and incrementally-improving process for taking software from concept to customer. The goal is to enable a constant flow of changes into production via an automated software production line. Think of it as a pipeline. The pipeline breaks down the software delivery process into stages. Each stage aims to verify the quality of new features from a different angle to validate the new functionality and prevent errors from affecting your users. The pipeline should provide feedback to the team. Also, visibility into the changes flows to everyone involved in delivering the new feature(s). A delivery pipeline enables the flow of more minor changes more frequently, with a focus on flow. Your teams can concentrate on optimizing the delivery of changes that bring quantifiable value to the business. This approach leads teams to continuously monitor and learn where they're finding obstacles, resolve those issues, and gradually improve the pipeline's flow. As the process continues, the feedback loop provides new insights into new issues and barriers to be resolved. The pipeline is the focus of your continuous improvement loop.",
            "created_at": "2022-11-05T06:31:34.020Z",
            "description": "Second",
            "read_count": 3,
            "reading_time": "2 minutes",
            "state": "published",
            "tags": [
                "tech"
            ],
            "title": "Tech",
            "updated_at": "2022-11-05T06:46:28.403Z"
        }
    ]
}
```

***Status Code:*** 200

### 2. Get Single Published Article

Fetch single published articles from the database with an id

***Endpoint:***

```bash
Method: GET
Type: 
URL: 
```

***More example Requests/Responses:***

#### I. Example Request: New Request

***Body: None***

#### I. Example Response: New Request

```js
{
    "_id": 14,
    "__v": 0,
    "author": {
        "first_name": "Nafiu",
        "last_name": "Adegbite"
    },
    "authorName": "Nafiu",
    "body": "Love all Business demands continuous delivery of value.",
    "created_at": "2022-11-05T18:45:27.260Z",
    "description": "Second",
    "read_count": 16,
    "reading_time": "1 minute",
    "state": "published",
    "tags": [
        "tech"
    ],
    "title": "2a2b42",
    "updated_at": "2022-11-05T20:33:02.510Z"
}
```

***Status Code:*** 200

### 3. Create Article

Add article to the database and return the created post.

***Endpoint:***

```bash
Method: POST
Type: 
URL: localhost:8000/api/v1/blog
```

***More example Requests/Responses:***

#### I. Example Request: Create Article

***Body:***

```js
{
  "title": "Hello World",
  "description": "Second",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "tags": [
    "tech"
  ]
}
```

#### I. Example Response: Create Article

```js
{
    "message": "Article Created",
    "article": {
        "title": "Hello World",
        "description": "Second",
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "tags": [
            "tech"
        ],
        "author": 6,
        "reading_time": "1 minute",
        "authorName": "Nafiu",
        "_id": 34
    }
}
```

***Status Code:*** 201

### 4. Update Article

Modify article in the database using article ID.

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: localhost:8000/api/v1/blog/12
```

***Body:***

```js
{
  "state": "published"
}
```

***More example Requests/Responses:***

#### I. Example Request: Update Article

***Body:***

```js
{
  "state": "published"
}
```

#### I. Example Response: Update Article

```js
{
    "message": "Article Updated"
}
```

***Status Code:*** 201

### 5. Delete Article

Delete article from the database using article ID.

***Endpoint:***

```bash
Method: GET
Type: 
URL: 
```

***More example Requests/Responses:***

#### I. Example Request: Delete Article

***Body: None***

#### I. Example Response: Delete Article

```js
{
    "message": "Article deleted successfully"
}
```

***Status Code:*** 200

### 6. Article List Per User

***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:8000/api/v1/blog/list
```

***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 5 |  |

***More example Requests/Responses:***

#### I. Example Request: Article List Per User

***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 5 |  |

***Body: None***

#### I. Example Response: Article List Per User

```js
{
    "pagination": {
        "next": {
            "page": 2,
            "limit": 5
        }
    },
    "articleList": [
        {
            "_id": 9,
            "__v": 0,
            "author": 2,
            "body": "Second post here",
            "created_at": "2022-11-01T18:08:16.253Z",
            "description": "Second",
            "read_count": 7,
            "state": "published",
            "tags": [
                "second",
                "one"
            ],
            "title": "My tenth post",
            "updated_at": "2022-11-01T22:18:14.555Z"
        },
        {
            "_id": 10,
            "__v": 0,
            "author": 2,
            "body": "Love all",
            "created_at": "2022-11-02T13:16:52.275Z",
            "description": "Second",
            "read_count": 2,
            "state": "published",
            "tags": [
                "second",
                "one"
            ],
            "title": "Love",
            "updated_at": "2022-11-04T05:44:32.901Z"
        },
        {
            "_id": 12,
            "__v": 0,
            "author": 2,
            "authorName": "Nafiu",
            "body": "Love all Business demands continuous delivery of value. Value is created only when a product is delivered to a satisfied customer. It's not created when one silo in the process is completed. It demands that you reset focus from silos to an end-to-end flow of value. The core idea is to create a repeatable, reliable, and incrementally-improving process for taking software from concept to customer. The goal is to enable a constant flow of changes into production via an automated software production line. Think of it as a pipeline. The pipeline breaks down the software delivery process into stages. Each stage aims to verify the quality of new features from a different angle to validate the new functionality and prevent errors from affecting your users. The pipeline should provide feedback to the team. Also, visibility into the changes flows to everyone involved in delivering the new feature(s). A delivery pipeline enables the flow of more minor changes more frequently, with a focus on flow. Your teams can concentrate on optimizing the delivery of changes that bring quantifiable value to the business. This approach leads teams to continuously monitor and learn where they're finding obstacles, resolve those issues, and gradually improve the pipeline's flow. As the process continues, the feedback loop provides new insights into new issues and barriers to be resolved. The pipeline is the focus of your continuous improvement loop.",
            "created_at": "2022-11-05T06:31:34.020Z",
            "description": "Second",
            "read_count": 18,
            "reading_time": "2 minutes",
            "state": "published",
            "tags": [
                "tech"
            ],
            "title": "Tech",
            "updated_at": "2022-11-05T22:44:43.136Z"
        },
        {
            "_id": 13,
            "__v": 0,
            "author": 2,
            "authorName": "Nafiu",
            "body": "Love all Business demands continuous delivery of value.",
            "created_at": "2022-11-05T18:38:59.002Z",
            "description": "Second",
            "read_count": 2,
            "reading_time": "1 minute",
            "state": "published",
            "tags": [
                "tech"
            ],
            "title": "89753c",
            "updated_at": "2022-11-06T05:15:13.875Z"
        },
        {
            "_id": 14,
            "__v": 0,
            "author": 2,
            "authorName": "Nafiu",
            "body": "Love all Business demands continuous delivery of value.",
            "created_at": "2022-11-05T18:45:27.260Z",
            "description": "Second",
            "read_count": 18,
            "reading_time": "1 minute",
            "state": "published",
            "tags": [
                "tech"
            ],
            "title": "2a2b42",
            "updated_at": "2022-11-06T02:06:23.479Z"
        }
    ]
}
```

***Status Code:*** 200

## Users

### 1. Register User

Add User to the database

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:8000/api/v1/user/register
```

***Body:***

```js
{
  "email": "naf@hotmail.com",
  "first_name": "Nafiu",
  "last_name": "Adegbite",
  "password": "456789"
}
```

***More example Requests/Responses:***

#### I. Example Request: Register User

***Body:***

```js
{
  "email": "naf@hotmail.com",
  "first_name": "Nafiu",
  "last_name": "Adegbite",
  "password": "456789"
}
```

#### I. Example Response: Register User

```js
{
    "success": "true",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjY3Njg3MTUwLCJleHAiOjE2Njc2OTA3NTB9.pc1HcP4s0gyvDVQsAcjaWp9V-1qme1MrwXQ6_sPR9LE"
}
```

***Status Code:*** 201

### 2. Login User

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:8000/api/v1/user/login
```

***Body:***

```js
{
  "email": "naf@hotmail.com",
  "password": "456789"
}
```

***More example Requests/Responses:***

#### I. Example Request: Login User

***Body:***

```js
{
  "email": "ade@gmail.com",
  "password": "123456"
}
```

#### I. Example Response: Login User

```js
{
    "success": "true",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY3Njg3NDU4LCJleHAiOjE2Njc2OTEwNTh9.HAyzV2TVL213ZlS2j-_cexep12mmzYTMFrgWDpRNL5o"
}
```

***Status Code:*** 200

### 3. Profile

***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:8000/api/v1/user/profile
```

***More example Requests/Responses:***

#### I. Example Request: Profile

***Body: None***

#### I. Example Response: Profile

```js
{
    "_id": 6,
    "articles": [
        {
            "_id": 34,
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "title": "Hello World"
        }
    ],
    "createdAt": "2022-11-05T22:25:36.766Z",
    "email": "naf@hotmail.com",
    "first_name": "Nafiu",
    "last_name": "Adegbite"
}
```

***Status Code:*** 200

### 4. Logout

Clear token cookie

***Endpoint:***

```bash
Method: GET
Type: 
URL: 
```

***More example Requests/Responses:***

#### I. Example Request: Logout

***Body: None***

#### I. Example Response: Logout

```js
{
    "message": "Logged out"
}
```

***Status Code:*** 200

### 5. Update User's Detail

Update user's details in the database.

***Endpoint:***

```bash
Method: PUT
Type: 
URL: localhost:8000/api/v1/user/updatedetails
```

***More example Requests/Responses:***

#### I. Example Request: Update User's Detail

***Body:***

```js
{
    "last_name": "Ade"
}
```

#### I. Example Response: Update User's Detail

```js
{
    "message": "Details updated successfully"
}
```

***Status Code:*** 201

## Coded by Nafiu Adegbite

Reach me on twitter [@AdegbiteNafiu](https://www.twitter.com/AdegbiteNafiu)

***

[Back to top](#blog-restful-api)

> Generated at 2022-11-07 13:23:02 by [docgen](https://github.com/thedevsaddam/docgen)
