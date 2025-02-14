import bcrypt from "bcrypt";
import { categoryModel } from "../models/categoryModel.js";

  export const getCategoria = async (req, res) => {
    try {
      const category = await categoryModel.findAll({
      });
    
      res.status(200).json({category});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  