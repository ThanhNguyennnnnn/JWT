import db from '../models/index';
import bcrypt from "bcryptjs";
import { Op } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const registerNewUser = async (rawUserData) => {
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: '1'
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone is already exist',
                EC: '1'
            }
        }
        let hashPassword = hashUserPassword(rawUserData.password);
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPassword,
        })
        return {
            EM: 'A user is created successfully!',
            EC: 0
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs is service',
            EC: '-2'
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: 'OK',
                    EC: '0',
                    DT: ''
                }
            }
        }
        return {
            EM: 'Your email / phone number or password is incorrect',
            EC: '1',
            DT: ''
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs is service',
            EC: '-2'
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin
}