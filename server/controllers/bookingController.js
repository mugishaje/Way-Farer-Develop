import Joi from 'joi';
import database from '../data/data';
import tokens from '../helpers/tokens'
import schema from '../middlewares/validation';
import moment from 'moment';

const bookingController = {
    viewBookings(req, res) {
        const user = database.users.find(user => user.email == tokens.decoded(req, res).email);
        if (user) {
            if (user.is_admin === true) {
                return res.status(200).json({
                    status: 200,
                    message: 'success',
                    data: database.bookings
                });
            } else {

                return res.status(200).json({ status: 200, message: 'success', data: database.bookings.find(booking => booking.user_email === tokens.decoded(req, res).email) || "you have no booking" });
            }
        }
        return res.status(401).json({ status: 401, message: "You are unauthorized for this operation. Sign in first" });
    },

    deleteBooking(req, res) {
        const user = database.users.find(user => user.email === tokens.decoded(req, res).email);

        if (user) {
            const id = req.params.booking_id;
            const booking = database.bookings.find(booking => booking.booking_id === parseInt(id, 10));

            if (!booking) { return res.status(404).json({ status: 404, message: "the booking was not found" }) };

            // if the booking exists check if it's id matches those the user has made
            try {
                if (booking.user_email === user.email) {

                    const booking_index = database.bookings.indexOf(booking)
                    database.bookings.splice(booking_index, 1)
                    return res.status(200).json({
                        status: 200,
                        message: 'Booking has been deleted successfully',

                    });
                }
                return res.status(401).json({ status: 401, message: "you can not delete another user's bookings" });
            } catch (error) {
                return res.status(500).json({ status: 500, message: 'something went wrong' })
            }
        }
        return res.status(401).json({ status: 401, message: "You are unauthorized for this operation. Sign in first" });

    },
    bookSeat(req, res) {
        const user = database.users.find(user => user.email == tokens.decoded(req, res).email);
        if (user) {
            let { trip_id } = req.body;
            const result = Joi.validate({ trip_id }, schema.bookings);
            if (result.error) {
                return res.status(400).json({ status: 400, message: `${result.error.details[0].message}` });

            };
            const trip = database.trips.find(trip => trip.id == trip_id);

            if (!trip) { return res.status(404).json({ status: 404, message: "the trip to book was not found" }) };

            const newBooking = {
                trip_id: trip.id,
                user_id: user.id,
                booking_id: database.bookings.length + 1,
                bus_license_number: trip.bus_license_number,
                trip_date: trip.trip_date,
                first_name: user.first_name,
                last_name: user.last_name,
                user_email: user.email,
                createdon: moment().format('ll'),
            }
            database.trips.find(trip => trip.id == newBooking.trip_id).seats_left -= 1;
            if (trip.seats_left < 1) { return res.status(404).json({ status: 404, message: "There are no seats left on this trip" }) };
            database.bookings.push(newBooking);

            return res.status(201).json({ status: 201, message: "Booking created", data: newBooking })
        }
        return res.status(401).json({ status: 401, message: "You are unauthorized for this operation. Sign in first" });
    },

}

export default bookingController