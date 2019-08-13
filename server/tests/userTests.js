import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('before each', () => {
    beforeEach((done) => {
        done();
    })
})

describe('Authentication test', () => {

    // for sign in auth

    it('should not be able to sign in when the user does not exist', () => {
        chai.request(app).post("api/v1/auth/signin").send({
                email: "dadhjhjhfkhh@dfshfhsflsdfshlkhsd",
                password: "f3425fsfsfsfj86586748000000sfhiyrgfsf4",
            })
            .end((err, res) => {
                res.should.has.status(404);
                done();
            })

    });
    it('should not be able to sign in when email is empty', () => {
        chai.request(app).post("api/v1/auth/signin").send({
                email: "",
                password: "f3425fsfsfsfsf4",
            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            })
    });
    it('should not be able to sign in when password is empty', () => {
        chai.request(app).post("api/v1/auth/signin").send({
                email: "dadhjhjhfkhh@dfshfhsflsdfshlkhsd",
                password: "",
            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            })
    });

    it('should not be able to when password is too short', () => {
        chai.request(app).post("api/v1/auth/signin").send({
                email: "dkhh@com",
                password: "ty",
            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            })
    });

    it('should not be able to sign in when  email is invalid', () => {
        chai.request(app).post("api/v1/auth/signin").send({
                email: "abcs@876",
                password: "f3425fsfsfsfsf4",
            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            })
    });

    it('should not be able to sign in when all the fields are empty', () => {
        chai.request(app).post("api/v1/auth/signin").send({
                email: "",
                password: "",
            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            })
    });

    it('should not be able to sign in when all the fields have whitespaces', () => {
        chai.request(app).post("api/v1/auth/signin").send({
                email: "   ",
                password: "   ",
            })
            .end((err, res) => {
                rs.should.has.status(400);
                done();
            })
    });


    //for sign up auth


    //when fields are empty

    it('should not be able to sign up when  email field is empty', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "",
                first_name: "",
                last_name: "Doe",
                password: "anger",
            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });
    it('should not be able to sign up when  password field is empty', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "johhfoe@gmail.com",
                first_name: "fdsdg",
                last_name: "Doe",
                password: "",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });
    it('should not be able to sign up when  first name field is empty', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "john.doe@gmail.com",
                first_name: "",
                last_name: "Doe",
                password: "anger",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });
    it('should not be able to sign up when  last name field is empty', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
            email: "john.doe@gmail.com",
            first_name: "ggr",
            last_name: "",
            password: "anger",
        })

        .end((err, res) => {
            res.should.has.status(400);
            done();
        });
    });




    //when they are too short or invalid

    it('should not be able to sign up when  email is invalid', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "242fd",
                first_name: "uyte",
                last_name: "Doe",
                password: "anger",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });
    it('should not be able to sign up when  password is too short', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "john.doe@gmail.com",
                first_name: "uryu",
                last_name: "Doe",
                password: "i",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });
    it('should not be able to sign up when  first  name is too short', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "john.doe@gmail.com",
                first_name: "y",
                last_name: "Doe",
                password: "hjfgdf",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });
    it('should not be able to sign up when  last name fied is too short', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "john.doe@gmail.com",
                first_name: "yutt",
                last_name: "y",
                password: "uytuy",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });


    //when they contain whitespaces

    it('should not be able to sign up when  last name fied has white spaces', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "jortee@gmail.com",
                first_name: "fasdf",
                last_name: "    ",
                password: "kjhg",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });
    it('should not be able to sign up when  first name fied has white spaces', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "johert@gmail.com",
                first_name: "    ",
                last_name: "Doe",
                password: "anger",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });
    it('should not be able to sign up when  password name fied has white spaces', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "john.doe@gmail.com",
                first_name: "dfsga",
                last_name: "Doe",
                password: "    ",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });
    it('should not be able to sign up when  email fied has white spaces', (done) => {
        chai.request(app).post("/api/v1/auth/signup").send({
                email: "   ",
                first_name: "fgsda",
                last_name: "Doe",
                password: "anger",

            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            });
    });

    it('should not be able to sign up when all the fields are empty', () => {
        chai.request(app).post("api/v1/auth/signup").send({
                email: "",
                first_name: "",
                last_name: "",
                password: "",
            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            })
    });

    it('should not be able tosign up when all the fields have whitespaces', () => {
        chai.request(app).post("api/v1/auth/signup").send({
                email: "   ",
                first_name: "  ",
                last_name: "   ",
                password: "   ",
            })
            .end((err, res) => {
                res.should.has.status(400);
                done();
            })
    });
    it('should return an error when the api does not exist', () => {
        chai.request(app).post("api/v1/autgfgdp").send({

            })
            .end((err, res) => {
                res.should.has.status(500);
                done();
            })
    });

})