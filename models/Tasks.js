//Definision the Schema of Database
const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Input the Task Name."], //true は絶対必要と言う意味
        trim: true, //空白削除
        maxlength: [20,"Task Name should be within 20 char."],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Task",TaskSchema);
