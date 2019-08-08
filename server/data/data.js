import bcryptPwd from '../helpers/bcryptPwd';
import tokens from '../helpers/tokens';

const users = [];
const trips = [];
const bookings = [];

users.push({
    id: 1,
    first_name: 'baraka',
    last_name: 'jean',
    email: 'baraka@gmail.com',
    password: bcryptPwd.hashThePassword('mypassword'),
    is_admin: false,
    token: tokens.getToken({
        id: 1,
        first_name: 'baraka',
        last_name: 'jean',
        email: 'baraka@gmail.com',
    }),
}, {
    id: 2,
    email: 'jean@gmail.com',
    first_name: 'jean',
    last_name: 'pierre',
    password: bcryptPwd.hashThePassword('adminpass'),
    is_admin: true,
    token: tokens.getToken({
        id: 2,
        email: 'jean@gmail.com',
        first_name: 'jean',
        last_name: 'pierre',
    }),
});

trips.push({
    id: 1,
    seating_capacity: 20,
    bus_license_number: 'RAB 423',
    origin: 'Kigali',
    destination: 'Muhanga',
    trip_date: '1-1-2019',
    fare: 678,
    status: 'active', // active, cancelled - default is active
}, {
    id: 2,
    seating_capacity: 20,
    bus_license_number: 'RAB 423',
    origin: 'Kigali',
    destination: 'Musanze',
    trip_date: '1-04-2019',
    fare: 343,
    status: 'active',
});

bookings.push({
    booking_id: 1,
    bus_license_number: 'RAD 273',
    trip_date: '12-04-2019',
    first_name: 'Kamana',
    last_name: 'tricia',
    user_email: 'tricia@gmail.com',

}, {
    booking_id: 2,
    bus_license_number: 'RAD 270',
    trip_date: '1-06-2019',
    first_name: 'Mary',
    last_name: 'Doupe',
    user_email: 'baraka@gmail.com',
});

export default { users, bookings, trips };