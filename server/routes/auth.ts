import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();

// Simple in-memory user store for demo purposes
// In production, you should use a proper database
const users = [
  {
    id: "1",
    username: "admin",
    password: "admin123", // In production, use hashed passwords
    role: "admin"
  }
];

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

router.post("/api/auth/login", async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { username, password } = validatedData;

    // Find user (in production, use proper database lookup with hashed passwords)
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid username or password" 
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        message: "Validation failed", 
        errors: error.errors 
      });
    } else {
      console.error("Login error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  }
});

router.post("/api/auth/logout", (req, res) => {
  // For JWT, logout is handled client-side by removing the token
  res.json({ 
    success: true, 
    message: "Logout successful" 
  });
});

router.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string };
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
});

export default router;
