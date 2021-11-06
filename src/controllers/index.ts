import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import * as AuthLogic from '../auth/jwt';
import * as TodoFormatter from '../formatter';

import { pool } from '../database';

// interface UserObject {
//   id: string;
//   name: string;
//   surname: string;
//   username: string;
//   password: string;
// }

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, surname, username, email, password } = req.body;
  const user: QueryResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

  if (user.rows.length) {
    return res.status(404).json({ message: 'User already exist' });
  }

  const encryptedPassword = await AuthLogic.encryptPassword(password);

  await pool.query(
    `INSERT INTO users(name, surname, username, email, password) 
    VALUES($1, $2, $3, $4, $5)`,
    [name, surname, username, email, encryptedPassword],
  );

  return res.status(200).json({ message: 'success' });
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  let user: any = await pool.query('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]);

  if (!user.rows.length) {
    return res.status(404).json('User not exists');
  }

  const user_password = user.rows[0].password;
  const result = await AuthLogic.comparePassword(password, user_password);

  if (!result) {
    return res.status(400);
  }

  const token = AuthLogic.generateToken(user.rows[0].id);
  return res.status(200).json({ message: 'success', token });
}

export const createTodo = async (req: Request, res: Response): Promise<Response> => {
  const { title } = req.body;
  const { user_id } = req.params;
  await pool.query('INSERT INTO todos (title, user_id) VALUES ($1, $2)', [title, user_id]);
  return res.status(200).json({ message: 'success' });
};

export const getTodosByUserToken = async (req: Request, res: Response): Promise<Response> => {
  const { user_id } = req.params;
  let todos: any = await pool.query('SELECT * FROM todos WHERE user_id = $1', [user_id])
  todos = TodoFormatter.prepareTodos(todos.rows);
  return res.json(todos);
};

export const updateTodo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { done } = req.body;
  await pool.query('UPDATE todos SET done = $1 WHERE id = $2', [done, id]);
  return res.status(200).json({ message: 'success' });
};

export const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  await pool.query('DELETE FROM todos WHERE id = $1', [id])
  return res.status(200).json({ message: 'success' });
};