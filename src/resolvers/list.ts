import List from "../models/list";
import Item from "../models/item";

const ListResolvers = {
  Query: {
    lists() {
      return List.find();
    },
    list(parent, { id }, ctx, info) {
      return List.findById(id);
    }
  },
  Mutation: {
    async createList(parent, args, ctx, info) {
      return List.create(args.data);
    },
    async updateList(parent, { id, data }, ctx, info) {
      const listCount = await List.count({ _id: id });
      if (!listCount) throw new Error("List not found");
      return List.findByIdAndUpdate(id, { ...data }, { new: true });
    },
    async deleteList(parent, { id }, ctx, info) {
      const listCount = await List.count({ _id: id });
      if (!listCount) throw new Error("List not found");
      await Item.deleteMany({ list: id });
      return List.findByIdAndDelete(id);
    }
  },
  List: {
    items(parent, args, ctx, info) {
      return Item.find({ list: parent.id });
    }
  }
};

export default ListResolvers;
