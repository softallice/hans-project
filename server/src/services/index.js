const users = require('./users/users.service.js');
const account = require('./account/account.service.js');
const email = require('./email/email.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
const blog = require('./blog/blog.service.js');
const comment = require('./comment/comment.service.js');
const fileReference = require('./file-reference/file-reference.service.js');
const uploads = require('./uploads/uploads.service.js');

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
};
