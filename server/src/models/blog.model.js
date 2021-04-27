module.exports = function (app) {
  const modelName = 'blog';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    title: { type: String, required: [true, "Title is required!"] },
    body: { type: String, required: [true, "Body is required!"] },
    author: { 
      _id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      },
      username: String,
      email: String,
      avatar: { type: String, default: null }
   },
    category: { type: String },
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    images: [{ type: String }], // references to blobs
    attachment: { type: String }, // reference to blob    
    location: { type: String },
    updatedAt: { type: Date }
  }, {
    timestamps: true,
    versionKey: false
  });

  // create an index to find last changed entries more easily
  schema.index({ updatedAt: -1 });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
