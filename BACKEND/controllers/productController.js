require("dotenv").config();
const db = require("../models");

const Product = db.product;

const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
    });
    res.status(200).json({ message: "Successfully Registered", product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findAll({ include: { all: true } });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findAll({
      where: { status: true, categoryId: id },
    });
    res.status(200).json({ message: "Successful", product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { id } });
    res.status(200).json({ message: "Successful", product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const product = await Product.update(
      {
        ...req.body,
      },
      { where: { id } }
    );
    res.status(200).json({ message: "Successful", product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.destroy({ where: { id } });
    res.status(200).json({ message: "Successful", product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateProductStatus = async (req, res) => {
  const { id } = req.body;
  try {
    const product = await Product.update(
      { status: req.body.status },
      { where: { id } }
    );
    res.status(200).json({ message: "Successful", product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getByCategory,
  getById,
  updateProduct,
  deleteProduct,
  updateProductStatus,
};
