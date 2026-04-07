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
    res.status(201).json({success: true, message: "Food item added successfully"})

   }catch(error){
    console.log(error);
    res.status(500).json({success: false, message: "Error adding food item", error: error.message})
   }
}
// ------------------------------------------------------------------------
// all food list
const listFood = async(req,res) =>{
   try{
    const foods = await foodModel.find({});
    res.status(200).json({success: true, message: " All Food items fetched successfully", data: foods})
   }catch(error){
    console.log(error);
    res.status(500).json({success: false, message: "Error fetching food items", error: error.message})
   }
}
// ------------------------------------------------------------------------
//remove food item
const removeFood = async(req,res)=>{
   try{
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{});

    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({success: true, message: "Food item removed successfully"})
   }catch(error){
    console.log(error);
    res.status(500).json({message: "Error removing food item", error: error.message})
   }
}
// ------------------------------------------------------------------------
// update food item
// update food item with optional image
const updateFood = async (req, res) => {
  try {
    const foodId = req.body.id;
// find the food item by id
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // new data
    const updatedData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    };

    // if oyu have new image ifle
    if (req.file) {
      // delete the old image file
      fs.unlink(`uploads/${food.image}`, () => {});

      // replace with new image filename
      updatedData.image = req.file.filename;
    }

    // update the food information in the database
    const updatedFood = await foodModel.findByIdAndUpdate(foodId,updatedData,{ new: true });

    res.status(200).json({
      message: "Food item updated successfully",data: updatedFood});

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error updating food item",error: error.message});
  }
};


export {addFood, listFood, removeFood, updateFood }