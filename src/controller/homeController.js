import userService from '../service/userService'


let handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

let handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList })
}

let handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username)

    return res.redirect('/user')
}

let handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect('/user')
}

let getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData ={};
    userData = user;
    // if (user && user.length > 0) {
    //     userData = user[0];
    // }
    return res.render('user-update.ejs', {userData})
}

let handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUserInfo(email, username, id)
    return res.redirect('/user')
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser,
    getUpdateUserPage, handleUpdateUser
}