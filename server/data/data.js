import bcryptPwd from '../helpers/bcryptPwd';
const users = [];
const trips = [];
const bookings = [];

users.push({
    id: '2gf1',
    first_name: 'baraka',
    last_name: 'jean',
    email: 'baraka@gmail.com',
    password: bcryptPwd.hashThePassword('mypassword'),
    is_admin: false,
}, {
    id: '3fd6',
    email: 'jean@gmail.com',
    first_name: 'jean',
    last_name: 'pierre',
    password: bcryptPwd.hashThePassword('adminpass'),
    is_admin: true,
});
export default { users, bookings, trips };