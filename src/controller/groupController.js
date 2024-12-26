import groupService from '../service/groupService'

const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroups();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return {
            EM: 'Error from services',
            EC: 1,
            DT: []
        }
    }
}

const readQues = async (req, res) => {
    try {
        let data = await groupService.getQues();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
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
    readFunc, readQues
}