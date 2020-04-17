const Company = require("../DB/CompanySchema");
const Student = require("../DB/StudentSchema");
const Job = require("../DB/JobpostingSchema");
const Event = require("../DB/EventSchema");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
var crypto = require("crypto");
const kafka = require("../kafka/client");
const KafkaTopic = require("../kafka/topics");

exports.fetchParticularCompany = async (req, res) => {
  req.body.url = "/fetchParticularCompany";
  req.body.companyId = req.params.companyId;
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

exports.updateCompanyProfile = async (req, res) => {
  req.body[0].url = "/updateCompanyProfile";
  req.body[0].companyuniqueId = req.params.companyId;
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

exports.companyEvents = async (req, res) => {
  req.body.url = "/companyEvents";
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

exports.companyJobs = async (req, res) => {
  req.body.url = "/companyJobs";
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
