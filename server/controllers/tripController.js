import database from '../data/data';
import jwt from 'jsonwebtoken';
import uid from 'uid';
import tokens from '../helpers/tokens';
import schema from '../middlewares/validation';
import Joi from 'joi';

const tripController = {

    viewTrips(req, res) {
        const user = database.users.find(user => user.email == tokens.decoded(req, res));
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "success",
                data: database.trips
            });
        }
        return res.status(tokens.decoded(req, res).status).json(tokens.decoded(req, res).message);
    },
}

export default tripController;