// Routes for handling all CRUD operations
module.exports = app => {
    const bingo = require("../controllers/bingo.controller.js"); 
    var router = require("express").Router(); 
    // Create a new Bingo 
    router.post("/", bingo.create); 
    // Retrieve all Wpisy 
    router.get("/", bingo.findAll); 
    // Update a wpisy with id 
    router.put("/:id", bingo.update); 
    // Delete a wpisy with id 
    router.delete("/:id", bingo.delete); 
  
    app.use('', router); 
};