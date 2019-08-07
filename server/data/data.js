const users = [{
        id: '2gf1',
        first_name: 'baraka',
        last_name: 'jean',
        email: 'baraka@gmail.com',
        password: 'mypassword',
        is_admin: false,
    },

    {
        id: '22as6',
        email: 'mugisha@gmail.com',
        first_name: 'baraka',
        last_name: 'pierre',
        password: 'a7628gd4',
        is_admin: false,
    },
    {
        id: '3fd6',
        email: 'jean@gmail.com',
        first_name: 'jean',
        last_name: 'pierre',
        password: 'adminpass',
        is_admin: true,
    }
];


const trips = [];
const bookings = [];

export default { users, bookings, trips };