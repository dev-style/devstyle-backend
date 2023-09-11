<!--rehype:ignore:start-->

<p align="center">
<p align="center">
  <a href="https://dev-style.com">
    <img alt="devstyle logo" src="https://raw.githubusercontent.com/artemesian/devstyle/main/src/assets/img/devstyle-white-logo.png">
  </a>
  <br/>
  <span>#Being a Developer, More Than a Job, It's a Lifestyle.</span>
  <p align="center" style="text-align: center;font-size: 20px;">
  🛍️👨🏽‍💻🚀🌐
  </p>
</p>
</p>

<!--rehype:ignore:end-->

## Devstyle's e-commerce server⚙️

### Tech

- [Express](https://expressjs.com/) - Web Framework for Node.js
- [MongoDB](https://www.mongodb.com/) - Non-Relational Database
- [NodeJS](https://nodejs.org/) - Runtime Environment
- [Admin Bro](https://www.npmjs.com/package/admin-bro) - Admin Dashboard

### Frontend project repo

[🖥️Devstyle frontend here](https://github.com/dev-style/devstyle)

## Quick Start

### Requirements

- node
- npm
- mongodb
- mongo compass _(optional)_
- postman _(optional)_

### Clone the repository

```fish
git clone https://github.com/artemesian/devstyle-backend.git

cd devstyle-backend
```

### How to install

You just have to run :

```fish
npm install
```

### Set env

```bash
cp .env.example .env
```

Open .env file and modify with your configurations

```jsx mdx:preview
MONGO_URI = "mongo_db_link_here";
PORT = "port_number";

CLOUDINARY_CLOUD_NAME = "cloudinary_cloud_name";
CLOUDINARY_API_KEY = "cloudinary_api_key";
CLOUDINARY_API_SECRET = "cloudinary_api_secret";

BCRYPT_SALT = "";
JWT_KEY = "jwt_key_link_here";

MAILCHIMP_API_KEY = "api_key";
MAILCHIMP_SERVER_PREFIX = "server_prefix";
MAILCHIMP_AUDIENCE_ID = "audience_id";

ADMIN_COOKIE_NAME = "name";
ADMIN_COOKIE_PASS = "pass";
```

### Start react server

```fish
npm start
```

### Server will be running on

[http://localhost:5000](http://localhost:5000), either open the server in `Postman` or directly in your web browser.

_on route **/** , you should get this response :_

```
"Welcome to the otherside🙂"
```

### Run or fork Devstyle postman collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8547308-84b9835b-6a4f-4c71-9951-806a2eae60fd?action=collection%2Ffork&collection-url=entityId%3D8547308-84b9835b-6a4f-4c71-9951-806a2eae60fd%26entityType%3Dcollection%26workspaceId%3D0a0e8501-6875-435e-be9c-b381f456c4ae)

### Create **any** admin user via `Postman`

<img alt="Postman register" src="./screenshots/postman register.png">

You can either proceed with `Postman` or `Admin bro` (recommended). If you continue with `Postman`, don't forget to set the **Authorization Bearer token**.

### Use Admin bro dashboard

Connect to the dashboard with an admin account at [http://localhost:5000/admin](http://localhost:5000/admin)

**NB : First create some `Size` _(a size is needed to create any goodie item )_**

## How to contribute

Just follow these steps :

- Create an issue with your fix/feature/improvement (Optionnal but recommended).
- Fork the project.
- Create a branch for your feature/update/fix(Make sure to have the latest master-branch updates).
- Create a Pull Request to develop branch.
- After a check, it will be merged to the project.

## Author

- [Artemesian](https://github.com/artemesian) - Maintainer
- [Mopi Gaetan](https://github.com/Gaetan-M)

## Join the Community💙

<p align="left">
  <a href="https://twitter.com/_devstyle">
    <img height="20" src="https://github.com/artemesian/devstyle/raw/main/src/assets/icons/twitter-white.png" />
  </a>
  &nbsp;
  &nbsp;
  <a href="https://discord.gg/anBNJBsP">
    <img height="20" src="https://github.com/artemesian/devstyle/raw/main/src/assets/icons/discord-white.png" />
  </a>
  &nbsp;
  &nbsp;
  <a href="https://api.whatsapp.com/send/?phone=237692650993&text=Hello%20_DevStyle">
    <img height="20" src="https://github.com/artemesian/devstyle/raw/main/src/assets/icons/whatsapp-white.png" />
  </a>
  &nbsp;
  &nbsp;
   <a href="https://www.facebook.com/devstyl">
    <img height="20" src="https://github.com/artemesian/devstyle/raw/main/src/assets/icons/facebook-white.png" />
  </a>
  &nbsp;
  &nbsp;
  <a href="https://www.instagram.com/_devstyle/">
    <img height="20" src="https://github.com/artemesian/devstyle/raw/main/src/assets/icons/insta-white.png" />
  </a>
  &nbsp;
  &nbsp;
  <a href="https://www.tiktok.com/@_devstyle">
    <img height="20" src="https://github.com/artemesian/devstyle/raw/main/src/assets/icons/tiktok-white.png" />
  </a>
</p>
