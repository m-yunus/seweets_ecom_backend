require('dotenv/config');
const Slider = require('../models/landing_slider');
const CategorySchema = require("../models/admin/mas_Category");
const Joi = require('joi');
const cloudinary = require('../config/cloudinary');
const fs = require('fs'); // For file system operations

const sliderController = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const count = await Slider.countDocuments();
      if (count === 1) {
        if (!req.file) {
          return res.status(400).json({ message: 'No image in the request' });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'slider'
        });

        // Remove the file from the local storage
        fs.unlinkSync(req.file.path);

        const newSlider = new Slider({
          image: result.secure_url, // Cloudinary URL
          title: req.body.title,
          description: req.body.description
        });

        const savedSlider = await newSlider.save();
        return res.status(201).json({ data: savedSlider, status: 201, msg: "API executed" });
      } else {
        return res.status(400).json({ message: "Slider max count exceeded. Only one slider allowed.", count: count });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const data = await Slider.find();
      const count = await Slider.countDocuments();
      res.json({ success: true, data: data, msg: "API executed successfully", count: count });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

const categoryCreate = async (req, res) => {
  const categorySchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(10).max(1000).required(),
    isFeatured: Joi.boolean(),
    parentCategory: Joi.string().optional(), // Assuming this is an ObjectId
  });

  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newCategory = new CategorySchema({
      name: req.body.name,
      description: req.body.description,
      isFeatured: req.body.isFeatured || false,
      parentCategory: req.body.parentCategory || null,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', data: savedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  sliderController,
  categoryCreate
};
