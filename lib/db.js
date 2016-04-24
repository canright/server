'use strict';

const path = require('path'),
  json = require('./json'),
  mongo = require('./mongo'),
  maria = require('./maria');

exports.fetch = (dbi, aid, vid, dirs, base, xtn) => {
  switch (dbi) {
    case 'json': return json.fetch(aid, vid, path.join(dirs, [base, xtn].join('.')));
    case 'mongo': return mongo.fetch(aid, vid, [dirs, xtn].join('_'), base);
    case 'maria': return maria.fetch(aid, vid, [dirs, xtn].join('_'), base);
    default: return { error: 'Unsupported database' };
  }
};

exports.post = (dbi, aid, vid, dirs, base, xtn, data) => {
  switch (dbi) {
    case 'json': return json.post(aid, vid, path.join(dirs, [base, xtn].join('.')), data);
    case 'mongo': return mongo.post(aid, vid, [dirs, xtn].join('_'), base, data);
    case 'maria': return maria.post(aid, vid, [dirs, xtn].join('_'), base, data);
    default: return { error: 'Unsupported database' };
  }
};
