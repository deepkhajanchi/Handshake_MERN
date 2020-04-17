const Job = require("../DB/JobpostingSchema");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const Student = require("../DB/StudentSchema");
const Company = require("../DB/CompanySchema");
var ObjectId = require("mongodb").ObjectID;
var crypto = require("crypto");
const kafka = require("../kafka/client");
const KafkaTopic = require("../kafka/topics");

exports.getConversations = async (req, res) => {
  console.log("in getConversations backend controller", req.body.url);
  req.body.url = "/getConversations";
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Message, req.body, (err, result) => {
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

exports.postMessage = async (req, res) => {
  console.log("in getConversations backend controller", req.body.url);
  req.body.url = "/postMessage";
  var correlationId = crypto.randomBytes(16).toString("hex");
  req.body.correlationId = correlationId;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-CORRELATION-ID", correlationId);
  kafka.makeRequest(KafkaTopic.Message, req.body, (err, result) => {
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
