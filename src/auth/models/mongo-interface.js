'use strict';

/**
 * Mongo Interface
 * @module mongo
 */

 // contains Mongo's equivalent of CRUD functions

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

  get(_id) {
    let searchParam = _id ? { _id } : {};
    return this.schema.find(searchParam)
      .then(result => {
        let formatted = {
          count: result.length,
          results: result
        }
        return formatted;
      })
      .catch(err => console.log(err));
  }

  getByUsername(username) {
    let searchParam = username ? { username } : {};
    return this.schema.find(searchParam)
      .then(result => {
        let formatted = result[0];
        return formatted;
      })
      .catch(err => console.log(err));
  }

  update(_id, data) {
    let updatedEntry = this.schema.findByIdAndUpdate(_id, data);
    return updatedEntry;
  }

  delete(_id) {
    let searchParam = _id ? { _id } : {};
    return this.schema.deleteOne(searchParam);
  }
}

module.exports = MongoInterface;