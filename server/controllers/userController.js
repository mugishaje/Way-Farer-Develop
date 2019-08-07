// import userModel from '../models/userModel';
import Joi from 'joi';
import database from '../data/data';
import tokens from '../helpers/tokens';
import bcryptPwd from '../helpers/bcryptPwd'
import schema from '../middlewares/validation';
import uid from 'uid';
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

        let id = uid(4);

        while (database.users.find(user => user.id == id)) {
            id = uid(4)
        } // or just database.users.length + 1; 
        let IS_ADMIN = is_admin || 'false';
        is_admin = IS_ADMIN;
        let payload = { id, first_name, last_name, email };

        // hash the password and generate token
        let token = tokens.getToken(payload);
        password = bcryptPwd.hashThePassword(password);

        let newUser = { id, email, password, first_name, last_name, is_admin };
        database.users.push(newUser);

        return res.status(201).json({
            status: 201,
            message: "The User was created successfully",
            data: { token, id, first_name, last_name, email, is_admin, password }
        })
    }
}

export default userController;