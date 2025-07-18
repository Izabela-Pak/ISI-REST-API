// configure CORS, initialize & run Express REST APIs.
const express = require('express');
const cors = require('cors');

const app = express();

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Baza zsynchronizowana");
    })
    .catch((error) => {
        console.log(`Błąd ${error}`);
    });

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
    
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/bingo.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`); 
});
