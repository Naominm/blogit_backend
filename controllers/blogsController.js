export const createBlog = (req, res) => {
  try {
    res.send("creating blog");
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
