export const createBlog = (req, res) => {
  try {
    const { title, description, excerpt } = req.body;
    res.send({ title, description, excerpt, content });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
