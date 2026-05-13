import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const allowedOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

export function configureSecurity(app) {
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(cors({
    origin: allowedOrigin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-demo-role"]
  }));
  app.use(rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false
  }));
}

export function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    const role = req.header("x-demo-role") ?? "Viewer";
    if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
      req.userRole = role;
      return next();
    }
    return res.status(403).json({
      error: "Forbidden",
      message: "This simulated role does not have permission to perform this action."
    });
  };
}