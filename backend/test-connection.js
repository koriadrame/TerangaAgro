const mongoose = require('mongoose');
require('dotenv').config();

console.log('Attempting to connect to MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // 5 seconds timeout instead of infinite wait
})
    .then((conn) => {
        console.log('✅ Connection Success! Host:', conn.connection.host);
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Connection Failed:', err.message);
        process.exit(1);
    });
