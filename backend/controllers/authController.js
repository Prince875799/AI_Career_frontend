import User from "../models/User.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { genToken } from "../utils/generateToken.js";

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({ message: "User already exists" });

        if (!validator.isEmail(email)) return res.status(400).json({ message: "Enter valid Email" });
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

        const hashPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name, email, password:hashPassword
        })

        const token = genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        return res.status(200).json({ message: "User Registration Successful",token, user });
  
    } catch (error) {
        return res.status(500).json({ message: `Register error ${error}` });
    }
}

export const LoginUser = async(req, res) =>{
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = genToken(user._id);
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(500).json({ message: `Login error ${error}` });
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Profile error ${error}` });
  }
};

export const LogOut = async (req, res) => {
  try {
    res.clearCookie("token")
    return res.status(200).json({ message: "Logout successfully" })
  } catch (error) {
    console.log("Logout error")
    return res.status(500).json({ message: `Logout error ${error}` })
  }
}
