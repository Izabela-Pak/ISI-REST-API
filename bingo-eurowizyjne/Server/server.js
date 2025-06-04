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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/bingo.routes")(app);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`); 
});