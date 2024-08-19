import prisma from "../lib/prisma.js";


export const getPosts = async (req, res, next) => {
    const query = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || undefined,
                    lte: parseInt(query.maxPrice) || undefined,
                },
            },
        });

        res.status(200).json(posts)

    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: "Failed to get posts" })
    }
}


export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          postDetail: true,
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      });
  
      const token = req.cookies?.token;
  
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
          if (!err) {
            const saved = await prisma.savedPost.findUnique({
              where: {
                userId_postId: {
                  postId: id,
                  userId: payload.id,
                },
              },
            });
            res.status(200).json({ ...post, isSaved: saved ? true : false });
          }
        });
      }
      res.status(200).json({ ...post, isSaved: false });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get post" });
    }
  };
  


export const addPost = async (req, res, next) => {
    const body = req.body
    const userId = req.userId
    console.log(body)
    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId,
                postDetail: {
                    create: body.postDetail,
                }
            }
        })
        console.log(newPost)
        res.status(200).json(newPost)

    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: "Failed to get posts" })
    }
}



export const updatePost = (req, res, next) => {
    try {

    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: "Failed to get posts" })
    }
}


export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized!" });
        }

        await prisma.post.delete({
            where: { id },
        });

        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete post" });
    }
};