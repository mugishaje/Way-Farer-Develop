import database from '../data/data';
import jwt from 'jsonwebtoken';
import uid from 'uid';
import tokens from '../helpers/tokens';
import schema from '../middlewares/validation';
import Joi from 'joi';

const tripController = {

    viewTrips(req, res) {
        const user = database.users.find(user => user.email == tokens.decoded(req, res).email);
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "success",
                data: database.trips
            });
        };
        return res.status(401).json({ status: 401, message: "You are unauthorized to access trips... You are not yet registered" });
    },
    getSpecificTrip(req, res) {
        const user = database.users.find(user => user.email == tokens.decoded(req, res).email);
        console.log(tokens.decoded(req, res));
        const id = req.params.trip_id;
        const trip = database.trips.find(trip => trip.id === parseInt(id, 10));

        if (user) {
            if (!trip) { return res.status(404).json({ status: 404, message: "the trip was not found" }) };

            return res.status(200).json({
                status: 200,
                message: "success",
                data: trip
            });
        }
        return res.status(401).json({ status: 401, message: "You are unauthorized to access trips... You are not yet registered" });
    },

}

export default tripController;