const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/create", async (req, res, next) => {
    try {
        const { name, email, password, isPremiumMember, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({
                message: "all field are required",
            });
        }

        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            return res.status(400).json({
                message: "user already exist",
                success: false,
            });
        }

        const user = new User({ name, email, password, isPremiumMember, mobile });
        user.save();

        return res.json({
            message: "user created successfully",
            success: true,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/userList", async (req, res, next) => {
    try {
        const userList = await User.find();
        return res.json({
            data: userList,
            success: true,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: " id required",
            });
        }
        const userData = await User.findById(id);

        return res.json({
            data: userData,
            success: true,
        });
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { name, email, password, isPremiumMember, mobile } = req.body;

        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: " id required",
            });
        }
        const userData = await User.findByIdAndUpdate(
            id,
            { name, email, password, isPremiumMember, mobile },
            { new: true }
        );

        return res.json({
            data: userData,
            success: true,
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: " id required",
            });
        }
        const userData = await User.findByIdAndDelete(id);

        return res.json({
            message: "user Deleted successfully",
            success: true,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = { userRouter: router };
