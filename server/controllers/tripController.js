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
    cancelTrip(req, res) {
        const user = database.users.find(user => user.email == tokens.decoded(req, res).email);
        const id = req.params.trip_id;
        const trip = database.trips.find(trip => trip.id === parseInt(id, 10));
        if (user) {
            if (user.is_admin === true) {
                if (!trip) { return res.status(404).json({ status: 404, message: "the trip was not found" }) };

                database.trips.find(trip => trip.id === parseInt(id, 10)).status = "cancelled";
                return res.status(200).json({ status: 200, message: "Trip cancelled successfully", data: database.trips.find(trip => trip.id === parseInt(id, 10)) });

            }
            return res.status(401).json({ status: 401, message: "You are not registered as an admin" });
        };

        return res.status(401).json({ status: 401, message: "You are unauthorized to access trips... You are not yet registered" });
    },
    createTrip(req, res) {
        const user = database.users.find(user => user.email == tokens.decoded(req, res).email);
        const { seating_capacity, origin, destination, trip_date, fare, bus_license_number, status } = req.body;
        const result = Joi.validate({ seating_capacity, origin, destination, trip_date, fare, bus_license_number }, schema.trips);
        if (result.error) {
            return res.status(400).json({ status: 400, message: { error: `${result.error.details[0].message}` } });
        };
        if (!user) { return res.status(401).json({ status: 401, message: "You are not authorised for this operation. Sign in first." }) };

        // if the user exists
        if (user.is_admin === true) {

            const newData = {
                trip_id: database.trips.length + 1,
                seating_capacity: req.body.seating_capacity || 20,
                origin: req.body.origin,
                destination: req.body.destination,
                trip_date: req.body.trip_date,
                fare: parseInt(req.body.fare, 10),
                status: req.body.status || "active",
                bus_license_number: req.body.bus_license_number
            };
            let trip = database.trips.find(trip => trip.id == newData.trip_id);
            if (trip) { return res.status(409).json({ status: "error", message: "the trip you created arleady exists" }) };

            database.trips.push(newData);
            return res.status(201).json({ status: "success", data: newData });
        };
        return res.status(401).json({ status: 401, message: "Only the can create a new trip" });
    }
};



export default tripController;