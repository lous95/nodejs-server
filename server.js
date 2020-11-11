const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI } = require('./config');

mongoose.set('useFindAndModify', false);

// Routes

const userRoutes = require('./routes/api/posts');
const app = express();

//BodyParser middleware

app.use(express.json());
app.use(cors());

    mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected"))
    .catch(err => console.log(err));

app.use('/api/users', userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));