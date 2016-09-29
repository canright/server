"use strict";

const path = require("path"),
  fs = require("fs"),
  config = require('./config'),
  reply = require("./reply");

const index = (dom, pat) => path.join(config.MOUNT, config.FID, dom.aid, dom.vid, pat);
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

exports.send = (req, res) => sendFile(req, res, index(req.dom, req.path));

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
const get = (full) => readFile(full);
exports.get = get;

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

exports.fetch = (req, res, pat) => readFile(index(req.dom, pat));

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
  return writeFile(index(req.dom, pat), data);
}

function fileStat(dir, fn) {
  return new Promise((resolve, reject) => {
    fs.stat(path.join(dir,fn), (err, stats) => {
      if (err)
        reject(err);
      else
        resolve({
//        btime: stats.birthtime,
//        mtime: stats.mtime,
          dir: stats.isDirectory(),
          fn: fn
        });
    });
  });
}

function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, fns) => {
      if (!err)
        resolve(Promise.all(fns.map(fn=>fileStat(dir,fn))));
      else
        reject(err);
    });
  });
}
exports.readDir = readDir;
