'use strict';

class MongoInterface {
  constructor(schema) {
    this.schema = schema;
  }

  create(data) {
    let newEntry = new this.schema(data);
    return newEntry.save();
  }
  
  exists(data) {
    return this.schema.exists(data);
  }
  // get(_id) {
  //   let searchParam = _id ? { _id } : {};
  //   return this.schema.find(searchParam);
  // }


  // update(_id, data) {
  //   let updatedEntry = this.schema.findByIdAndUpdate(_id, data);
  //   return updatedEntry;
  // }

  // delete(_id) {
  //   let searchParam = _id ? { _id } : {};
  //   return this.schema.deleteOne(searchParam);
  // }
}

module.exports = MongoInterface;