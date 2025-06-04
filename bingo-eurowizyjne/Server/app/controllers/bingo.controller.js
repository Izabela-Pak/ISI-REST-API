
const db = require("../models"); 
const Bingo = db.bingo; 
const Op = db.Sequelize.Op;

// Create and Save 
exports.create = (req, res) => {
    // Validate request 
    if (!req.body.nazwa) { 
        res.status(400).send({ 
            message: "Zawartość nie może być pusta!" 
        }); 
        return; 
    }

    //Create values
    const bingo = { 
        nazwa: req.body.nazwa, 
    };
    
    //Zapisanie w bazie danych
    Bingo.create(bingo) 
    .then(data => { 
        res.send(data); }) 
    .catch(err => { 
        res.status(500).send({ 
            message: err.message || "Podczas zapisywania wystąpił błąd." }); 
    });

 }; 

// Retrieve all Data from the database. 
exports.findAll = (req, res) => { 
    Bingo.findAll()
    .then(data => { 
        res.send(data); }) 
        .catch(err => { 
            res.status(500).send({ 
                message: err.message || "Podczas odczytywania wystąpił błąd." 
            }); 
        });
};

// Update a Tutorial by the id in the request 
exports.update = (req, res) => { 
    const id = req.params.id; 
    Bingo.update(req.body, {
         where: { id: id } }) 
         .then(num => { 
            if (num == 1) { 
                res.send({ 
                    message: "Wpis do bingo został zmieniony." 
                }); 
            } 
            else { 
                res.send({ 
                    message: `Nie mogę zmienić wpisu o id=${id}!` }); 
                } }) 
                .catch(err => { 
                    res.status(500).send({ 
                        message: "Błąd zmiany Tutorialu o id=" + id 
                    }); 
                });
}; 

// Delete a Tutorial with the specified id in the request 
exports.delete = (req, res) => {
    const id = req.params.id; 
    Bingo.destroy({ where: { id: id } }) 
    .then(num => { if (num == 1) { 
        res.send({ 
            message: " Wpis został usunięty!" 
        }); 
    } 
    else { 
        res.send({ 
            message: `Nie mogę usunąć Wpisu o id=${id}!` 
        }); 
    } 
    }) 
    .catch(error => { 
        res.status(500).send({ 
            message: "Nie mogę usunąć wpisu o id=" + id 
        }); 
    });

 };