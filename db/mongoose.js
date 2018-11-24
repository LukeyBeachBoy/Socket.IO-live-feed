const mongoose = require('mongoose');
const address = process.env.MONGODB_URI || process.env.CUSTOMCONNSTR_MyConnectionString || 'mongodb://localhost:27017/myApp';

mongoose.Promise = global.Promise;
mongoose.connect(address, {useNewUrlParser : true});

exports = {
    mongoose,
    address
};