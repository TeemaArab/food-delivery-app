import foodModel from "../models/foodmodel.js";
import fs from "fs";

// add food item
const addFood = async( req,res)=>{
   let image_filename = `${req.file.filename}`;

   const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category
   })
   try{
    await food.save();
    res.status(201).json({message: "Food item added successfully"})

   }catch(error){
    console.log(error);
    res.status(500).json({message: "Error adding food item", error: error.message})
   }
}


export {addFood}