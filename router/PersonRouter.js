import express from 'express';
import { updatePersons} from '../controller/PersonsController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.put('/person/:id',verifyToken, updatePersons);

export default rotuer;