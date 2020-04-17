const Student = require("../DB/StudentSchema");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
const kafka = require("../kafka/client");
const KafkaTopic = require("../kafka/topics");
const { log } = require("../helpers/logger");
var crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/config");
const { auth } = require("../Passport/passport");

const { check, validationResult } = require("express-validator");

exports.studentLoginKafka = async (req, res) => {
  auth();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
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
        console.log("Results are", result.data);
        const payload = { _id: result.data.result.cookie };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).send(token);
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.studentSignUpKafka = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
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

exports.companyLoginKafka = async (req, res) => {
  auth();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
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
        const payload = { _id: result.data.result.cookie };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).send(token);
      } else {
        res.status(400).send(result.data.result);
      }
    }
  });
};

exports.companySignUpKafka = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
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
