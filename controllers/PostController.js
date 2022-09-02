"use strict";
const {PostModel,CommentModel} = require('../models');
/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const index = async (req, res, next) => {
  try {
   
    // next() or
    var post = await PostModel.find().populate('comment','_id comment');
    // return post;
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      data:post
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
    // next() or
    const {title, description, image, status} = req.body;
    var createPost = await PostModel.create({
      title,
      description,
      image,
      status,
    });
    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: createPost
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
    if(req.params.id){
      var postDetails = await PostModel.findOne({_id:req.params.id}).populate('comment');
    }
    return res.status(200).json({
      success: true,
      message: "Details fatched successfully.",
      data: postDetails
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
    return res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: []
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
      var postId = req.params.id;
      var postDeleted = await PostModel.deleteOne({_id:postId});
      await CommentModel.deleteMany({_id: {$in: postDeleted.comment}});
      if(postDeleted.deletedCount==1){
        return res.status(200).json({
          success: true,
          message: "Data deleted successfully.",
          data: postDeleted
          });
      }else{
        return res.status(422).json({
          success: true,
          message: "Data not deleted.",
          data: ''
          });
      }
    }
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully.",
      data: []
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
 * Export as a single common js module
 */
module.exports = {
  index,
  store,
  details,
  update,
  destroy
};
