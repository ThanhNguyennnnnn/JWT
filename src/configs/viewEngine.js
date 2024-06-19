import express from 'express';

/**
 * 
 * @param {*} app : express app 
 */

const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    // noi cho app biet minh su dung cong nghe ejs de viet html css
    app.set("view engine", "ejs");
    // day chinh la noi luu tru, viet ngoai file nay app se khong hieu va khong tim thay
    app.set('views', "./src/views");
}

export default configViewEngine;

// keyword default am' chi? file nay chi export dung' 1 ham`