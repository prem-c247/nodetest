"use strict";
const { UserModel } = require("../models");
const  bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = process.env;
/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const index = async (req, res, next) => {
  try {
    var userData = await UserModel.find();
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      data: userData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};
/**
 * Create a record
 * @param { req, res }
 * @returns JsonResponse
 */
const store = async (req, res, next) => {
  try {
    const {firstName, lastName, email, password:plainPassword, mobileNumber, status,userRole  } = req.body;
    console.log(firstName);
    var password = bcrypt.hashSync(plainPassword);
    console.log(password);
    var userData = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      userRole,
      mobileNumber,
      status
    });
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: userData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};

/**
 * Get only single record
 * @param { req, res }
 * @returns JsonResponse
 */
const details = async(req, res, next) => {
   try{
    var userData = await UserModel.findOne({_id:req.params.id});
    // next() or
    return res.status(200).json({
      success: true,
      message: "Details fatched successfully.",
      data: userData
    });
   }
   catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
}

/**
 * update a record
 * @param { req, res }
 * @returns JsonResponse
 */        
const update = async (req, res, next) => {
  try {
    // next() or
    if(req.params.id){
      var userId = req.params.id;
	  const {firstName, lastName, email, mobileNumber, status} = req.body;
	  const options = { returnOriginal: false,select:{firstName,lastName} } 
	  var userData = await UserModel.findOneAndUpdate({_id:userId},{firstName, lastName, email, mobileNumber, status},options);
    }
    return res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data:userData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};
/**
 * Destroy a record
 * @param { req, res }
 * @returns JsonResponse
 */
const destroy = async (req, res, next) => {
  try {
    // next() or
	if(req.params.id){
		var userId = req.params.id;
		var userDeleted = await UserModel.deleteOne({_id:userId});
		if(userDeleted.deletedCount==1){
			return res.status(200).json({
				success: true,
				message: "Data deleted successfully.",
				data: userDeleted
			  });
		}else{
			return res.status(422).json({
				success: true,
				message: "Data not deleted.",
				data: ''
			  });
		}
	}
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};


/**
 * Destroy a record
 * @param { req, res }
 * @returns JsonResponse
 */
const adminLogin = async (req, res, next) => {
	try {
	  // next() or
	  const { email, password } = req.body;
	  var userExist	 = await UserModel.findOne({email:email}).lean();
	  if(userExist && userExist!=null){
			if(userExist.email==email){
				if(bcrypt.compareSync(password,userExist.password)){
					const token = jwt.sign(
						{ user_id: userExist._id, email },
						process.env.TOKEN_KEY,
						{
							expiresIn: "1h",
						}
					);
					// Add user login token to the user object for sending to the fron end
					  Object.assign(userExist,{'token':token});
					return res.status(200).json({
						success: true,
						message: userExist.firstName+" is logged in successfully",
						data: userExist
					});
				}else{
					return res.status(422).json({
						success: false,
						message: "Wrong Email or password, Please try again",
						data: ''
					});
				} 
				return false;
			}
	  }else{
		return res.status(422).json({
			success: false,
			message: "Provided email does not exist",
			data: ''
		});
	  }
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message:
		  "We are having some error while completing your request. Please try again after some time.",
		error: error
	  });
	}
};

const userDashboard = async (req, res, next) => {
	  try{
		return res.status(200).json({
			success: true,
			message: "User is logged in successfully",
			data: '',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message:
			  "We are having some error while completing your request. Please try again after some time.",
			error: error
		});
	}
}
/**
 * Export as a single common js module
 */
module.exports = {
  index,
  store,
  details,
  update,
  destroy,
  adminLogin,
  userDashboard
};
