var express = require("express");
var router = express.Router();
const Job = require("../DB/JobpostingSchema");
const { checkAuth } = require("../Passport/passport");

const job_controller = require("../controllers/job.controller");

// a simple test url to check that all of our files are communicating correctly.

router.get("/getJobPostings", checkAuth, job_controller.getJobPostings);

router.post("/jobSearchOnName", checkAuth, job_controller.jobSearchOnName);

router.post("/companyJobSearch", checkAuth, job_controller.companyJobSearch);

router.post(
  "/jobSearchOnNameAndCat",
  checkAuth,
  job_controller.jobSearchOnNameAndCat
);

router.post(
  "/companyJobSearchOnNameAndCat",
  checkAuth,
  job_controller.companyJobSearchOnNameAndCat
);

router.post("/applytoJob", checkAuth, job_controller.applytoJob);

router.post(
  "/jobAppliedStudents",
  checkAuth,
  job_controller.jobAppliedStudents
);

router.post("/postJob", checkAuth, job_controller.postJob);

router.post(
  "/fetchParticularJob/:jobId",
  checkAuth,
  job_controller.fetchParticularJob
);

router.post(
  "/changeJobApplicationsStatus",
  checkAuth,
  job_controller.changeJobApplicationsStatus
);

router.post(
  "/getJobPostingsPagination",
  checkAuth,
  job_controller.getJobPostingsPagination
);

module.exports = router;
