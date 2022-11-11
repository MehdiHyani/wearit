# WEARIT [WIP]
## Table of Contents
- [Description](#description)
- [Database ERD](#database-erd)
- [Installation](#installation)
- [Credits](#credits)
- [License](#license)
## Description

WEARIT is an inventory management platform for the dummy line of clothes' called <i><b>WEARIT</b></i>

- Initially, the motivation behind this project is the strive for showing a good project design skills and to build an open source platform for fellow devs having the same goal
- Our project mainly solves the problem of digitalization, hence removing the need for being physically in the store to view what it offers
## Database ERD
![Database ERD](./db_erd.png)

## Installation

### Requirements
- NodeJs (Preferably node 16+)
- PostgreSQL
### Good to have
- Postman
- pgAdmin

### Install Yarn
If you want to use npm or you already have yarn installed please feel free to skip this section.

```console
$ npm i -g yarn
```
### Backend setup
#### Install dependencies
Run the following scripts to install all dependencies on your backend
```console
$ cd backend
$ yarn // or npm i if you're using mpm
```
### Migrating the database
Run the following script to migrate your postgres database
(Make sure you have your env file setup)
```console
$ yarn db:migrate // or npm run db:migrate if you're using mpm
```
#### Seeding the database
Run the following scripts to seed dummy data to your database
(Feel free to alter the seedData)
```console
$ yarn db:seed // or npm run db:seed if you're using mpm
```
### Running express
Run the following script to run express
```console
$ yarn dev // or npm run dev if you're using mpm
```

### Frontend setup
#### Install dependencies
Run the following scripts to install all dependencies on your frontend
```console
$ cd frontend
$ yarn // or npm i if you're using mpm
```
### Running react
Run the following script to run react
```console
$ yarn start // or npm start if you're using mpm
```
## Credits

Collaborators:
- [Ossama Essfadi](https://github.com/essfadi)
- [Sami Elarif](https://github.com/002fox)

## License
MIT
