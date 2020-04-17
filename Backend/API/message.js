var express = require("express");
var router = express.Router();
const { checkAuth } = require("../Passport/passport");

const message_controller = require("../controllers/message.controller");

// a simple test url to check that all of our files are communicating correctly.

router.post(
  "/getConversations",
  checkAuth,
  message_controller.getConversations
);

router.post("/postMessage", checkAuth, message_controller.postMessage);

module.exports = router;
