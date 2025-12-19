const express = require("express");
const authorizationMiddleware = require("../middleware/auth");
const router = express.Router();

const { dashboard, login } = require("../controllers/main");

router.route("/dashboard").get(authorizationMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
