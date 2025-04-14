import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
async function validateEmailAndUsername(req, res, next) {
  const { emailAddress, userName } = req.body;
  try {
    const userWithEmail = await client.user.findFirst({
      where: { emailAddress },
    });
    if (userWithEmail) {
      return res.status(400).json({ message: "EmailAddress already taken" });
    }
    const userWithUsername = await client.user.findFirst({
      where: { userName },
    });
    if (userWithUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }
    next();
  } catch (e) {
    console.error('Prisma error:', e);
    return res
      .status(500)
      .json({ message: "Error validating username and email" });
  }
}

export default validateEmailAndUsername;
