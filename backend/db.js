const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://gofood:mern12345@cluster0.ivqwe4s.mongodb.net/foodmern";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB Connected");
    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    global.food_items = fetched_data;
    const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();
    global.food_category = foodCategory;
   
    
    
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = mongoDB;
