import bcrypt from "bcryptjs";
import User from "../models/user.js";

// SIGN UP
export async function signUp(req, res) {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    // Check existing user
    const exists = await User.findOne({ username });

    if (exists) {
      return res.status(409).json({
        message: "User already exists.",
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      password: hashed,
    });

    // Save session
    req.session.userId = newUser._id;

    // Response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Save session
    req.session.userId = user._id;

    // Success response
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

//logout 
export async function logout(req,res) {
  req.session.destroy()
  res.json({message:"Logged out  !!"})
} 

//check if user a user has an active session 

export async function getMe(req, res){
  if(!req.session.userId) {
      return res.json(null)
  }
  const user  = await UserActivation.findById(req.session.userId).select('-password');
  res.json(user);
  
}