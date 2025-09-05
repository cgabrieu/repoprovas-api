## RepoProvas API 📚

<div align="center">
  <h4>This is the backend repo, access the frontend repo <a href="https://github.com/cgabrieu/repoprovas-front">here</a>.</h4>
  <a href="https://repoprovas-cgabrieu.herokuapp.com">
    <img src="" width="300px">
  </a>
    <br />
    <a href="https://repoprovas-cgabrieu.herokuapp.com">View</a>
    <br />
</div>
  
<br/>

## About

RepoProvas is a collaborative platform where students can share and access past exams to better prepare for tests. You can add new courses, teachers, and subjects, as well as upload exams directly through the app. It makes studying easier by organizing academic materials in one place.
    
<br/>

## Technologies

Tools that were used in the project:
<p>
  <img src='https://img.shields.io/badge/Typescript-000000?style=for-the-badge&logo=typescript'>
  <img src='https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs'>
  <img src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express'>
  <img src='https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql'>
  <img src='https://img.shields.io/badge/typeorm-000000?style=for-the-badge&logo=typeorm'>
  <img src='https://img.shields.io/badge/eslint-000000?style=for-the-badge&logo=eslint&logoColor=472fb9'>
  <img src='https://img.shields.io/badge/npm-000000?style=for-the-badge&logo=npm'>
  <img src='https://img.shields.io/badge/Heroku-000000?style=for-the-badge&logo=heroku&logoColor=410093'>
</p>

<br/>

## How It Works


## Getting Started

To run locally follow the steps

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Create the root folder named repoprovas-api and access it
```sh
mkdir repoprovas-api && cd repoprovas-api
```
2. Clone the repo
```sh
git clone https://github.com/cgabrieu/repoprovas-api.git
```
3. Install dependencies with npm
```sh
npm install
```
4. Create a database using the command below via postgres
```sh
CREATE DATABASE repoprovas;
```
5. Automatically create all necessary tables to backend repo with <a href="https://github.com/cgabrieu/repoprovas-api/blob/main/dump.sql">dump</a>. 

8. Connect your backend to the database, for that, rename the .env.example to .env.dev and fill in your data.

### How to run

1. Run using the command (remember to be on the repo): 
```sh
npm run start:dev
```

## How to contribute

1. Fork the project.
2. Create a new branch with your changes: `git checkout -b feat/myFeatureName`
3. For each feature implemented, make a commit specifying what was done
4. Submit your changes: `git push -u origin feat/myFeatureName`

