

var mydoc = {
  _id: "john.doe",
  firstName: "John",
  lastName: "Doe",
  isMember: true
}

db.getSiblingDB("mydb").users.insertOne(mydoc);
trx = ObjectId();
db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "firstName", fieldValue: "John", ts: new Date(), o : "i", trx });
db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "lastName", fieldValue: "Doe", ts: new Date(), o : "i", trx });
db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "isMember", fieldValue: true, ts: new Date(), o : "i", trx });

db.getSiblingDB("mydb").users.updateOne({_id: "john.doe"}, { $set: { isMember: false, country: "UK" } })
trx = ObjectId();
// db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "firstName", fieldValue: "John", ts: new Date(), o : "u", trx });
// db.getSiblingDB("mydb").usersAudit.updateOne(
//     { identifier: "john.doe", fieldName: "firstName", fieldValue: "John" }, 
//     { 
//       $set: { ts: new Date(), o : "u", trx }
//     },
//     {
//       upsert: true
//     });
// db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "lastName", fieldValue: "Doe", ts: new Date(), o : "u", trx });
db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "isMember", fieldValue: false, ts: new Date(), o : "u", trx });
db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "country", fieldValue: "UK", ts: new Date(), o : "u", trx });



db.getSiblingDB("mydb").users.updateOne({_id: "john.doe"}, { $set: { firstName: "Johny" } })
trx = ObjectId();
db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "firstName", fieldValue: "Johny", ts: new Date(), o : "u", trx });


db.getSiblingDB("mydb").users.updateOne({_id: "john.doe"}, { $set: { firstName: "Fred" } })
trx = ObjectId();
db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "firstName", fieldValue: "Fred", ts: new Date(), o : "u", trx });

db.getSiblingDB("mydb").users.updateOne({_id: "john.doe"}, { $set: { firstName: "John" } })
trx = ObjectId();
db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", fieldName: "firstName", fieldValue: "John", ts: new Date(), o : "u", trx });





//$sort
//$lookup ( 1 before current ), join it using fieldName
//$project, old value and new value

db.getSiblingDB("mydb").usersAudit.aggregate([
 {
     $lookup:
       {
         from: "usersAudit",
         let: { currentTs: "$ts", currentFieldName: "$fieldName"},
         as: "oldFieldValue",
         pipeline: [
           { $sort: {ts: -1}},

              { $match:
                 { $expr:
                    { $and:
                       [
                         { $eq: [ "$fieldName",  "$$currentFieldName" ] },
                         { $lt: [ "$ts",  "$$currentTs" ] },
                       ]
                    }
                 }
              },
              { $limit: 1},
              { $project: { _id: 0, change: { f: "$fieldName", fv: "$fieldValue"} } },
              { $replaceRoot: { newRoot: "$change" } }
           ],
       }
  },
  {
    $match: { o: "u" }
  },
  { $sort: {ts: -1}},
  {      $unwind:
      {
        path: "$oldFieldValue",
        preserveNullAndEmptyArrays: true
      }
    },
]).pretty()







var mydoc = {
  _id: "john.doe",
  firstName: "John",
  lastName: "Doe",
  isMember: true
}
db.getSiblingDB("mydb").users.insertOne(mydoc);


//CHANGE ON UI

//Backend
var currentDoc = db.getSiblingDB("mydb").users.findOne({_id: "john.doe"});

var newDoc = { firstName: "John", lastName: "Doe", isMember: false, country: "UK" };

var diffs = currentDoc - newDoc;
db.getSiblingDB("mydb").users.updateOne({_id: "john.doe"}, { $set: newDoc });
trx = new ObjectId()

foreach(diff in diffs)
  db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", diff: diff, ts: new Date(), o : "u", trx });









changeDoc = { $set: {
  _id: "john.doe",
  firstName: "Johny",
  lastName: "Doe",
  isMember: false
}}

var updatedDoc = db.getSiblingDB("mydb").users.findOneAndUpdate({_id: "john.doe"}, changeDoc);

var diffs = currentDoc - newDoc;


foreach(diff in diffs)
  db.getSiblingDB("mydb").usersAudit.insertOne({ identifier: "john.doe", diff: diff, ts: new Date(), o : "u", trx });
