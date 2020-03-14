var db = require("../models");

module.exports = function (app) {
    app.post("/api/medications", function (req, res) {
        db.Medication.create({
            name: req.body.name,
            dosage: req.body.dosage,
            quantity: req.body.quantity,
            frequency: req.body.frequency
        })
    });

    app.get("/api/medications", function (req, res) {
        var query = {};

        db.Medication.findAll({
            where: query,

        }).then(function (dbMedication) {
            res.json(dbMedication);
        });
    });

    app.delete("/api/medications/:id", function (req, res) {
        db.Medication.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbMedication) {
            res.json(dbMedication);
        });
    });

};
