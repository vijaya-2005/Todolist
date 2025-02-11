const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./Router/todoRouters');

const app = express();
mongoose.connect("mongodb://localhost:27017/").then(()=>{
    console.log("Connected to database");
})
app.use(cors());
app.use(express.json());

app.use('/Home', todoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
