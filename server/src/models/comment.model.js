// comment-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'comment';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    blog: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'users', index: true },
    parentComment:{type: Schema.Types.ObjectId, ref:'comment'},
    text: { type: String, required: [true, "text is required!"] },
    isDeleted: { type: Boolean, default: false },
    updatedAt: { type: Date },
  }, {
    timestamps: true,
    toObject:{virtuals:true},
    versionKey: false
  });

  schema.virtual('childComments')
  .get(function(){ return this._childComments; })
  .set(function(value){ this._childComments=value; });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
