const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query.user._id'
});

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      setField({
        from: 'params.user._id',
        as: 'data.user._id'
      }),
    ],
    update: [limitToUser],
    patch: [limitToUser],
    remove: [limitToUser]
  },

  after: {
    all: [],
    find: [async (context) => {
      // TODO: use populate or fastJoin
      const userIds = [...new Set(context.result.data.map(message => message.user._id.toString()))];
      const users = await context
        .app
        .service('users')
        .find({
          paginate: false,
          query: {
            _id: {
              $in: userIds,
            },
          }
        });
      const usersById = users.reduce((byId, user) => {
        byId[user._id] = user;
        return byId;
      }, {});
      context.result.data.forEach(message => {
        message.user = usersById[message.user._id];
      });
    }],
    get: [],
    create: [async (context) => {
      context.result.user = await context
        .app.service('users').get(context.result.user._id);
    }],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

// const { authenticate } = require('@feathersjs/authentication').hooks;

// module.exports = {
//   before: {
//     all: [ authenticate('jwt') ],
//     find: [],
//     get: [],
//     create: [],
//     update: [],
//     patch: [],
//     remove: []
//   },

//   after: {
//     all: [],
//     find: [],
//     get: [],
//     create: [],
//     update: [],
//     patch: [],
//     remove: []
//   },

//   error: {
//     all: [],
//     find: [],
//     get: [],
//     create: [],
//     update: [],
//     patch: [],
//     remove: []
//   }
// };
