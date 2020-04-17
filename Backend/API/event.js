var express = require("express");
var router = express.Router();
const { checkAuth } = require("../Passport/passport");

const event_controller = require("../controllers/event.controller");

// a simple test url to check that all of our files are communicating correctly.

router.get("/getEvents", checkAuth, event_controller.getEvents);

router.post("/registeredEvents", checkAuth, event_controller.registeredEvents);

router.get("/upcomingEvents", checkAuth, event_controller.upcomingEvents);

router.post("/postEvent", checkAuth, event_controller.postEvent);

router.get(
  "/eventSearch/:searchValue",
  checkAuth,
  event_controller.eventSearch
);

router.post(
  "/eventRegisteredStudents",
  checkAuth,
  event_controller.eventRegisteredStudents
);

router.post(
  "/companyEventSearch",
  checkAuth,
  event_controller.companyEventSearch
);

router.post(
  "/registerStudentToEvent",
  checkAuth,
  event_controller.registerStudentToEvent
);

module.exports = router;
