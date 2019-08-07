import Joi from 'joi';
// import hapiJoi from '@hapi/joi';

const schema = {
    user: Joi.object().keys({
        user_id: Joi.number().min(3).max(5),
        first_name: Joi.string().regex(/^\S[A-Za-z]{1,}$/).min(3).max(30).required(),
        last_name: Joi.string().regex(/^\S[A-Za-z]{1,}$/).min(3).max(30).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        token: [Joi.string(), Joi.number()],
        is_admin: Joi.string().valid('true', 'false')
    }),
    user_sign_up: Joi.object().keys({
        first_name: Joi.string().trim().regex(/^\S[A-Za-z]{1,}$/).min(3).max(30).required(),
        last_name: Joi.string().trim().regex(/^\S[A-Za-z]{1,}$/).min(3).max(30).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        token: [Joi.string(), Joi.number()],
        is_admin: Joi.string().valid('true', 'false')

    }),
    user_sign_in: Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).trim().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        token: [Joi.string(), Joi.number()],

    }),
    trips: Joi.object().keys({
        trip_id: Joi.number(),
        origin: Joi.string().min(3).max(30).required(),
        destination: Joi.string().min(3).max(30).required(),
        trip_date: Joi.date().required(), //         .format('DD-MM-YYYY').
        fare: Joi.number().required(),
        bus_license_number: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).required(),
        seating_capacity: Joi.number().min(10).max(120).required(),
        status: Joi.string().valid('active', 'cancelled')
    })
};

export default schema