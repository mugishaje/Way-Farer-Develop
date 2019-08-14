import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import tokens from '../helpers/tokens';

chai.use(chaiHttp);
chai.should();

const admin_payload = {
    id: 1,
    email: 'baraka@gmail.com',
    first_name: 'baraka',
    last_name: 'jean'
};
const user_payload = {
    id: 2,
    email: 'jean@gmail.com',
    first_name: 'jean',
    last_name: 'pierre'
};
const nau_payload = {
    id: 432,
    email: 'email@mail.org',
    first_name: 'notauser',
    last_name: 'peter'
}
const token = tokens.getToken(user_payload);
const tokenNAU = tokens.getToken(nau_payload);
const tokenAd = tokens.getToken(admin_payload);

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
                res.should.has.status(200);
                done();
            })
    });
    it('should be able to view specific trip when he is an admin', () => {
        chai.request(app).get("api/v1/trips/1")
            .set('authorization', `Bearer ${tokenAd}`)
            .end((err, res) => {
                res.should.has.status(200);
                done();
            })
    });
    it('should not be able to view specific trip when he is not a user', () => {
        chai.request(app).get("api/v1/trips/1")
            .set('authorization', `Bearer ${tokenNAU}`)
            .end((err, res) => {
                res.should.has.status(401);
                done();
            })
    });


    it('should be able to view all trips when he is a user', () => {
        chai.request(app).get("api/v1/trips")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(200);
                done();
            })
    });
    it('should be able to view all trips when he is an admin', () => {
        chai.request(app).get("api/v1/trips")
            .set('authorization', `Bearer ${tokenAd}`)
            .end((err, res) => {
                res.should.has.status(200);
                done();
            })
    });
    it('should not be able to view all trips when he is not a user', () => {
        chai.request(app).get("api/v1/trips")
            .set('authorization', `Bearer fsdfsfgdhrefs`)
            .end((err, res) => {
                res.should.has.status(401);
                done();
            })
    });
    it('should not be able to view specific trip which does not exist', () => {
        chai.request(app).get("api/v1/trips/23")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(404);
                done();
            })
    });
    it('should be able to view an existing trip', () => {
        chai.request(app).get("api/v1/trips/1")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(200);
                done();
            })
    });

    it('should not be able to view a non existing trip', () => {
        chai.request(app).get("api/v1/trips/1234")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(404);
                done();
            })
    });

    //for cancelling a trip
    it('should be able to cancel trip when he is an admin', () => {
        chai.request(app).patch("api/v1/trips/1/cancel")
            .set('authorization', `Bearer ${tokenAd}`)
            .end((err, res) => {
                res.should.has.status(200);
                done();
            })
    });
    it('should not be able to cancel trip when he is a user', () => {
        chai.request(app).patch("api/v1/trips/1/cancel")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(401);
                done();
            })
    });
    it('should not be able to cancel trip when he is not a user', () => {
        chai.request(app).patch("api/v1/trips/1/cancel")
            .set('authorization', `Bearer ${tokenNAU}`)
            .end((err, res) => {
                res.should.has.status(401);
                done();
            })
    });
    it('should not be able to cancel trip which does not exist', () => {
        chai.request(app).patch("api/v1/trips/3545/cancel")
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(404);
                done();
            })
    });
    //for creating a new trip
    it('should not be able to create trip when he is not an admin', () => {
        chai.request(app).post("api/v1/trips")
            .send({
                origin: "kigali",
                destination: "musanze",
                seating_capacity: "50",
                trip_date: "5090",
                fare: "400",
                bus_license_number: "RAB 483A",
            })
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.has.status(401);
                done();
            })
    });
    it('should not be able to create trip when origin is empty', () => {
        chai.request(app).post("api/v1/trips")
            .send({
                origin: "",
                destination: "musanze",
                seating_capacity: "50",
                trip_date: "5090",
                fare: "400",
                bus_license_number: "RAB 483A",
            })
            .set('authorization', `Bearer ${tokenAd}`)
            .end((err, res) => {
                res.should.has.status(400);
                done();
            })
    });
    it('should not be able to create trip when destination is empty', () => {
        chai.request(app).post("api/v1/trips")
            .send({
                origin: "rubavu",
                destination: "",
                seating_capacity: "50",
                trip_date: "5090",
                fare: "400",
                bus_license_number: "RAB 483A",
            })
            .set('authorization', `Bearer ${tokenAd}`)
            .end((err, res) => {
                res.should.has.status(400);
                done();
            })
    });
    it('should not be able to create trip when fare is empty', () => {
        chai.request(app).post("api/v1/trips")
            .send({
                origin: "rubavu",
                destination: "kigali",
                seating_capacity: "50",
                trip_date: "5090",
                fare: "",
                bus_license_number: "RAB 483A",
            })
            .set('authorization', `Bearer ${tokenAd}`)
            .end((err, res) => {

                res.should.has.status(400);
                done();
            })
    });
    it('should not be able to create trip when bus_license_number is empty', () => {
        chai.request(app).post("api/v1/trips")
            .send({
                origin: "rubavu",
                destination: "kigali",
                seating_capacity: "50",
                trip_date: "5090",
                fare: "230",
                bus_license_number: "",
            })
            .set('authorization', `Bearer ${tokenAd}`)
            .end((err, res) => {

                res.should.has.status(400);
                done();
            })
    });
    it('should not be able to create trip when fare is empty', () => {
        chai.request(app).post("api/v1/trips")
            .send({
                origin: "rubavu",
                destination: "kigali",
                seating_capacity: "50",
                trip_date: "5090",
                fare: "",
                bus_license_number: "RAB 483A",
            })
            .set('authorization', `Bearer ${tokenAd}`)
            .end((err, res) => {

                res.should.has.status(400);
                done();
            })
    });

})