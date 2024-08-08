require("dotenv/config");
const Slider=require('../models/landing_slider');
//multer
const multer = require('multer');
// Define supported file types and storage configuration for Multer



// Controller function for creating a new slider with image upload
const sliderController = async (req, res) => {
    if(req.method=='POST'){
        try {
            const count=await Slider.countDocuments();
            if (count <2){
                const file = req.file;
                if (!file) return res.status(400).json({ message: 'No image in the request' });
        
                const fileName = req.file.filename;
                const basePath = `${req.protocol}://${req.get('host')}/public/slider/`;
        
                // Create a new slider with the image path
                const newSlider = new Slider({
                    image: `${basePath}${fileName}`,
                    title: req.body.title,
                    description: req.body.description
                });
        
                // Save the slider to the database
                const savedSlider = await newSlider.save();
                res.status(201).json({data:savedSlider,status:201,msg:"Api executed"});
            }else{
                res.status(400).json({message:"Slider max count exceeded",count:count});
            }
            // Handle image upload
           
    
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
  
    if(req.method=='GET'){
        try {
            const data=await Slider.find();
            const count=await Slider.countDocuments();
            res.json({success:true,data:data,msg:"API executed succesfully",count:count});
        } catch (error) {
            
        }
     
    }
};


module.exports={
    sliderController
}