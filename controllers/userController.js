import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const createOrUpdateUserProfile = async (req, res) => {
  try {
    const { phoneNumber, occupation, bio, secondaryEmail } = req.body;

    let profile = await prisma.profile.findUnique({
      where: { userId: req.userId },
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId: req.userId,
          phoneNumber,
          occupation,
          bio,
          secondaryEmail,
        },
      });
    } else {

      profile = await prisma.profile.update({
        where: { userId: req.userId },
        data: { phoneNumber, occupation, bio, secondaryEmail },
      });
    }

    res.json({ message: "Profile information updated", profile });
  } catch (error) {
    console.error("POST or UPDATE profile error:", error);
    res.status(500).json({ message: "Failed to update or create profile" });
  }
};
