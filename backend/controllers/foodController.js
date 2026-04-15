import foodModel from "../models/foodmodel.js";
import cloudinary from "../config/cloudinary.js"


// add food item
const addFood = async( req,res)=>{
   
     const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-delivery"
    });
   const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: result.secure_url,
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
  
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({success: true, message: "Food item removed successfully"})
   }catch(error){
    console.log(error);
    res.status(500).json({message: "Error removing food item", error: error.message})
   }
}



export {addFood, listFood, removeFood,  }