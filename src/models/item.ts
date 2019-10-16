import * as mongoose from "mongoose";

const schema = mongoose.Schema;

const itemSchema = new schema({
  note: {
    type: String,
    required: true
  },
  list: {
    type: String,
    required: true
  },
  finished: {
    type: Boolean,
    required: true,
    default: false
  }
});

export default mongoose.model("item", itemSchema);
