import * as mongoose from "mongoose";

const schema = mongoose.Schema;

const ListSchema = new schema({
  title: {
    type: String,
    required: true
  }
});

export default mongoose.model("list", ListSchema);
