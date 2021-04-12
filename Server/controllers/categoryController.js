const Category = require("../models/category");

exports.addCategory = async (req, res, next) => {
  const category = new Category({
    name: req.body.name,
  });
  try {
    const newCategory = await category.save();
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryDelete = await Category.deleteOne({
      _id: req.params.id,
    });
    res.status(201).send(categoryDelete);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById({ _id: req.params.id });
    res.status(200).send(category);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(201).send(categories);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.updateCategory = async (req, res, next) => {
  const category = await Category.findById({ _id: req.params.id });

  if (!category) {
    res.status(405).send({ message: "Category not found" });
  } else {
    category.name = req.body.name;
    try {
      const updatedCat = await category.save();
      res.status(200).send(updatedCat);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
};
