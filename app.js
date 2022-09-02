require("dotenv").config();
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
var bodyParser = require('body-parser');
const { MONGO_URI,SERVER_PORT } = process.env;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(routes);

const mongoDB = MONGO_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', async (req, res) => {
  	return res.status(200).json({
		message:"Hello this is from get method"
	})
})
app.post('/post', async(req, res) => {
	return res.status(201).json({
		messge:"Hello this is from post method"
	})
})
app.get('/post-get', async(req, res) => {
	return res.status(201).json({
		messge:'body',
	})
})

app.get('/json-data', async(req, res) => {
	var data = [
		{
			id: "1",
			firstName: "Prem",
			lastName: "Panwar",
			empId: "123",
		},
		{
			id: "2",
			firstName: "Nisha",
			lastName: "Panwar",
			empId: "12345",
		}
	]
	return res.status(200).json({
		messge:'body',
		data:data
	})
})

const server = http.createServer(app);
server
  .listen(SERVER_PORT)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });