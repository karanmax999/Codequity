import { card } from "../model/Card_model.ts";
// import type { Request, Response } from "express";
import { uploadOnCloudinary,deleteFromCloudinary } from "../Utils/cloudinary.js";

//get card
 const getCard= async(req,res)=>{
try {
   const cardData=await card.find({})
  return res.status(200).json(cardData)
  
} catch (error) {
      console.error("Error fetching cards:", error);
    return res.status(500).json({ message: "Internal server error" });
}


}

//login
const login = (req, res) => {
  try {
    const password = req.body?.password;
    if (!password) {
      return res.status(400).json({ message: "Password required", success: false });
    }

    if (password === process.env.PASSWORD) {
      return res.status(200).json({ message: "Login successful", success: true });
    } else {
      return res.status(401).json({ message: "Invalid password", success: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};




//card create
const Card = async (req,res) => {
  try {
    const {Date, Hadding, Discription, location, Link} = req.body;

    if ([Date, Hadding, Discription, location].some(a => !a || a === "")) {
      return res.status(400).json({ message: "fill all detail" });
    }

    // const files = req.files as Express.Multer.File[];
     const files = req.files; 
    const avatarlocalpath = files?.[0]?.path; 

    console.log("Uploaded file path:", avatarlocalpath);

    if (!avatarlocalpath) {
      return res.status(400).json({ message: "avatar is required" });
    }

    const avataroncloud = await uploadOnCloudinary(avatarlocalpath);
console.log(avataroncloud.public_id)
    if (!avataroncloud) {
      return res.status(400).json({ message: "not able to upload in cloud" });
    }

    // save card details
    const newCard = await card.create({
      Date,
      Hadding,
      Discription,
      Image: avataroncloud.url,
      ImageId:avataroncloud.public_id,
      location,
      Link
    });

    return res.status(201).json({
      message: "Card created successfully",
      data: newCard,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// edit card
// import { card } from "../model/Card_model.ts";
// import { uploadOnCloudinary, deleteFromCloudinary } from "../Utils/cloudinary.js";

 const editCard = async (req, res) => {
  try {
    const { id } = req.params; // card ID
    const {Date, Hadding, Discription, location, Link} = req.body;

    const existingCard = await card.findById(id);
    if (!existingCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    let imageUrl = existingCard.Image;
    let imageId = existingCard.ImageId;

    // if new image uploaded
    if (req.files && req.files.length > 0) {
      const newPath = req.files[0].path;

      // delete old image from Cloudinary
      if (imageId) {
        await deleteFromCloudinary(imageId);
      }

      const uploaded = await uploadOnCloudinary(newPath);
      if (!uploaded) {
        return res.status(400).json({ message: "Failed to upload new image" });
      }

      imageUrl = uploaded.secure_url;
      imageId = uploaded.public_id;
    }

    // update in DB
    existingCard.Date = Date || existingCard.Date;
    existingCard.Hadding = Hadding || existingCard.Hadding;
    existingCard.Discription = Discription || existingCard.Discription;
    existingCard.location = location || existingCard.location;
    existingCard.Image = imageUrl;
    existingCard.ImageId = imageId;
     existingCard.Link = Link || existingCard.Link;
    await existingCard.save();

    return res.status(200).json({
      message: "Card updated successfully",
      data: existingCard,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// delete card

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCard = await card.findById(id);
    if (!existingCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    // delete image from Cloudinary
    if (existingCard.ImageId) {
      await deleteFromCloudinary(existingCard.ImageId);
    }

    await existingCard.deleteOne();

    return res.status(200).json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export {Card,editCard,deleteCard,login,getCard}
