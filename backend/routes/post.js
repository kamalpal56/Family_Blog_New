import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Post from '../models/Post.js';

const router = express.Router();

// ✅ Create a new post (POST /api/posts)
router.post('/', async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newPost = new Post({ title, content, image });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
});

// ✅ Get all posts (GET /api/posts)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// ✅ Delete a post by ID (DELETE /:id)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Error deleting post' });
  }
});

// ✅ Update a post by ID (PUT /api/posts/:id)
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, image } = req.body;
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content, image },
        { new: true } // Returns the updated document
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Error updating post', error });
    }
  });
  
  

export default router;
