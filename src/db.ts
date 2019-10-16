import * as mongoose from "mongoose";

(<any>mongoose).Promise = global.Promise;

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
