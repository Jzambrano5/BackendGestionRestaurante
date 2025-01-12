import express from 'express';
import { generateMenuQRCode } from '../controller/QRController.js';

const rotuer = express.Router();

rotuer.get('/qr/menu', generateMenuQRCode);

export default rotuer;
