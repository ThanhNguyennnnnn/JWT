import bcrypt from "bcryptjs";
import mysql from 'mysql2/promise';
import bluebird from "bluebird";

// bluebird: giup su dung promise don gian
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    let hashPassword = hashUserPassword(password);
    try {
        const [rows, fields] = await connection.execute('insert into users (email, password, username) values (?, ?, ?)', [email, hashPassword, username]);
        return rows;
    } catch (error) {
        console.log(error);
    }

}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('select * from users');
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('delete from users where id = ?', [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('select * from users where id = ?', [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

let updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('update users set email = ?, username = ? where id = ?', [email, username, id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}