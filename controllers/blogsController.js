import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content,imageUrl  } = req.body;
    const authorID = req.user.id;
    const newBlog = await client.blog.create({
      data: {
        title,
        excerpt,
        content,
        authorID,
        imageUrl
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
    const blog = await client.blog.findFirst({
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


export const getBlogs = async (req, res) => {
  try {
    const authorID = req.user.id;
    const blogs = await client.blog.findMany({
      where: {
        authorID,
        isDeleted: false,
      },
      include: { author: true }, 
    });
    if (blogs.length > 0) {
      console.log("Blogs Found", blogs);
      return res.status(200).json(blogs);
    } else {
      res.status(404).json({ message: "No blogs found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
  }

  export const updateBlog = async (req, res) => {
    try {
      const { blogId } = req.params;
      const { title, excerpt, content,imageUrl } = req.body;
      const authorID = req.user.id;
  
      const blog = await client.blog.findFirst({
        where: {
          id: blogId,
          authorID,
          isDeleted: false,
        },
      });
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      const updatedBlog = await client.blog.update({
        where: { id: blogId },
        data: {
          title: title || blog.title,  
          excerpt: excerpt || blog.excerpt,
          content: content || blog.content,
          imageUrl: imageUrl || blog.imageUrl, 
        },
      });
  
      return res.status(200).json({ blog: updatedBlog, message: "Blog updated successfully" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  export const deleteBlog = async (req, res) => {
    try {
      const { blogId } = req.params;
      const authorID = req.user.id;
  
      const blog = await client.blog.findFirst({
        where: {
          id: blogId,
          authorID,
          isDeleted: false, 
        },
      });
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found or already deleted" });
      }
  
      const deletedBlog = await client.blog.update({
        where: { id: blogId },
        data: { isDeleted: true },
      });
  
      return res.status(200).json({ message: "Blog deleted successfully", blog: deletedBlog });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  