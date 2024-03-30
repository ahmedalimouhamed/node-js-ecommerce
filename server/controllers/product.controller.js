const Product = require('../models/Product.model.js');

const createProduct = async (req, res) => {
  try{

    const categories = req.body.categories? req.body.categories.split(","): [];
    const newProduct = new Product({
      ...req.body,
      categories,
      image: req.file.path,
    });
    await newProduct.save();
    res.status(200).json({
      message: "Product created successfully",
      newProduct
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "An error occured while creating product",
      error: error.message
    })
  }
}

const updateProduct = async(req, res) => {
  try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      },
      {
        new: true
      }
    );

    res.status(200).json({
      message: "Product has been updated successfully",
      updatedProduct
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "product was not updated",
      error: error.message
    })
  }
}

const deleteProduct = async(req, res) => {
  try{
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product has been deleted successfully"
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "product was not deleted",
      error: error.message
    })
  }
}

const getProduct = async(req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      product
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}

const getProducts = async(req, res) => {
  try{
    const qLatest = req.query.latest;
    const qCategory = req.query.category;

    let products;

    if(qLatest){
      products = await Product.find().sort({createdAt: -1}).limit(1)
    }else if(qCategory){
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      });
    }else{
      products = await Product.find();
    }

    res.status(200).json({
      products
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}


module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts
}

