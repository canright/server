'use strict';

const path = require('path'),
  json = require('./json'),
  mongo = require('./mongo'),
  maria = require('./maria');

exports.fetch = (dom, dirs, base, xtn) => {
  switch (dom.db) {
    case 'json': return json.fetch(dom, path.join(dirs, [base, xtn].join('.')));
    case 'mongo': return mongo.fetch(dom, [dirs, xtn].join('_'), base);
    case 'maria': return maria.fetch(dom, [dirs, xtn].join('_'), base);
    default: return { error: 'Unsupported database' };
  }
};

exports.post = (dom, dirs, base, xtn, data) => {
  switch (dom.db) {
    case 'json': return json.post(dom, path.join(dirs, [base, xtn].join('.')), data);
    case 'mongo': return mongo.post(dom, [dirs, xtn].join('_'), base, data);
    case 'maria': return maria.post(dom, [dirs, xtn].join('_'), base, data);
    default: return { error: 'Unsupported database' };
  }
};
