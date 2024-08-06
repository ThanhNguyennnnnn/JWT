// Viet code de chay server len
require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from './config/cors'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import connection from "./config/connectDB";

// Ung dung se chay vao file server.js dau tien
// npm src/server.js duoc doi thanh npm start trong file package.json -> scripts -> start
// trong start: dau tien la chay thu vien nodemon sau do chay. thu vien. babel de dich. code hieu duoc cu phap moi(import) -> src/server.js

// goi server bang ham` cung cap' san~
const app = express();
// process la cu phap de lay gia' tri cac bien trong file dotenv
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body parser
// giup req tra ve chuyen sang dang json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cookie parser
app.use(cookieParser())

// test connection db
// connection();

// init web routes
initWebRoutes(app);
initApiRoutes(app);

// req => middleware => res
app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log('JWT BackEnd is running on the port =', PORT);
})