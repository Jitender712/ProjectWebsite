'use strict';

let saveData = function(model,data){
    var instance = new model(data);
    if(data._id)
    instance.isNew = false;
    return instance.save();
}

let distinct = function(model, distinctData, criteria){
    return model.distinct(distinctData,criteria);
}

let getData = function (model, query, projection, options) {
    return model.find(query, projection, options);
}

function findOne(model, query, projection, options) {
    return model.findOne(query, projection, options);
}

function findAndUpdate(model, conditions, update, options) {
    return model.findOneAndUpdate(conditions, update, options);
}

function pagination(model,query,options){
    return model.paginate(query,options);
}

let findAndRemove = function (model, conditions, options) {
    return  model.findOneAndRemove(conditions, options);
}

let update = function (model, conditions, update, options) {
    return model.update(conditions, update, options);
}

let updateMany = function (model, conditions, update, options) {
    return model.update(conditions, update, options);
}

let remove = function (model, condition) {
    return model.remove(condition);
}

let count = function (model, condition) {
    return model.countDocuments(condition);
}

let countData = function (model, condition) {
    return model.count(condition);
}


let insert = function(model, data, options){
    return model.collection.insert(data,options);
}

let create = function(model, data){
    return new model(data).save();
}

let insertMany = function(model, data, options){
    return model.collection.insertMany(data,options);
}
let find = function (model, query, projection, options) {
    return model.find(query, projection, options);
}
module.exports = {
    saveData: saveData,
    getData: getData,
    update: update,
    remove: remove,
    insert: insert,
    insertMany: insertMany,
    count: count,
    countData: countData,
    findOne: findOne,
    findAndUpdate: findAndUpdate,
    findAndRemove: findAndRemove,
    distinct: distinct,
    create: create,
    updateMany: updateMany,
    find: find,
    pagination:pagination

}
