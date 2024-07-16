import bcrypt from "bcryptjs";
import mysql from 'mysql2/promise';
import bluebird from "bluebird";
import db from '../models/index'

// bluebird: giup su dung promise don gian
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPassword
        })
    } catch (error) {
        console.log(error);
    }

}

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = await connection.execute('select * from user');
    //     return rows;
    // } catch (error) {
    //     console.log(error);
    // }
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId
        }
    })

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = await connection.execute('delete from user where id = ?', [id]);
    //     return rows;
    // } catch (error) {
    //     console.log(error);
    // }
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: {
            id: id
        }
    })
    return user.get({ plain: true })

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = await connection.execute('select * from user where id = ?', [id]);
    //     return rows;
    // } catch (error) {
    //     console.log(error);
    // }
}

let updateUserInfo = async (email, username, id) => {
    await db.User.update({
        email: email,
        username: username
    }, {
        where: {
            id: id
        }
    })

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = await connection.execute('update user set email = ?, username = ? where id = ?', [email, username, id]);
    //     return rows;
    // } catch (error) {
    //     console.log(error);
    // }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}