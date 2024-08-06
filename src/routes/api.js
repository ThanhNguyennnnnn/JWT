import express from "express";
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';
import roleController from '../controller/roleController'

const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */

const initApiRoutes = (app) => {

    // rest api
    router.all('*', checkUserJWT, checkUserPermission);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);
    router.post('/logout', apiController.handleLogOut);
    
    
    // user router
    router.get('/account', userController.getUserAccount);
    router.get('/user/read', userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);

    // role router
    router.get('/role/read', roleController.readFunc);
    router.post('/role/create', roleController.createFunc);
    router.put('/role/update', roleController.updateFunc);
    router.delete('/role/delete', roleController.deleteFunc);
    router.get('/role/by-group/:groupId', roleController.getRoleByGroup);
    router.post('/role/assign-to-group', roleController.assignRoleToGroup);

    // group router
    router.get('/group/read', groupController.readFunc);

    // ung dung duoc bat dau voi dau '/'
    return app.use("/api/v1/", router)
}
export default initApiRoutes;