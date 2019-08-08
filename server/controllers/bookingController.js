import jwt from 'jsonwebtoken';
import database from '../data/data';
import uid from 'uid';
import tokens from '../helpers/tokens'


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

    }
}

export default bookingController