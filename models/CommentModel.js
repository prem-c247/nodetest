"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModelSchema = new Schema({
  comment:{type: String, required: true} ,
  post: {type: mongoose.Schema.Types.ObjectId, ref: "post"},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CommentModelSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

CommentModelSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

CommentModelSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});


module.exports = mongoose.model('comment', CommentModelSchema);