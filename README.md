# members-only

### This is a website that allows users to post messages while hiding their identity from other users that are not members. Anyone can create an account and post messages as well as become a member.

## How to run it locally

### Clone the repository

```bash
# Clone the repository
$ git clone git@github.com:Wantonfury/members-only.git

# Navigate to the repository
$ cd members-only
```

### Prepare the client

```bash
# Navigate to the client folder
$ cd client

# Install dependencies
$ npm install
```

### Prepare the server

```bash
# Navigate to server
$ cd ../server

# Install dependencies
$ npm install
```

### Setup the .env for the server
Create a .env file with the following:
- MONGODB_URI: a link to a mongodb instance with a collection named members-only
- SECRET_KEY: A secret key
- ORIGIN: http://localhost:3001

### Starting the client and server

```bash
# From members-only run the following
$ cd server
$ npm run serverstart

$ cd ../client
$ npm start
```

### Built with:
- HTML5, CSS3, JavaScript
- ReactJS, NodeJS, Express
- MongoDB