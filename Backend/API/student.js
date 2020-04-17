var express = require("express");
var router = express.Router();
const student_controller = require("../controllers/student.controller");
var multer = require("multer");
var fs = require("fs");
const { checkAuth } = require("../Passport/passport");

var fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req in storage", req.query.id);
    cb(null, "./Files/resumes");
  },
  filename: function (req, file, cb) {
    cb(null, req.query.studentId + "_" + req.query.jobId + ".pdf");
  },
});

var upload = multer({ storage: fileStorage }).single("file");

var studentProfileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req in storage", req.query.studentId);
    cb(null, "./Files/students/");
  },
  filename: function (req, file, cb) {
    cb(null, req.query.studentId + ".jpeg");
  },
});

var imageUpload = multer({ storage: studentProfileStorage }).single(
  "studentProfileStorage"
);

router.get("/file/:name", checkAuth, (req, res) => {
  const name = req.params.name;
  // console.log("/file req.params: " + JSON.stringify(req.params));
  const path = __dirname + "/Files/" + req.query.role + "/" + name;
  console.log("/PATHHH" + path);
  try {
    if (fs.existsSync(path)) {
      res.sendFile(path);
    } else {
      res.status(400);
      res.statusMessage("Not Found");
      res.end();
    }
  } catch (err) {
    res.status(500);
    console.log("/file/:name error: " + err);
    res.end();
  }
});

router.post("/uploadFile", checkAuth, async function (req, res) {
  console.log("In uploadFile company", req.file);
  if (req.query.type === "resume") {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // console.log('error',err)
        return res.status(500).json(err);
      } else if (err) {
        // console.log('error',err)
        return res.status(500).json(err);
      }
      // console.log('response',res.file)
      return res.status(200).send(req.file);
    });
  } else if (req.query.type === "studentProfilePic") {
    console.log("Image uplaoding");
    imageUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log("error", err);
        return res.status(500).json(err);
      } else if (err) {
        console.log("error", err);
        return res.status(500).json(err);
      }
      console.log("response issss", res.file);
      return res.status(200).send(req.file);
    });
  }
});

router.post(
  "/submitReduxProfileStudent",
  checkAuth,
  student_controller.submitReduxProfileStudent
);

router.post("/addEduDetails", checkAuth, student_controller.addEduDetails);

router.post(
  "/studentAppliedJobs",
  checkAuth,
  student_controller.studentAppliedJobs
);

router.post(
  "/deleteEduDetails",
  checkAuth,
  student_controller.deleteEduDetails
);

router.post("/addWorkDetails", checkAuth, student_controller.addWorkDetails);

router.post(
  "/deleteWorkDetails",
  checkAuth,
  student_controller.deleteWorkDetails
);

router.get("/fetchAllStudents", checkAuth, student_controller.fetchAllStudents);

router.get(
  "/studentSearchComp/:searchValue",
  checkAuth,
  student_controller.studentSearchComp
);

router.get("/getStudent/:id", checkAuth, student_controller.getStudent);

router.post("/studentsPost", checkAuth, student_controller.studentsPost);

router.post("/uploadFile", checkAuth, async function (req, res) {
  if (req.query.type === "resume") {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // console.log('error',err)
        return res.status(500).json(err);
      } else if (err) {
        // console.log('error',err)
        return res.status(500).json(err);
      }
      // console.log('response',res.file)
      return res.status(200).send(req.file);
    });
  } else if (req.query.type === "studentProfilePic") {
    console.log("Image uplaoding");
    imageUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log("error", err);
        return res.status(500).json(err);
      } else if (err) {
        console.log("error", err);
        return res.status(500).json(err);
      }
      console.log("response issss", res.file);
      return res.status(200).send(req.file);
    });
  }
});

module.exports = router;
