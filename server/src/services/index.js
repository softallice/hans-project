const users = require('./users/users.service.js');
const account = require('./account/account.service.js');
const email = require('./email/email.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
const blog = require('./blog/blog.service.js');
const comment = require('./comment/comment.service.js');
const fileReference = require('./file-reference/file-reference.service.js');
const uploads = require('./uploads/uploads.service.js');

const goal = require('./goal/goal.service.js');

const weight = require('./weight/weight.service.js');

const pressure = require('./pressure/pressure.service.js');

const sugar = require('./sugar/sugar.service.js');

const exercise = require('./exercise/exercise.service.js');

const message = require('./message/message.service.js');

const meal = require('./meal/meal.service.js');

const basic = require('./basic/basic.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(account);
  app.configure(email);
  app.configure(authManagement);
  app.configure(blog);
  app.configure(comment);
  app.configure(fileReference);
  app.configure(uploads);
  app.configure(goal);
  app.configure(weight);
  app.configure(pressure);
  app.configure(sugar);
  app.configure(exercise);
  app.configure(message);
  app.configure(meal);
  app.configure(basic);
};
