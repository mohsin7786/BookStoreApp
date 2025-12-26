import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const CreatedUser = new User({
            name: name,
            email: email,
            password: hashPassword
        });

        await CreatedUser.save()
        res.status(201).json({
            message: "User Created Successfully", user: {
                _id: CreatedUser._id,
                name: CreatedUser.name,
                email: CreatedUser.email
            }
        })


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            res.status(400).json({ message: "Invalid username or password" })

        }
        else {
            res.status(200).json({
                message: "Login successfull", user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            })

        }
    }
    catch (err) {
        console.log("error", err);
        res.status(500).json({ message: "Internal Server Error" })

    }
}