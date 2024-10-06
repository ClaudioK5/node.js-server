import express from 'express'
import {StatusCodes} from 'http-status-codes'
import users from "./users.data"
import userService from "./user.service"
import { expressYupMiddleware } from 'express-yup-middleware'
import { addUser, getUser, updateUser, deleteUser } from "./user.schemas"

const router = express.Router()

const port = 3000;

const STATUS = {
    success: true,
    failure: false
}

router.get('/hello-world',expressYupMiddleware({schemaValidator : getUser}), (req, res) => {
    res.status(StatusCodes.OK)
    res.send('hello world')
})


router.post('/users/add', expressYupMiddleware({schemaValidator : addUser}), (req,res) => {
   
    const { body: user } = req;

    const addedUser = userService.addUser(user)

    return res.status(StatusCodes.CREATED).send({
    status : STATUS.success,
    message: addedUser

})})

router.put('/update/:id',expressYupMiddleware({schemaValidator : updateUser}), (req,res) => {
   
    const { body: user } = req;

    const id = parseInt(req.params.id, 10)

    const updatedUser = userService.updateUser(id, user)

    if (updatedUser) {
        return res.status(StatusCodes.OK).send({
            status : STATUS.success,
            message: updatedUser,
        
        })
    }
    
    else {return res.status(StatusCodes.NOT_FOUND).send({
    status : STATUS.failure,
    message: "user not found"})}
})

router.get('/users/all',(req, res) => {
    const users = userService.getAllUsers();

    if (users.length) {
        return res.status(StatusCodes.OK).send(users)
    }

    return res.status(StatusCodes.NOT_FOUND).send(
        {
            status: STATUS.failure,
            message: 'no users found'
        }
    )
})

router.get('/users/:id', (req,res) => {
   
    const userId = parseInt(req.params.id, 10)
    const user = userService.getUser(userId)
    if (user) {
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            data: user
        })
    }
    
    else {return res.status(StatusCodes.NOT_FOUND).send({
    status : STATUS.failure,
    message: "user not found"})}
})

router.delete('/users/:id', expressYupMiddleware({schemaValidator : deleteUser}), (req,res) => {
    

    const userId = parseInt(req.params.id, 10)
    const status = userService.removeUser(userId)

    console.log(status)

   let response;

    if (status) {
        return res.status(StatusCodes.OK).send(response = {
            status: STATUS.success,
            message: 'User has been deleted'
        })}
        else {
            return res.status(StatusCodes.NOT_FOUND).send(response = {
                status: STATUS.failure,
                message: 'user doesnt exist.'
            })
        }
        
    return res.status(StatusCodes.OK).send(response)
    })
    
    

export default router