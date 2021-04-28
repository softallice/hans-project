// message-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'message';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    user: { 
      _id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      },
      username: String,
      email: String,
      avatar: { type: String, default: null }
    },
    docUser: { 
      _id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      },
      username: String,
      email: String,
      avatar: { type: String, default: null }
    },
    text: { type: String, required: true }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
