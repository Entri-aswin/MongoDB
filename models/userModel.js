const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 8,
    },
    isPremiumMember: {
        type: Boolean,
        default: false,
    },
    mobile: {
        type: Number,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

