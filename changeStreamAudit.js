db.getSiblingDB("inventory").sensors.deleteMany({});
db.getSiblingDB("inventory").sensorsAudit.deleteMany({});
var i;
for (i = 0; i < 30; i++) {
  printjson(
    db.getSiblingDB("inventory").sensors.insertOne({
      _id: i,
      sensorId: i,
      a: i,
    })
  );
}

var i;
for (i = 0; i < 30; i++) {
  printjson(
    db.getSiblingDB("inventory").sensors.findOneAndUpdate(
      { _id: i },
      {
        $set: {
          sensorId: i,
          a: i,
          b: null
        }
      },
      {
        upsert: true,
        returnNewDocument: false,
      }
    )
  );
  sleep(500);
}



watchCursor = db.getSiblingDB("inventory").sensors.watch([]);
while (!watchCursor.isExhausted()) {
  if (watchCursor.hasNext()) {
    var current = watchCursor.next();
    printjson(current);

    if (current.updateDescription && current.updateDescription.updatedFields) {
      Object.keys(current.updateDescription.updatedFields).forEach(function (prop) {
        print(prop, current.updateDescription.updatedFields[prop]);
        printjson(
          db.getSiblingDB("inventory").sensorsAudit.insertOne({
            ts: new Date(),
            identifier: current.documentKey._id,
            fieldName: prop,
            fieldValue: current.updateDescription.updatedFields[prop],
            o: "u"
          })
        );
      });
    }
  }
}




db.getSiblingDB("inventory").sensorsAudit.aggregate([
 {$match: {"identifier" : 7, o : "u"}},
 {
     $lookup:
       {
         from: "sensorsAudit",
         let: { currentTs: "$ts", currentFieldName: "$fieldName"},
         as: "oldFieldValue",
         pipeline: [
            {$match: {"identifier" : 7}},
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

  { $sort: {ts: -1}},
  {      $unwind:
      {
        path: "$oldFieldValue",
        preserveNullAndEmptyArrays: true
      }
    }
]).pretty()








d = {
    name: "John",
    tags: ["a", "b", "c"],
    addresses: [
        {
            door: 10,
            postCode:"W11AA"
        },
        {
            door: 11,
            postCode:"W11AC"
        }
    ]
}


d = {
    name: "John",
    tags: ["a", "b", "d"],
    addresses: [
        {
            door: 10,
            postCode:"W11B"
        },
        {
            door: 11,
            postCode:"W11AC"
        }
    ]
}
