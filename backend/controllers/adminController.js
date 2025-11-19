import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const userCollection =
  User.collection?.collectionName || User.collection?.name || "users";

const buildMatchFilter = (search) => {
  if (!search) return {};

  return {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ],
  };
};

const buildSortStage = (sortBy, sortOrder) => {
  const direction = sortOrder === "asc" ? 1 : -1;

  switch (sortBy) {
    case "title":
      return { title: direction };
    case "likes":
      return { likesCount: direction, date: -1 };
    default:
      return { date: direction };
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      sortBy = "date",
      sortOrder = "desc",
    } = req.query;

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const limitNumber = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);
    const matchFilter = buildMatchFilter(search.trim());
    const sortStage = buildSortStage(sortBy, sortOrder);
    const skip = (pageNumber - 1) * limitNumber;

    const postsPipeline = [
      { $match: matchFilter },
      {
        $lookup: {
          from: userCollection,
          localField: "user",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likes", []] } },
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          date: 1,
          likesCount: 1,
          "author._id": 1,
          "author.name": 1,
          "author.email": 1,
        },
      },
      { $sort: sortStage },
      { $skip: skip },
      { $limit: limitNumber },
    ];

    const [posts, totalPosts] = await Promise.all([
      Post.aggregate(postsPipeline),
      Post.countDocuments(matchFilter),
    ]);

    const formattedPosts = posts.map((post) => {
      const previewLimit = 160;
      const preview =
        (post.content || "").slice(0, previewLimit).trimEnd() +
        ((post.content || "").length > previewLimit ? "..." : "");

      return {
        id: post._id,
        title: post.title,
        author: {
          name: post.author?.name || "Unknown",
          email: post.author?.email || "N/A",
        },
        publishedOn: post.date,
        likesCount: post.likesCount,
        contentPreview: preview,
        permissions: {
          canDelete: true,
          canEdit: false,
        },
      };
    });

    const [
      totalUsers,
      likesAggregation,
      activeAuthors,
      recentPosts,
      topLikedPosts,
    ] = await Promise.all([
      User.countDocuments(),
      Post.aggregate([
        {
          $project: {
            likesCount: { $size: { $ifNull: ["$likes", []] } },
          },
        },
        {
          $group: {
            _id: null,
            totalLikes: { $sum: "$likesCount" },
          },
        },
      ]),
      Post.distinct("user"),
      Post.aggregate([
        {
          $lookup: {
            from: userCollection,
            localField: "user",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            likesCount: { $size: { $ifNull: ["$likes", []] } },
          },
        },
        { $sort: { date: -1 } },
        { $limit: 5 },
        {
          $project: {
            title: 1,
            date: 1,
            likesCount: 1,
            "author.name": 1,
          },
        },
      ]),
      Post.aggregate([
        {
          $addFields: {
            likesCount: { $size: { $ifNull: ["$likes", []] } },
          },
        },
        { $sort: { likesCount: -1, date: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: userCollection,
            localField: "user",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            title: 1,
            date: 1,
            likesCount: 1,
            "author.name": 1,
          },
        },
      ]),
    ]);

    const totalLikes = likesAggregation[0]?.totalLikes || 0;
    const averageLikes =
      totalPosts === 0 ? 0 : Number((totalLikes / totalPosts).toFixed(1));

    return res.status(200).json({
      success: true,
      message: "Admin dashboard data fetched successfully",
      stats: {
        totalPosts,
        totalUsers,
        totalLikes,
        activeAuthors: activeAuthors.length,
        averageLikes,
      },
      filters: {
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.max(Math.ceil(totalPosts / limitNumber), 1),
        search: search.trim(),
        sortBy,
        sortOrder,
      },
      posts: formattedPosts,
      spotlight: {
        recentPosts,
        topLiked: topLikedPosts,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to load dashboard data" });
  }
};

export const adminDeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post removed from the platform",
      deletedPostId: id,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete post" });
  }
};

