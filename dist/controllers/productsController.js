"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const db_1 = require("../db");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [productos] = yield db_1.pool.query('SELECT * FROM products');
        res.send(productos);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [rows] = yield db_1.pool.query('SELECT * FROM products WHERE ID = ?', [id]);
        if (rows.length <= 0)
            res.status(404).json({ message: 'Product not found' });
        res.send(rows[0]);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, brand, description, tipe, price } = req.body;
        const [rows] = yield db_1.pool.query('INSERT INTO products(name, brand, description, tipe, price) VALUES (?, ?, ?, ?, ?)', [name, brand, description, tipe, price]);
        res.send({
            id: rows.insertId,
            name,
            brand,
            description,
            tipe,
            price
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [result] = yield db_1.pool.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'Product not found' });
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, brand, description, tipe, price } = req.body;
        const [result] = yield db_1.pool.query('UPDATE products SET name = IFNULL(?, name), brand = IFNULL(?, brand), description = IFNULL(?, description), tipe = IFNULL(?, tipe), price = IFNULL(?, price) WHERE id = ?', [name, brand, description, tipe, price, id]);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: 'Product not found' });
        const [rows] = yield db_1.pool.query('SELECT * FROM products WHERE id = ?', [id]);
        res.json(rows[0]);
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateProduct = updateProduct;
