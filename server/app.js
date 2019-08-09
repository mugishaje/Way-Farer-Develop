import express from 'express';
import userRouter from './routes/userRoute';
import tripRouter from './routes/tripRoute';
import bookingRouter from './routes/bookingRoute';

import bodyParser from 'body-parser';

const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({ message: "welcome to Way Farer" })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//working routes
app.use('/api/v1/auth', userRouter);
app.use('/api/v1', tripRouter);
app.use('/api/v1', bookingRouter);

app.use(function(req, res, next) {
    return res.status(404).send({ status: 404, message: 'Route' + req.url + ' Not found.' });
});
// 500 - Any server error
app.use(function(err, req, res, next) {
    return res.status(500).send({ status: 500, error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`the server is running at port ${PORT}`));

export default app