const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// Schema

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [
      {
        validator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(value)
        },
        message: "Please enter a valid email.",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minLength: [10, "Min Lenght is 10"],
  },
})

// Hashing the Password

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

// Model based on the Schema

const User = mongoose.model("user", UserSchema)

module.exports = User
