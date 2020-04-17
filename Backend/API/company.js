var express = require("express");
var router = express.Router();
var fs = require("fs");
const { checkAuth } = require("../Passport/passport");

const company_controller = require("../controllers/company.controller");
var multer = require("multer");

var companyProfileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Files/company/");
  },
  filename: function (req, file, cb) {
    cb(null, req.query.companyId + ".jpeg");
  },
});
var companyImageUpload = multer({ storage: companyProfileStorage }).single(
  "companyProfileStorage"
);

router.post(
  "/fetchParticularCompany/:companyId",
  checkAuth,
  company_controller.fetchParticularCompany
);

router.post(
  "/updateCompanyProfile/:companyId",
  checkAuth,
  company_controller.updateCompanyProfile
);

router.post("/uploadFile", checkAuth, async function (req, res) {
  console.log("In uploadFile company", req.file);
  if (req.query.type === "companyProfilePic") {
    console.log("Image uplaoding");
    companyImageUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log("error", err);
        return res.status(500).json(err);
      } else if (err) {
        console.log("error", err);
        return res.status(500).json(err);
      }
      console.log("response", req.file);
      return res.status(200).send(req.file);
    });
  }
});

router.post("/companyEvents", checkAuth, company_controller.companyEvents);

router.post("/companyJobs", checkAuth, company_controller.companyJobs);

module.exports = router;