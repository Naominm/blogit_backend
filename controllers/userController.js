import { PrismaClient } from "@prisma/client";

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

export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      emailAddress: user.emailAddress,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      profile: user.profile || {},
    });
  } catch (error) {
    console.error("GET profile error:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};
