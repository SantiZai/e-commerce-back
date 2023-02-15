import { RequestHandler } from 'express-serve-static-core'
import { pool } from '../db'
import { RowData } from '../interfaces/RowData'

export const getProducts: RequestHandler = async (req, res) => {
    try {
        const [productos] = await pool.query('SELECT * FROM products')
        res.send(productos)
    } catch(error) {
        console.error(error)
    }
}

export const getProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [rows] = await pool.query('SELECT * FROM products WHERE ID = ?', [id]) as RowData[]
        if(rows.length <= 0) res.status(404).json({ message: 'Product not found' })
        res.send(rows[0])
    } catch(error) {
        console.error(error)
    }
}

export const createProduct: RequestHandler = async (req, res) => {
    try {
        const { name, brand, description, tipe, price } = req.body
        const [rows] = await pool.query('INSERT INTO products(name, brand, description, tipe, price) VALUES (?, ?, ?, ?, ?)', [name, brand, description, tipe, price]) as RowData[]
        res.send({
            id: rows.insertId,
            name,
            brand,
            description,
            tipe,
            price
        })
    } catch(error) {
        console.error(error)
    }
}

export const deleteProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]) as RowData[]
        if(result.affectedRows <= 0) return res.status(404).json({ message: 'Product not found'})
        res.sendStatus(204)
    } catch(error) {
        console.error(error)
    }
}

export const updateProduct: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params
        const { name, brand, description, tipe, price } = req.body
        const [result] = await pool.query('UPDATE products SET name = IFNULL(?, name), brand = IFNULL(?, brand), description = IFNULL(?, description), tipe = IFNULL(?, tipe), price = IFNULL(?, price) WHERE id = ?', [name, brand, description, tipe, price, id]) as RowData[]
        if(result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' })
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]) as RowData[]
        res.json(rows[0])
    } catch(error) {
        console.error(error)
    }
}