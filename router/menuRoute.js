// routes/menuRoute.js
import express from 'express';
import {
    createMenuItem,
    getMenuItems,
    getMenuItemsByCategory,
    updateMenuItem,
    deleteMenuItem,
} from '../controller/menuController.js';
import  {verifyToken}  from '../middleware/auth.js';

const rotuer = express.Router();

rotuer.post('/create',verifyToken, createMenuItem);
rotuer.get('/getMenuItems', verifyToken, getMenuItems);
rotuer.get('/getMenuItemsByCategory/:categoriaId', verifyToken, getMenuItemsByCategory);
rotuer.put('/update/:id', verifyToken, updateMenuItem);
rotuer.delete('/delete/:id', verifyToken, deleteMenuItem);

export default rotuer;

