// Viet code de chay server len
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

// Ung dung se chay vao file server.js dau tien
// npm src/server.js duoc doi thanh npm start trong file package.json -> scripts -> start
// trong start: dau tien la chay thu vien nodemon sau do chay. thu vien. babel de dich. code hieu duoc cu phap moi(import) -> src/server.js

// goi server bang ham` cung cap' san~
const app = express();
// process la cu phap de lay gia' tri cac bien trong file dotenv
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);
// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log('JWT BackEnd is running on the port =', PORT);
})