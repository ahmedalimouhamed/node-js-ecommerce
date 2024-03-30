const Order = require('../models/Order.model.js');

const createOrder = async (req, res) => {
  try{

    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json({
      message: "Order created successfully",
      newOrder
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "An error occured while creating order",
      error: error.message
    })
  }
}

const updateOrder = async(req, res) => {
  try{
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      },
      {
        new: true
      }
    );

    res.status(200).json({
      message: "Order has been updated successfully",
      updatedOrder
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "order was not updated",
      error: error.message
    })
  }
}

const deleteOrder = async(req, res) => {
  try{
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Order has been deleted successfully"
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "order was not deleted",
      error: error.message
    })
  }
}

const getOrder = async(req, res) => {
  try{
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      order
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}

const getUserOrders = async(req, res) => {
  try{
    const order = await Order.find({userId: req.params.id});
    res.status(200).json({
      order
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}

const getOrders = async(req, res) => {
  try{
    
    const orders = await Order.find();

    res.status(200).json({
      orders
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}

const getMonthlyIncome = async (req, res) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(
      new Date(lastMonth.setMonth(lastMonth.getMonth() - 1))
    );

    console.log("last month : ", lastMonth)
    console.log("prev month : ", prevMonth)

    const monthlyIncome = await Order.aggregate([
      {
        $match: { createdAt: { $gte: prevMonth } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount"
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json({ 
      message: "Income has been retrieved successfully",
      monthlyIncome 
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getUserOrders,
  getOrders,
  getMonthlyIncome
}

