const express = require("express");
const app = express();
//tasks.jsを使ってEndpointを指定することができるようにする
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
const PORT = 5000;

require("dotenv").config(); //情報秘匿環境 .envにてMONGO_URLにDBのURLを取得
app.use(express.json()); //json形式のデータを扱う宣言
app.use(express.static("./public")); //htmlを読み込む（Client）

//Routing設計
//tasks.js中のAPI Endpointにリクエストする関数を使う
app.use("/api/v1/tasks",taskRoute);

//DB接続(asyncで非同期処理)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_RENDER_URL || process.env.MONGO_URL);    //.envに秘匿されたMongoDBへのURL
        app.listen(process.env.PORT || PORT,console.log("Server start up"));
    } catch (err) {
        console.log(err);
    }
};

start();


