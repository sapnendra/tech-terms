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
    if (content.length < 100) {
      return res.status(400).json({
        message: "Content must be at least 100 characters long",
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
    const post = await Post.find()
      .populate("user", "name email")
      .sort({ date: -1 });
    res
      .status(200)
      .json({ message: "Posts fetched successfully", success: true, post });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Get user's posts
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const post = await Post.find({ user: userId })
      .populate("user", "name email")
      .sort({ date: -1 });
    res
      .status(200)
      .json({ message: "User posts fetched successfully", success: true, post });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("user", "name email");
    if (!post) {
      return res.status(404).json({ 
        message: "Post not found", 
        success: false 
      });
    }
    res.status(200).json({ 
      message: "Post fetched successfully", 
      success: true, 
      post 
    });
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
    
    if (!post) {
      return res.status(404).json({ 
        message: "Post not found", 
        success: false 
      });
    }
    
    // Check if user is the post owner
    const userId = req.user.id.toString();
    const postUserId = post.user.toString();
    
    if (userId !== postUserId) {
      return res.status(403).json({ 
        message: "You can only edit your own posts", 
        success: false 
      });
    }
    
    const { title, content } = req.body;
    if (title && content) {
      post.title = title;
      post.content = content;
    }
    await post.save();
    await post.populate("user", "name email");
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
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }
    
    // Check if user is admin or the post owner
    const userId = req.user.id.toString();
    const postUserId = post.user.toString();
    const isAdmin = req.user.isAdmin;
    
    if (!isAdmin && userId !== postUserId) {
      return res.status(403).json({ 
        message: "You can only delete your own posts", 
        success: false 
      });
    }
    
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Like post
export const likeUnlike = async (req, res) => {
  try {
    const { _id } = req.params;
    let post = await Post.findById(_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    // Convert user.id to string for comparison
    const userId = req.user.id.toString();
    // Check if user already liked the post (convert ObjectIds to strings for comparison)
    const likedIndex = post.likes.findIndex(
      (likeId) => likeId.toString() === userId
    );

    if (likedIndex === -1) {
      // User hasn't liked, add like
      post.likes.push(req.user.id);
    } else {
      // User already liked, remove like
      post.likes.splice(likedIndex, 1);
    }

    await post.save();
    // Populate both user and likes to return complete post info
    await post.populate("user", "name email");
    await post.populate("likes", "name email");
    res.json({ success: true, post });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error", success: false });
  }

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
