require("dotenv").config();
const db = require("../models");
const Category = db.category;

const addCategory = async (req, res) => {
  try {
    const result = await Category.create({
      name: req.body.name,
    });
    res.status(200).json({ message: "Successfully Created", result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const result = await Category.findAll();
    res.status(200).json({ message: "Successfully Created", result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateCategory = async (req, res) => {
  const { name, id } = req.body;
  try {
    await Category.update({ name }, { where: { id } });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { addCategory, getAllCategory, updateCategory };
