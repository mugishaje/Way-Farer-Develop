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
                // console.log(database.bookings.find(booking => booking.user_email === decoded(req, res)));
                return res.status(200).json({ status: 200, message: 'success', data: database.bookings.find(booking => booking.user_email === tokens.decoded(req, res).email) || "you have no booking" });
            }
        }
        return res.status(401).json({ status: 401, message: "You are unauthorized for this operation. Sign in first" });
    },
}

export default bookingController