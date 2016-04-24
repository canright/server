"use strict";

const path = require("path"),
  fs = require("fs"),
  config = require('./config'),
  reply = require("./reply");

function index(aid, vid, pat) {
  return path.join(config.MOUNT, aid, vid, pat);
}
exports.index = index;

var sendFile = (req, res, full) => {
  res.sendFile(path.join(global.appRoot, full), (err) => {
    if (!err)
      return false;
    else
      if (err.code === "ECONNABORT" && res.statusCode === 304)
        return false;
      else
        reply.pnf(req, res, "File not found", full);
  });
}
exports.sendFile = sendFile;

exports.send = (req, res) => {
  return sendFile(req, res, index(req.dom.aid, req.dom.vid, req.path));
}

exports.exists = (full) => {
  return new Promise((resolve, reject) => {
    fs.access(path.join(global.appRoot, full), fs.F_OK, (err) => {
      if (!err)
        resolve();
      else
        reject(err);
    });
  });
}

function readFile(full) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(global.appRoot, full), "utf8", (err, blob) => {
      if (!err)
        resolve(blob);
      else
        reject(err);
    });
  });
}
exports.readFile = readFile;

exports.fetch = (req, res, pat) => {
  return readFile(index(req.dom.aid, req.dom.vid, pat));
}

function writeFile(full, data) { // post
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(global.appRoot, full), data, (err) => {
      if (!err)
        resolve();
      else
        reject(err);
    });
  });
}
exports.writeFile = writeFile;


exports.post = (req, res, pat, data) => {
  return writeFile(index(req.dom.aid, req.dom.vid, pat), data);
}
