import express from 'express';
import userRouter from './routes/userRoute';

import bodyParser from 'body-parser';

const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({ message: "welcome to Way Farer" })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//working routes
app.use('/api/v1/auth', userRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`the server is running at port ${PORT}`));

export default app