const mongoose = require("mongoose");


/**
 * methods: add a method on an instance retrieved
 * statics add a method directly on the class
 * query: useful when we want to add aditional param search the find method
 * can use schema query to enable multicriteria search by chaining method
 * you can use virtuals to create calculated attributes
*/

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    updated_at:{
        type: Date,
        default: new Date()
    },
    skills: [String],
    projects: {
        title: String,
        description: String
    },
    collaborator: {
        type: mongoose.SchemaTypes.ObjectId,
        // required: true,
        ref: "User"
    }
});

userSchema.methods.getInfo = function(){
    console.log(`Resume: Tech stack efficiency ${this.skills.length}`);
}

userSchema.statics.findByEfficiency = function(){
    return this.where('skills').gte(2);
}

userSchema.statics.insensitiveSearch = function(query){
    return this.where({name: new RegExp(query, 'i')})
}


module.exports = mongoose.model("User", userSchema);