import db from "../models/index";
import {checkEmailExist, checkPhoneExist, hashUserPassword} from './loginRegisterService'


const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'] }
        });
        if (users) {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: users
            }
        }
        else {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex', 'address'],
            include: { model: db.Group, attributes: ['name', 'description', 'id'] },
            offset: offset, //Bỏ qua bản ghi offset đầu tiên
            limit: limit,
            order: [['id', 'DESC']]
            // sort:''
        })
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        // console.log('check data: ', data);
        return {
            EM: 'Get data success',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        // check email, phone
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: '1',
                DT: 'email'
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone is already exist',
                EC: '1',
                DT: 'phone'
            }
        }
        // hash password
        let hashPassword = hashUserPassword(data.password);
        
        await db.User.create({...data, password: hashPassword});
        return {
            EM: 'Create OK',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Error from services',
            EC: 1,
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return{
                EM: 'Error with empty GroupId',
                EC: 1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: 'Update user success',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'User not found',
                EC: 2,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Error from services',
            EC: 1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy()
            return {
                EM: 'Delete user success',
                EC: 0,
                DT: []
            }
        }
        else {
            return {
                EM: 'User not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Error from services',
            EC: 1,
            DT: []
        }
    }
}



module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser,
    getUserWithPagination, 
}