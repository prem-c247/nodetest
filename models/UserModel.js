"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  status: {type: String, required: true},
  password: {type: String, required: true},
  mobileNumber: {type: Number, required: true},
  userRole: {type: Number, required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserModelSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

UserModelSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

UserModelSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});


module.exports = mongoose.model('user', UserModelSchema);