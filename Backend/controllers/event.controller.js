const Event = require("../DB/EventSchema");
const Student = require("../DB/StudentSchema");
const Company = require("../DB/CompanySchema");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
var crypto = require("crypto");
const kafka = require("../kafka/client");
const KafkaTopic = require("../kafka/topics");

// const kafka = require("../kafka/client");

exports.getEvents = async (req, res) => {
  req.body.url = "/getEvents";
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

exports.registeredEvents = async (req, res) => {
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

exports.upcomingEvents = async (req, res) => {
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

exports.postEvent = async (req, res) => {
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

exports.eventSearch = async (req, res) => {
  req.body.url = "/eventSearch";
  req.body.searchValue = req.params.searchValue;
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

exports.eventRegisteredStudents = async (req, res) => {
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

exports.companyEventSearch = async (req, res) => {
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

exports.registerStudentToEvent = async (req, res) => {
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
