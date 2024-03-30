const Cart = require('../models/Cart.model.js');

const createCart = async (req, res) => {
  try{

    const newCart = new Cart(req.body);
    await newCart.save();
    res.status(200).json({
      message: "Cart created successfully",
      newCart
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "An error occured while creating cart",
      error: error.message
    })
  }
}

const updateCart = async(req, res) => {
  try{
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      },
      {
        new: true
      }
    );

    res.status(200).json({
      message: "Cart has been updated successfully",
      updatedCart
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "cart was not updated",
      error: error.message
    })
  }
}

const deleteCart = async(req, res) => {
  try{
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Cart has been deleted successfully"
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "cart was not deleted",
      error: error.message
    })
  }
}

const getCartItem = async(req, res) => {
  try{
    const cartItem = await Cart.findById(req.params.id);
    res.status(200).json({
      cartItem
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}

const getUserCartItems = async(req, res) => {
  try{
    const cartItem = await Cart.find({userId: req.params.id});
    res.status(200).json({
      cartItem
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}

const getCartItems = async(req, res) => {
  try{
    
    const cartItems = await Cart.find();

    res.status(200).json({
      cartItems
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}


module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCartItem,
  getUserCartItems,
  getCartItems
}

