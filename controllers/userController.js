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

export const updateUserAccountInfo = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, userName } = req.body;
    if (!firstName || !lastName || !emailAddress || !userName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        emailAddress,
        NOT: { id: req.userId },
      },
    });

    if (existingEmail) {
      return res.status(409).json({ message: "Email address already in use." });
    }

    const existingUsername = await prisma.user.findFirst({
      where: {
        userName,
        NOT: { id: req.userId },
      },
    });

    if (existingUsername) {
      return res.status(409).json({ message: "Username already in use." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
      },
    });

    res.json({
      message: "Personal information updated successfully",
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        emailAddress: updatedUser.emailAddress,
        userName: updatedUser.userName,
      },
    });
  } catch (error) {
    console.error("UPDATE personal info error:", error);
    res.status(500).json({ message: "Failed to update personal information" });
  }
};
