// imports
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { route } = require('../server2/routes/routes.post');

const app = express();
const port = process.env.PORT // 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("uploads"));

// database connection
mongoose.connect(process.env.DB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: true,
   useCreateIndex: true    
}).then(()=>console.log('Connected to the database!')).catch((err)=>console.log(err));

//routes prefix


app.use('/api/link', require("../server2/routes/routes.link"));

app.use('/api/post', require("../server2/routes/routes.post"));

app.use('/api/po1', require("../server2/routes/routes.po1"));

//start server
app.listen(port, ()=>console.log(`server running at https://localhost:${port}`));