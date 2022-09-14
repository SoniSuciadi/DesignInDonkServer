# API DOCUMENTATION DESIGNINDONK

---

> ## ENDPOINT

### Berikut merupakan list Endpoints yang tersedia :

```
- POST /users/login
- POST /users/login-google
- POST /users/register
- GET /user/confirm
- GET /user/forgot
- PATCH /user
- PUT /user
- GET /categories
- GET /posts
- POST /posts
- GET /posts/count
- GET /posts/:id
- PUT /posts/:id
- GET /posts/user/:id
- GET /chats
- POST /chats
- POST /chats/id
```

## 1. POST /users/login

### Deskripsi

- Mendapatkan data user dan access token dengan memasukan email dan password yang valid

### Request

- Body

```json
{
   "email": String,
   "password":String
}
```

### Response

- 200-OK

```json
{
  "statusCode": 200,
  "msg": "Success Login",
  "id": "Integer",
  "username": "String",
  "imgUrl": "String",
  "access_token": "String"
}
```

- 400-Bad Request

```json
{
  "statusCode": 400,
  "msg": "Invalid Email or Password",
  "error": "Object"
}
```

- 401-Unauthorized

```json
{
  "statusCode": 401,
  "msg": "Invalid Email or Password",
  "error": "Object"
}
```

## 2. POST /users/login-google

### Deskripsi

- mendapatkan data user dan access token dengan mengirimkan token google

### Request

- body

```json
{
  "google_token": "String"
}
```

### Response

- 200-OK

```json
{
  "statusCode": 200,
  "msg": "Success Login",
  "id": "Integer",
  "username": "String",
  "imgUrl": "String",
  "access_token": "String"
}
```

## 3. POST /users/register

### Deskripsi

- Membuat user baru kedalam database

### Request

- body

```json
{
  "fullName": "String",
  "email": "String",
  "password": "String"
}
```

### Response

- 200-OK

```json
{
  "message": "Success register check you email"
}
```

- 400-Bad Request

```json
{
  "message": "Email is require"
}
OR
{
  "message": "Password is require"
}
OR
{
  "message": "Email must be uniqe"
}
```

## 4. GET /users/confirm

### Deskripsi

- Mengubah status user dari **Not Active** menjadi **Active**

### Request

- query

```json
{
  "token": "String"
}
```

### Response

- 200-OK

```json
{
  "message": "Congrastt your account is active now"
}
```

- 401-Unauthorized

```json
{
  "message": "Token invalid"
}
```

## 5. GET /users/forgot

### Deskripsi

- Mengirimkan link reset password ke email user

### Request

- query

```json
{
  "token": "String"
}
```

### Response

- 200-OK

```json
{
  "message": "Congrastt your account is active now"
}
```

- 401-Unauthorized

```json
{
  "message": "Token invalid"
}
```

## 6. PATCH /users/

### Deskripsi

- Mengubah password user

### Request

- body

```json
{
  "newPassword": "String"
}
```

### Response

- 200-OK

```json
{
  "message": "Password User With Id ${id} Success Updated"
}
```

- 401-Unauthorized

```json
{
  "message": "Token invalid"
}
```

## 7. PUT /users

### Deskripsi

- Mengubah data user

### Request

- body

```json
{
  "fullName": "String",
  "imgUrl": "String",
  "phoneNumber": "String"
}
```

- headers

```json
{
  "access_token": "String"
}
```

### Response

- 200-OK

```json
{
  "message": "Data User With Id ${id} Success Updated"
}
```

- 401-Unauthorized

```json
{
  "message": "Token invalid"
}
```

## 8. GET /categories

### Deskripsi

- mendapatkan semua list category

### Response

- 200-OK

```json
{
  "statusCode": 200,
  "categories": "Array"
}
```

## 9. GET /post

### Deskripsi

- Mendapatkan postingan semua user

### Request

- query

```json
{
  "search": "String",
  "category": "String",
  "subCategory": "String",
  "skip": "Integer"
}
```

### Response

- 200-OK

```json
{
  "statusCode": 200,
  "posts": "Array"
}
```

- 404-Not found

```json
{
  "statusCode": 404,
  "msg": "Data not found"
}
```

## 10. POST /posts

### Deskripsi

- Menambahkan postingan sesuai dengan user lang login

### Request

- headers

```json
{
  "access_token": "String"
}
```

- Body

```json
{
  "title": "String",
  "descriptiom": "String",
  "imgUrl": "String",
  "category": "String",
  "subCategory": "String"
}
```

### Response

- 201-Created

```json
{
  "statusCode": 201,
  "message": "Post with id  successfully add to user with id "
}
```

- 401-Unauthorized

```json
{
  "statusCode": 401,
  "message": "Token invalid"
}
```

- 400-Bad Request

```json
{
  "statusCode": 400,
  "message": "Title is require"
}
OR
{
  "statusCode": 400,
  "message": "Description is require"
}
OR
{
  "statusCode": 400,
  "message": "ImgUrl is require"
}
OR
{
  "statusCode": 400,
  "message": "category is require"
}
OR
{
  "statusCode": 400,
  "message": "subCategory is require"
}
```

## 11. GET /posts/count

### Deskripsi

- Mendapatkan total jumlah post berdasarkan filter

### Request

- query

```json
{
  "search": "String",
  "category": "String",
  "subCategory": "String",
  "skip": "Integer"
}
```

### Response

- 200-OK

```json
{
  "statusCode": 200,
  "countPost": "Integer"
}
```

## 12. GET /posts/:id

### Deskripsi

- Mendapatkan postingan by id yang dikirim

### Request

- params

```json
{
  "id": "Integer"
}
```

### Response

- 200-OK

```json
{
  "statusCode": 200,
  "posts": "Array"
}
```

- 404-Not found

```json
{
  "statusCode": 404,
  "msg": "Data not found"
}
```

## 13. PUT /posts/:id

### Deskripsi

- Megubah data postingan sesuai id yang di kirim

### Request

- headers

```json
{
  "access_token": "String"
}
```

- Body

```json
{
  "title": "String",
  "descriptiom": "String",
  "imgUrl": "String",
  "category": "String",
  "subCategory": "String"
}
```

### Response

- 200-OK

```json
{
  "statusCode": 200,
  "message": "Post with id  successfully edited "
}
```

- 401-Unauthorized

```json
{
  "statusCode": 401,
  "message": "Token invalid"
}
```

- 400-Bad Request

```json
{
  "statusCode": 400,
  "message": "Title is require"
}
OR
{
  "statusCode": 400,
  "message": "Description is require"
}
OR
{
  "statusCode": 400,
  "message": "ImgUrl is require"
}
OR
{
  "statusCode": 400,
  "message": "category is require"
}
OR
{
  "statusCode": 400,
  "message": "subCategory is require"
}
```

## 14. GET /posts/user/:id

### Deskripsi

- Mendapatkan semua postingan user yang di cari berdasarkan id dikirim

### Request

```json
{
  "id": "Integer"
}
```

### Response

- 200-OK

```json
{
  "statusCode": 200,
  "posts": "Array"
}
```

- 404-Not found

```json
{
  "statusCode": 404,
  "msg": "Data not found"
}
```

## 15. GET /chats

### Deskripsi

- Mendapatkan semua room chat user

### Request

- headers

```json
{
  "access_token": "String"
}
```

### Response

- 200-OK

```json
[
  {
    "_id": "Integer",
    "member": "Array"
  }.....
]
```

- 401-Unauthorized

```json
{
  "statusCode": 401,
  "message": "Token invalid"
}
```

## 16. POST /chats

### Deskripsi

- Mengirim pesan kepada user lain

### Request

- headers

```json
{
  "access_token": "String"
}
```

- body

```json
{
  "id": "Integer",
  "pesan": "String",
  "imgUrl": "String"
}
```

### Response

- 200-OK

```json
[
  {
    "_id": "Integer",
    "member": "Array"
  }.....
]
```

- 401-Unauthorized

```json
{
  "statusCode": 401,
  "message": "Token invalid"
}
```

- 404-Not found

```json
{
  "statusCode": 404,
  "msg": "Data not found"
}
```

## 17. GET /chats/id

### Deskripsi

- Mendapatkan chat by user id yang dikirim

### Request

- headers

```json
{
  "access_token": "String"
}
```

- body

```json
{
  "id": "Integer"
}
```

### Response

- 200-OK

```json
[
  {
    "_id": "Integer",
    "member": "Array",
    "messages": "Array"
  }
]
```

- 401-Unauthorized

```json
{
  "statusCode": 401,
  "message": "Token invalid"
}
```

- 404-Not found

```json
{
  "statusCode": 404,
  "msg": "Data not found"
}
```

> Global Error

- 401-Unauthorized

```json
{
  "message": "Token invalid"
}
```

- 404-Forbiden

```json
{
  "statusCode": 403,
  "message": "You not Authorized"
}
```

- 500-Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Internal Server Error"
}
```
