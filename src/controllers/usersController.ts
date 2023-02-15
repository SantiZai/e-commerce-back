import { RowData } from './../interfaces/RowData';
import { RequestHandler } from 'express-serve-static-core'
import { pool } from '../db'

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users')
        res.send(users)
    } catch(error) {
        console.error(error)
    }
}

export const getUser: RequestHandler = async (req, res) => {
    try {
        const {id} = req.params
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]) as RowData[]
        if(rows.length <= 0) res.status(404).json({ message: 'User not found' })
        res.send(rows[0])
    } catch(error) {
        console.error(error)
    }
}

export const createUser: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body
        const [rows] = await pool.query('INSERT INTO users(username, password) VALUES (?, ?)', [username, password]) as RowData[]
        res.send({
            id: rows.insertId,
            username,
            password
        })
    } catch(error) {
        console.error(error)
    }
}

export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]) as RowData[]
        if(result.affedtedRows <= 0) res.status(404).json({ message: 'User not found' })
        res.sendStatus(204)
    } catch(error) {
        console.error(error)
    }
}