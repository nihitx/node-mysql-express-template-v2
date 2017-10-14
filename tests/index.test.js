const app = require('../index');
const expect = require('expect');
const request = require('supertest');
const should = require('should');
const jest = require('jest');
const {populateUsers, users} = require('./seed/seed');

beforeEach(populateUsers);


/* Testing the users route for creating a new user */
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

describe('Testing the GET get/me for authentication ',()=>{
    it('should return user if authenticated',(done)=>{
        request(app)
            .get('/get/me')
            .set('x-auth',users[0].token)
            .expect(200)
            .expect((res) =>{
                expect(users[0].Owner).toEqual(res.body.Owner);
            })
            .end(done)
    });

    it('should return 401 if not authenticated',(done)=>{
        request(app)
            .get('/get/me')
            .set('x-auth', '12121212')
            .expect(401)
            .end((err,res)=>{
                return done(err);
            });
    });
});
