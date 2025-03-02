// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Improved icons

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Delete post by ID
  const handleDelete = async (postId) => {
    try {
      console.log("Deleting post with ID:", postId);
      const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      console.log("Delete response:", response.data);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  // Edit post by ID
  const handleEdit = (post) => {
    setEditPost(post._id);
    setFormData({ title: post.title, content: post.content, image: post.image });
  };

  // Save updated post
  const handleUpdate = async () => {
    if (!editPost) return alert("No post selected for update.");
  
    console.log("Updating post with ID:", editPost);
    console.log("Form Data:", formData);
  
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/${editPost}`, formData);
      console.log("Update response:", response.data);
  
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === editPost ? response.data : post))
      );
  
      alert("Post updated successfully!");
      setEditPost(null);
      setFormData({ title: "", content: "", image: "" });
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error);
      alert("Failed to update post.");
    }
  };
  
  
  

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Family Blog Posts</h1>

      {editPost && (
        <div className="mb-6 p-4 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-2 w-full mb-4"
          />
          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="border p-2 w-full mb-4"
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="mt-2">{post.content}</p>

            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="mt-4 rounded-lg max-w-full"
                onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
              />
            )}

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(post)}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <FaEdit className="mr-2" /> Edit
              </button>

              <button
                onClick={() => handleDelete(post._id)}
                className="flex items-center text-red-500 hover:text-red-700"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
