import mongoose ,{Schema}from "mongoose";


const cardSchema=new Schema({
    Date:{
        type:String,
        require:true
    },
    Hadding:{
                type:String,
        require:true

    },
     Discription:{
                type:String,
        require:true

    },
    location:{
           type:String,
        require:true
    },
     Link:{
           type:String,
        require:true
    },
     Image:{
           type:String,
        require:true
    },
    ImageId:{
         type:String,
        require:true
    }

})

export const card=mongoose.model("card",cardSchema)