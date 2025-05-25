const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/AirBnb";

main().then(() => {
        console.log("Data was initialized");
    }).catch((err) => {
        console.error("Error initializing data:", err);
    });

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
    } catch (err) {
        throw new Error("Failed to connect to MongoDB");
    }
}

const initDB = async () => {
    await Listing.deleteMany({});
    await User.deleteMany({});
    const user = new User();
    user.username = "amit";
    user.email = "mr.amit112004@gmail.com";
    user.save();
    initData.data = initData.data.map((obj)=> ({...obj, owner: user._id}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();