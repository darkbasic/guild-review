import auth = require("basic-auth");

const admins = { 'admin': { password: process.env.ADMIN_PASSWORD || 'password' }, };

export const clientAuth = (request, response, next) => {
  const user = auth(request);
  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="guild-review"');
    return response.status(401).send();
  }
  return next();
};

const schneiderAdmins = { 'schneider': { password: process.env.SCHNEIDER_PASSWORD || 'password' }, };

export const schneiderAuth = (request, response, next) => {
  const user = auth(request);
  if (!user || !schneiderAdmins[user.name] || schneiderAdmins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="guild-review"');
    return response.status(401).send();
  }
  return next();
};