//  1. Address as array of subdocuments

// Customer collection
var customer = {
    _id: "CUST123",
    name: "John",
    addresses: [{
        addressId: "ABC123",
        firstLine: "London",
        country: "UK",
        postcode: "E1C 1RA"
    }]
}



//  2. Address as array of subdocuments, duplicate it in Address collection
// Customer collection
var customer = {
    _id: "CUST123",
    name: "John",
    addresses: [{
        addressId: "ABC123",
        firstLine: "London",
        country: "UK",
        postcode: "E1C 1RA"
    }]
}

// Address collection
var address = {
    customerId: "CUST123",
    _id: "ABC123",
    firstLine: "London",
    country: "UK",
    postcode: "E1C 1RA"
}



//  3. Address as array of reference objects, full address documents stored in Address collection
// Customer collection
var customer = {
    _id: "CUST123",
    name: "John",
    addresses: [{
        addressId: "ABC123"
    },
    {
        addressId: "XYZ321"
    }]
}

// Address collection
var address = {
    customerId: "CUST123",
    _id: "ABC123",
    firstLine: "London",
    country: "UK",
    postcode: "E1C 1RA"
}
