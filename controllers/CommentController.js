"use strict";
const { CommentModel,PostModel } = require("../models");
/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const index = async (req, res, next) => {
  try {
    // Fetching all comments with with its post
    var commentData = await CommentModel.find().populate('post','_id title description status image createdAt updatedAt');
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      data: commentData
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
    const {comment, post} = req.body;
    var createComment = await CommentModel.create({
      comment,
      post,
    });
    await PostModel.updateOne({_id: post}, {$push: {comment: createComment}});
    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: createComment
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
    // next() or
    return res.status(200).json({
      success: true,    
      message: "Details fatched successfully.",
      data: {}
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
    const comment  = req.body.comment;
    if(req.params.id){
      var commentUpdate = await CommentModel.findOneAndUpdate(
        {_id:req.params.id},{comment:comment}
      );
    }
    return res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: commentUpdate
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
      var commentId = req.params.id;
     
      var commentDeleted = await CommentModel.deleteOne({_id:commentId});
      if(commentDeleted.deletedCount==1){
        return res.status(200).json({
          success: true,
          message: "Data deleted successfully.",
          data: commentDeleted
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
 * Export as a single common js module
 */
module.exports = {
  index,
  store,
  details,
  update,
  destroy
};
