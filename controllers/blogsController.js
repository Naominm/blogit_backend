export const createBlog = (req, res) => {
  try {
    res.send("creating a note");
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
