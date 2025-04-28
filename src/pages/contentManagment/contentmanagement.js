
import React, { useEffect, useState } from "react";
import "./contentManagement.css"

const departments = ["bca", "bsc", "bms", "bbi", "baf"];

function ContentManagementPage() {
  const [selectedDept, setSelectedDept] = useState("bca");
  const [announcements, setAnnouncements] = useState({});
  const [posts, setPosts] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Fetch Announcements
  const fetchAnnouncements = async (dept) => {
    setLoadingAnnouncements(true);
    try {
      const response = await fetch(`http://localhost:8000/announce/get/${dept}/`);
      if (!response.ok) throw new Error("Failed to fetch announcements");

      const data = await response.json();
      const sorted = data.reverse();
      setAnnouncements((prev) => ({ ...prev, [dept]: sorted }));
    } catch (error) {
      console.error("Error fetching announcements for", dept, error);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  // Fetch Posts
  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const response = await fetch(`http://localhost:8000/posts/`);
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      const sorted = data.reverse();
      setPosts(sorted);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (!announcements[selectedDept]) {
      fetchAnnouncements(selectedDept);
    }
  }, [selectedDept]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const deleteAnnouncement = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/${selectedDept}/delete/${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete announcement");

      setAnnouncements((prev) => ({
        ...prev,
        [selectedDept]: prev[selectedDept].filter((a) => a.id !== id),
      }));

      alert("Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Failed to delete announcement");
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/post/delete/${id}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Token a3a3aff90439be49b9a54103a39eb6f2de631a9d`, // if you're using TokenAuthentication
          },

      });
      if (!response.ok) throw new Error("Failed to delete post");

      setPosts((prev) => prev.filter((p) => p.id !== id));

      alert("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="content-management-page">
      <h1>Content Management</h1>

      {/* Posts Section */}
      <section>
        <h2>Manage Posts</h2>
        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : (
          <div className="content-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="card">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  {post.image && <img src={post.image} alt="Post" width="200" />}
                  <button onClick={() => deletePost(post.id)}>Delete Post</button>
                </div>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>
        )}
      </section>

      <hr style={{ margin: "40px 0" }} />

      {/* Announcements Section */}
      <section>
        <h2>Manage Announcements</h2>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{ padding: "8px", marginBottom: "20px" }}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept.toUpperCase()}
            </option>
          ))}
        </select>

        {loadingAnnouncements ? (
          <p>Loading announcements...</p>
        ) : (
          <div className="content-list">
            {announcements[selectedDept]?.length > 0 ? (
              announcements[selectedDept].map((item) => (
                <div key={item.id} className="card">
                  <p>{item.text}</p>
                  <button onClick={() => deleteAnnouncement(item.id)}>Delete Announcement</button>
                </div>
              ))
            ) : (
              <p>No announcements found for {selectedDept.toUpperCase()}.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default ContentManagementPage;
