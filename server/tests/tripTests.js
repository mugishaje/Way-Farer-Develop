import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import tokens from '../helpers/tokens';

chai.use(chaiHttp);
chai.should();

const payload = {
    id: 1,
    email: 'baraka@gmail.com',
    first_name: 'baraka',
    last_name: 'jean'
}

const token = tokens.getToken(payload)

describe('before each', () => {
    beforeEach((done) => {
        done();
    })
})
describe('Trip tests', () => {

    it('should be able to view specific trip when he is a user', () => {
        chai.request(app).get("api/v1/trips/1")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(200)
            })
    });
    it('should be able to view all trip when he is a user', () => {
        chai.request(app).get("api/v1/trips")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(200)
            })
    });
    it('should not be able to view specific trip when he is not a user', () => {
        chai.request(app).post("api/v1/trips/1")
            .set('authorization', `Bearer sdfgrghgdhythfgbsdfw`)
            .end((err, res) => {
                res.should.has.status(200)
            })
    });
    it('should not be able to view all trips when he is not a user', () => {
        chai.request(app).get("api/v1/trips/1")
            .set('authorization', `Bearer fsdfsfgdhrefs`)
            .end((err, res) => {
                res.should.has.status(401)
            })
    });
    it('should be able to view specific trip which does not exist', () => {
        chai.request(app).get("api/v1/trips/233")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(404)
            })
    });
    it('should be able to view an existing trip', () => {
        chai.request(app).get("api/v1/trips/1")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(200)
            })
    });
    it('should be able to view specific trip which does not exist', () => {
        chai.request(app).get("api/v1/trips/2335")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(404)
            })
    });
    it('should be able to view an existing trip', () => {
        chai.request(app).get("api/v1/trips/1")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(200)
            })
    });
    it('should be able to cancel trip when he is an admin', () => {
        chai.request(app).patch("api/v1/trips/1/cancel")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(200)
            })
    })
})