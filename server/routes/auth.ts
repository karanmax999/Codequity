import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { storage } from "../storage";

const router = Router();

// Initialize default admin user if not exists
async function ensureAdminUser() {
  const existingAdmin = await storage.getUserByUsername("admin");
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await storage.createUser({
      username: "admin",
      password: hashedPassword
    });
  }
}

// Call this on startup
ensureAdminUser().catch(console.error);

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

router.post("/api/auth/login", async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { username, password } = validatedData;

    // Find user in database
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid username or password" 
      });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
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
          username: user.username
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

router.get("/api/auth/me", async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string };
    const user = await storage.getUser(decoded.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
});

export default router;
