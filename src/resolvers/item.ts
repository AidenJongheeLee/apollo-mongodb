import Item from "../models/item";
import List from "../models/list";

interface UpdateItemParams {
  note: String;
  list: String;
  finished: Boolean;
}

interface QueryParams {
  note: any;
}

const ItemResolvers = {
  Query: {
    async items(parent, args, ctx, info) {
      const opArgs = {} as QueryParams;
      if (args.query) {
        opArgs.note = {
          $regex: `.*${args.query}.*`
        };
      }
      return Item.find(opArgs);
    },
    item(parent, { id }, ctx, info) {
      return Item.findById(id);
    }
  },
  Mutation: {
    async createItem(parent, { data }, ctx, info) {
      const listCount = await List.count({ _id: data.list });
      if (!listCount) throw new Error("List not found");

      return Item.create(data);
    },
    async updateItem(parent, { data, id }, ctx, info) {
      const itemCount = await Item.count({ _id: id });
      if (!itemCount) throw new Error("Item not found");
      const updates = { ...data } as UpdateItemParams;
      return Item.findByIdAndUpdate(id, updates, { new: true });
    },
    async deleteItem(parent, { id }, ctx, info) {
      const itemCount = await Item.count({ _id: id });
      if (!itemCount) throw new Error("Item not found");
      return Item.findByIdAndDelete(id);
    }
  },
  Item: {
    list(parent, args, ctx, info) {
      return List.findById(parent.list);
    }
  }
};

export default ItemResolvers;
