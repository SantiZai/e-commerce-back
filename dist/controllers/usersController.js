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
exports.deleteUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const db_1 = require("../db");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [users] = yield db_1.pool.query('SELECT * FROM users');
        res.send(users);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [rows] = yield db_1.pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length <= 0)
            res.status(404).json({ message: 'User not found' });
        res.send(rows[0]);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const [rows] = yield db_1.pool.query('INSERT INTO users(username, password) VALUES (?, ?)', [username, password]);
        res.send({
            id: rows.insertId,
            username,
            password
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [result] = yield db_1.pool.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affedtedRows <= 0)
            res.status(404).json({ message: 'User not found' });
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteUser = deleteUser;
