"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/files', (_, res) => {
    res.send('getting files');
});
router.post('/files', (_, res) => {
    res.send('creating file');
});
