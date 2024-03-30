const User = require('../models/User.model.js')

const updateUser = async(req, res) => {
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set: req.body
      }, {
        new: true
      }
    );

    if(!updatedUser){
      res.status(404).json({
        message: "user not found"
      })
    }

    res.status(200).json({
      message: 'User has been updated successfully',
      data: updatedUser,
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "User update failed",
      error
    })
  }
}

const deleteUser = async (req, res) => {
  try{
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message : "User has been deleted successfully"
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      message : "User deletion failed"
    })
  }
}

const getAdmin = async (req, res) => {
  try{
    const admin = await User.findById(req.params.id)
    if(!admin){
      return res.status(404).json({
        message: "User cant be found"
      })
    }

    const {password, ...info} = admin._doc;

    return res.status(200).json({
      message: "User has been found successfully",
      data: info
    });

  }catch(error){
    console.log(error)
    return res.status(500).json({
      message: "user query failes",
      error: error
    });
  }
}


const getAllUsers = async (req, res) => {

  const query = req.query.latest;

  try{
    const users = query? await User.find().limit(3) : await User.find();

    return res.status(200).json({
      message: "Users has been found successfully",
      data: users
    });

  }catch(error){
    console.log(error)
    return res.status(500).json({
      message: "user query failes",
      error: error
    });
  }
}

const getUserStats = async(req, res) => {
  try{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    
    const userStats = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      message: "user Data retrieved successfully",
      userStats
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "User statistics aquisition error",
      error: error.message
    })
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getAdmin,
  getAllUsers,
  getUserStats
}