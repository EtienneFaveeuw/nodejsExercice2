const express = require("express");
const mongoose = require("mongoose");
const agentRoutes = require("./routes/agent");
const interventionRoutes = require("./routes/intervention");
const listintervRoutes = require("./routes/listinterv");
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://etienne:mjj2329@cluster0.lpwipzk.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log("Connexion a la base MongoDB OK"))
.catch( () => console.log("Connexion MongoDB en erreur !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

app.use('/api/agent', agentRoutes);
app.use('/api/intervention', interventionRoutes);
app.use('/listinterv', listintervRoutes);

module.exports = app;
