// create Sequelize data model
//Automatycznie wygeneruje kolumny id i nazwa w tabeli
module.exports = (sequelize, Sequelize) => {
    const Bingo = sequelize.define("bingo", {
        nazwa: {
            type: Sequelize.STRING
        }
    });

    return Bingo;
};