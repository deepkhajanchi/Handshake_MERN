const Student = require("../DB/StudentSchema");
const Job = require("../DB/JobpostingSchema");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
var crypto = require("crypto");
const kafka = require("../kafka/client");
const KafkaTopic = require("../kafka/topics");
const { log } = require("../helpers/logger");

// const kafka = require("../kafka/client");

exports.submitReduxProfileStudent = async (req, res) => {
  console.log("Url is", req.body[0]);
  req.body[0].url = req.url;
  console.log("req.body.url", req.body.url);
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body[0], (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send(result.data.result);
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.addEduDetails = async (req, res) => {
  req.body.url = req.url;
  console.log("req.body", req.body);
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body, (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send("Added Successfully");
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.deleteEduDetails = async (req, res) => {
  req.body.url = req.url;
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body, (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send("Removed Successfully");
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.addWorkDetails = async (req, res) => {
  req.body.url = req.url;
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body, (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send("Added Successfully");
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.deleteWorkDetails = async (req, res) => {
  req.body.url = req.url;
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body, (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send("Removed Successfully");
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.studentAppliedJobs = async (req, res) => {
  req.body.url = "/studentAppliedJobs";
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.page = req.query.page;
  req.body.limit = req.query.limit;
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body, (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result.data.result.results);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send(result.data.result);
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.fetchAllStudents = async (req, res) => {
  req.body.url = "/fetchAllStudents";
  req.body.page = req.query.page;
  req.body.limit = req.query.limit;
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body, (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send(result.data.result);
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.studentSearchComp = async (req, res) => {
  req.body.url = "/studentSearchComp";
  req.body.params = req.params;
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body, (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send(result.data.result);
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.getStudent = async (req, res) => {
  req.body.url = "/getStudent";
  req.body.params = req.params;
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body, (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send(result.data.result);
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.studentsPost = async (req, res) => {
  req.body.url = req.url;
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Auth, req.body, (err, result) => {
    if (err) {
      res.status(500).end("System Error");
    } else {
      console.log("Result issssss", result);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-CORRELATION-ID", correlationId);
      if (result.data.isSuccessful) {
        res.status(200).send(result.data.result);
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};
