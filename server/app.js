import express from 'express';

const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({ message: "welcome to Way Farer" })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`the server is running at port ${PORT}`));

export default app