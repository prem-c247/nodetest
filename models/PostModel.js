"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
  title: {type: String, required: true },
  description: {type: String, required: true },
  status: {type: String, required: true    },
  image: {type: String, required: true },
  comment:[{type: mongoose.Schema.Types.ObjectId, ref:'comment'}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PostModelSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

PostModelSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

PostModelSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});


module.exports = mongoose.model('post', PostModelSchema);