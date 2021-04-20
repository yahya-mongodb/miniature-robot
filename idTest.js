function getNextId(counterName){
    var counters = db.counters.findOneAndUpdate({ _id: counterName}, { $inc: { nextId: 1 } }, { projection: {nextId: 1, _id: 0}, returnNewDocument: true, upsert: true});
    return counters.nextId;
}


getNextId("review")
getNextId("review")
getNextId("customer")
