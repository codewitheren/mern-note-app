const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database connection SUCCESS ${conn.connection.host}`);
    } catch (error) {
        console.log(`Database connection FAIL ${error} `);
        process.exit(1);
    }
};

module.exports = connectDB;

