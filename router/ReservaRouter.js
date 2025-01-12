import express, { Router } from 'express';
import  {verifyToken}  from '../middleware/auth.js';
import { createReserva, getReserva, updateReserva, deleteReserva } from '../controller/ReservaController.js';
const rotuer = express.Router();

createReserva

rotuer.post('/crearReserva', verifyToken, createReserva);
rotuer.get('/obtenerReserva/:id', verifyToken, getReserva);
rotuer.put('/ActualizarReserva/:id', verifyToken, updateReserva);
rotuer.delete('/EliminarReserva/:id', verifyToken, deleteReserva);

export default rotuer;