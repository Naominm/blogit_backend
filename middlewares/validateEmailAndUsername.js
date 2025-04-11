import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
async function validateEmailAndUsername(req, res, next) {
  const { emailAddress, userName } = req.body;
  try {
    const userWithEmail = await client.user.findFirst({
      where: { emailAddress },
    });
    if (userWithEmail) {
      res.status(400).json({ message: "EmailAddress already taken" });
    }
    const userWithUsername = await client.user.findFirst({
      where: { userName },
    });
    if (userWithUsername) {
      res.status(400).json({ message: "Username already taken" });
    }
    next();
  } catch (e) {
    res.status(500).json({ message: "Error validating username and email" });
  }
}

export default validateEmailAndUsername;
