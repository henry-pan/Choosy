const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const passport = require("passport");

// const path = require('path'); // Heroku


// Set up routes
const users = require('./routes/api/users');
const ideas = require('./routes/api/ideas');


// Comment in for heroku
// const path = require('path');
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('frontend/build'));
//   app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   })
// }


//Configure mongoose to connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  

// Configure app to use passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Express 4.16+ methods to replace body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Configure routes
app.use("/api/users", users);
app.use("/api/ideas", ideas);



app.get("/", (req, res) => {
  res.send("Hello World!");
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
