import express from "express";
import homeController from "../controller/homeController";
import apiController from '../controller/apiController';


const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.get("/user", homeController.handleUserPage)
    router.post('/users/create-user', homeController.handleCreateNewUser)
    router.post('/delete-user/:id', homeController.handleDeleteUser)
    router.get('/update-user/:id', homeController.getUpdateUserPage)
    router.post('/users/update-user', homeController.handleUpdateUser)

    // rest api
    router.get('/api/test-api', apiController.testApi)

    // ung dung duoc bat dau voi dau '/'
    return app.use("/", router)
}
export default initWebRoutes;