import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    const authorID = req.user.id;
    const newBlog = await client.blog.create({
      data: {
        title,
        excerpt,
        content,
        authorID,
      },
    });
    console.log(newBlog);
    res.status(201).json({ blog: newBlog, message: "New blog created successfully" });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const authorID = req.user.id;
    const { blogId } = req.params;
    const blog = await client.blog.findUnique({
      where: {
        authorID,
        id: blogId,
        isDeleted: false,
      },
      include:{author:true},
    });
    if (blog) {
      console.log("Blog Found" , blog)
      return res.status(200).json(blog);
    }
    res.status(404).json({ message: "Entry not found" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};
