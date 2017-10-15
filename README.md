# node-mysql-express-template-v2
[![CircleCI](https://circleci.com/gh/nihitx/node-mysql-express-template-v2.svg?style=svg)](https://circleci.com/gh/nihitx/node-mysql-express-template-v2) [![Maintainability](https://api.codeclimate.com/v1/badges/0e1fe4b8ea92b975fb3d/maintainability)](https://codeclimate.com/github/nihitx/node-mysql-express-template-v2/maintainability) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/1fe81e5ef27442078a84337a5577c2e5)](https://www.codacy.com/app/nihitx/node-mysql-express-template-v2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nihitx/node-mysql-express-template-v2&amp;utm_campaign=Badge_Grade)

Node mysql express template version 2 is a easy to use template, for any start-ups to download and get started with. This version uses testing and continious integration testing as well!

If you just want to get started with node-mysql-express instead of testing check out my version one. [Node-mysql-express-template](https://github.com/nihitx/node-mysql-express-template-v1)

## Getting started!
> Prequisites!
1) You need to have a database in the cloud
2) Register to Circle CI

> Step 1

1) Git clone the repo to your computer
2) Run the following command `npm install`
3) Go to the db.js file in the root and configure the database settings. (Remember that this time one db is for the local and another should be in the cloud since circle CI needs a db it can access to.
4) Copy the sql create statement from `database_create.sql` and run it inside the mysql terminal or phpmyadmin or mysqlworkbench, to create the users table.
5) Run the following command `node index.js`
6) If the program is running great!
7) Shut it done and run the following command. `npm test`

Thanks it! You have a running platform with testing!!

### Tech
I already talked about the Tech this repo uses in the previous version, in this version I will just talk about the new dependencies!

* [Mocha] - Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser.
* [Chai] - Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
* [faker] - A generator that generates random stuff.
* [jest] - Similar to mocha but with easier functions
* [supertest] - A super easy framework to test HTTP

### Break down
In this break down I will talk about the newly added features and functions, if you would like to know more about the break down, check out version1 which has more details on topics not covered here.

> `index.test.js`
The code below calls the `populateUser` function in the seed directory to save new users to the database to run all the test with.
```sh
beforeEach(populateUsers);
```
Next, lets describe what each part of the first testing does.
1) Describe basically describes the over all reason why you created this test, you can put anything in that string `Testing Post /createUser`
2) `It` , this function comes from mocha and which helps mocha to run the test
3) request comes from `supertest` for HTTP test. ( In here we are requesting the app to give us the /createUser function for us to use.
4) Now we are sending an js object which I took from the seed.js file.
5)After function runs in the server we are expecting a return of `200` to tell us all went well.
6) `expect(res.headers['x-auth']).toBeTruthy();` is basically expecting a return of token to be there
7) using `expect` to match that the return email is basically the one you sent, you can match other information too, like last name for example.
8) The next function is basically doing the opposite, we are sending an empty object and we are expeciting a `400`.
```sh
describe('Testing POST /createUser',()=>{
    it('should create a new user',(done)=>{
        request(app)
            .post('/createUser')
            .send({
                Owner : users[0].Owner,
                firstname : users[0].firstname,
                lastname : users[0].lastname,
                email:users[0].email,
                password : users[0].password,
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body.email).toEqual(users[0].email);
            })
            .end(done);
    });

    it('should not create a new user with invalid body',(done)=>{
        request(app)
            .post('/createUser')
            .send({})
            .expect(400)
            .end((err,res)=>{
                return done(err);
            });
    });
});

```

> `Seed.js` file in the seed directory

This file basically creates fake users to supply, to the index.test.js file

> `db.js`

The db.js needs a new connection to a database in the cloud, I am using clearDB provided by Heroku for storing the database or else we will have problems while testing in CircleCI.
Just writing sudo code in the bottom.
```sh
if  env === Development
    use local db
else
    use cloud db
```

> `circle.yml`

The circle.yml file tells circle ci to run the script.
1) Node is telling what version to use
2) Database for some reason is not working with circle ci - hence we are creating it in the cloud.
3) We are telling to install alll npm-dev packages.
4)Running the test with npm test

```sh
machine:

  node:
    version: 8.2.0

  database:
    override:
    - mysql -u ubuntu circle_test < my-database-setup.sql

  dependencies:
    override:
      - npm install --dev
  test:
    override:
      -npm test

```

Thats it, onces this repo is registered in circle-ci you will see the test running.


### Final

To know more about how to setup a perfect architecture. Read the article below.
[The perfect architecture](https://medium.com/@AuroraXFi/the-perfect-technical-architecture-for-an-i-t-startup-97bec70f3c9e)
That's about!

### Author
 Masnad
License
MIT
