import { Router } from 'express';
import * as Controller from '../controllers/';
import * as Middleware from '../middleware';

const router = Router();

router.post('/user', Controller.createUser);
router.post('/user/login', Controller.loginUser);
router.post('/todos', Middleware.verifyToken, Controller.createTodo);
router.get('/todos/user', Middleware.verifyToken, Controller.getTodosByUserToken);
router.patch('/todos/:id', Middleware.verifyToken, Controller.updateTodo);
router.delete('/todos/:id', Middleware.verifyToken, Controller.deleteTodo);

export default router;