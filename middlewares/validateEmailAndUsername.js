import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function validateEmailAndUsername(req, res, next) {
  const { emailAddress, userName } = req.body;
  try {
    const userWithEmail = await prisma.user.findFirst({
      where: { email_address: emailAddress }
    });
    if (userWithEmail) {
      return res.status(400).json({ message: "Email address already taken" });
    }
    const userWithUsername = await prisma.user.findFirst({
      where: { username: userName }
    });
    if (userWithUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }
    next();
  } catch (e) {
    console.error('Prisma error:', e);
    return res.status(500).json({ 
      message: "Validation error",
      error: process.env.NODE_ENV === "development" ? e.message : undefined
    });
  }
}

export default validateEmailAndUsername;