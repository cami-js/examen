const{Schema,model, SchemaType}=require("mongoose")

const newUser = new Schema({
    username:{
        type: Schema.Types.String,
        min: 4,
        max: 20,
        required: true
    },
    password:{
        type: Schema.Types.String,
        min: 8,
        required: true
    },
    email:{
        type: Schema.Types.String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{versionKey:false,timestamps:true})

module.exports = model("users", newUser)