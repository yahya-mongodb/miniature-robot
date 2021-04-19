db.users.update({ _id: 1 }, { $unset: { address: true } })


db.users.update({ _id: 1, address: { $exists: true } }, { $unset: { address: true } })



db.users.update({ _id: 1, address: {$type: "object"}}, { $set: { address: [{street: "", postcode:""}] } })



db.users.update({ _id: 1, balance: 980 }, { $set: { balance: 1080 } })



db.users.update({ _id: 1 }, { $inc: { balance: 100 } })





db.users.insert({ _id: 2, firstName: "John", lastName: "Doe" })

db.users.updateOne({_id: 2}, { $set: { firstName: "John", lastName: "Doe" }}, {upsert: true} );



db.users.updateOne({email: "john.doe@gmail.com"}, { $set: { firstName: "John", lastName: "Doe" }}, {upsert: true} );
