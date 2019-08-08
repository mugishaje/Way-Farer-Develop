// import userModel from '../models/userModel';
import Joi from 'joi';
import database from '../data/data';
import tokens from '../helpers/tokens';
import bcryptPwd from '../helpers/bcryptPwd'
import schema from '../middlewares/validation';
// import uid from 'uid';
import bcrypt from 'bcrypt';

const userController = {
    signUp(req, res) {
        //check sign up details if valid with joi

        let { email, first_name, last_name, password, is_admin } = req.body;
        let result = Joi.validate({ email, first_name, last_name, password, is_admin }, schema.user_sign_up);
        if (result.error) {
            return res.status(400).json({ status: 400, message: `${result.error.details[0].message}` });
        };

        // check if the user exists
        let user = database.users.find(user => user.email === email);
        if (user) {
            return res.status(409).json({ status: 409, message: 'The user with that email already exists' });
        };

        let id = database.users.length + 1;
        let IS_ADMIN = is_admin || false;
        is_admin = IS_ADMIN;
        let payload = { id, first_name, last_name, email };

        // hash the password and generate token
        let token = tokens.getToken(payload);
        password = bcryptPwd.hashThePassword(password);

        let newUser = { id, email, password, first_name, last_name, is_admin, token };
        database.users.push(newUser);

        return res.status(201).json({
            status: 201,
            message: "The User was created successfully",
            data: { token, id, first_name, last_name, email, is_admin }
        })
    },
    signIn(req, res) {
        //check if sign in data are full
        let { email, password } = req.body;
        let result = Joi.validate({ email, password }, schema.user_sign_in);
        if (result.error) {
            return res.status(400).json({ status: 400, message: `${result.error.details[0].message}` });
        };

        // check if the user exists
        const user = database.users.find(user => user.email === email);

        if (!user) { return res.status(404).json({ status: 404, message: { error: 'There is no such user with that email' } }); }
        if (!database.users.find(user => bcryptPwd.checkThepassword(password, user.password))) { return res.status(401).json({ status: 401, data: { error: 'enter the correct password' } }); }

        const { id, first_name, last_name, is_admin, token } = user;

        return res.status(200).json({
            status: 200,
            message: "User found",
            data: { id, first_name, last_name, email, is_admin, token },
        });
    },
}

export default userController;