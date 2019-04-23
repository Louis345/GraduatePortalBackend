const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const methodNotAllowed = require("../errors/methodNotAllowed");
const serverError = require("../errors/serverError");
const config = require("../config");

const Graduate = require("../models/graduate");


// TODO: Refactor to async/await
router.get("/", async (req, res, next) => {
  await mongoose.connect(config.mongoUri, { useNewUrlParser: true });

  Graduate.find()
    .then(profiles => {
      const updatedProfiles = profiles.map(grad => {
        let gradId = grad._id.toString();
        grad._id = gradId;
        return grad;
      });
      res.status(200).send({
        isSuccess: 1,
        message: "Success",
        profiles: updatedProfiles
      });
    })
    .catch(err => serverError(req, res, next, err));
});

router.all("/", methodNotAllowed);

module.exports = router;
