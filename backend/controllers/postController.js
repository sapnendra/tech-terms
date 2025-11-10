import Post from "../models/postModel.js";

// Create new post
export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    if (content.length < 30) {
      return res.status(400).json({
        message: "Content must be at least 30 characters long",
        success: false,
      });
    }
    const existingPost = await Post.findOne({ title });
    if (existingPost) {
      return res
        .status(400)
        .json({ message: "Post already exists", success: false });
    }
    const post = await Post.create({
      title,
      content,
      user: userId, // Add the authenticated user's ID
    });
    return res.status(201).json({
      message: "Post created successfully",
      success: true,
      post: post,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Get all post
export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find();
    res
      .status(200)
      .json({ message: "Posts fetched successfully", success: true, post });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Edit post
export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const { title, content } = req.body;
    if (title && content) {
      post.title = title;
      post.content = content;
    }
    await post.save();
    return res
      .status(200)
      .json({ message: "Post updated", success: true, post });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Like post
export const likeUnlike = async (req, res) => {
  const { _id } = req.params;
  let post = await Post.findOne(_id);

  if (post.likes.indexOf(req.user.id) === -1) {
    post.likes.push(req.user.id);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.id), 1);
  }

  await post.save();
  res.json({ post });

  //   const referer = req.get("referer") || "";

  //   let redirectTo = "/";
  //   try {
  //     const refererUrl = new URL(referer);
  //     const pathname = refererUrl.pathname || "/";
  //     if (
  //       pathname === "/" ||
  //       pathname === "/profile" ||
  //       pathname === "/profile/" ||
  //       pathname.startsWith("/profile")
  //     ) {
  //       redirectTo = pathname;
  //     }
  //   } catch (e) {
  //     redirectTo = "/";
  //   }

  //   res.redirect(redirectTo);
};
