//Mongoose使ってDB接続
const mongoose = require("mongoose");

const connectDB = (url) => {
    return mongoose
    .connect(url)
    .then(() => console.log("connecting DB now..")) //非同期処理(完了したら実施)
    .catch((err) => console.log(err));
};

module.exports = connectDB;
