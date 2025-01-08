
import { PersonsModel } from "../models/PersonsModel.js";

export const updatePersons = async (req, res) => {
    const { name, lastname, ci, address, phone, photo } = req.body;

    if (!(name ||  lastname ||  ci ||  address ||  phone ||  photo)) {
      res.status(400).json({ message: "all input is required" });
    }
    const person = await PersonsModel.findOne({where:{id:req.params.id}});

    if(person){ 
        person.set({
          ...person,
          name:name,
          lastname:lastname,
          ci:ci,
          address:address,
          phone:phone,
          photo:photo
        });
        await person.save();
        res.status(200).json({ message: "update" });
    }else{
        res.status(404).json({message: "user not found"});
    }
  };