import React, { useEffect, useState } from 'react';
import './sHomePage.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const SHomePage = () => {
  const [posts, setPosts] = useState([]);
  const [likesInfo, setLikesInfo] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8000/posts/')
      .then(response => response.json())
      .then(data => {
        const reversedPosts = data.reverse(); // latest first
        setPosts(reversedPosts);
        reversedPosts.forEach(post => {
          fetchLikeInfo(post.id);
        });
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const fetchLikeInfo = async (postId) => {
    try {
      const res = await fetch(`http://localhost:8000/post/Getlike/${postId}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      const data = await res.json();

      const res2 = await fetch(`http://localhost:8000/post/like/${postId}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      const likeData = await res2.json();

      setLikesInfo(prev => ({
        ...prev,
        [postId]: {
          isLiked: data.is_liked > 0,
          count: likeData.likes_count
        }
      }));
    } catch (error) {
      console.error('Error getting like info:', error);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const res = await fetch(`http://localhost:8000/post/like/${postId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        fetchLikeInfo(postId);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="shome-container">
        <h1 className="shome-title">POST'S</h1>
        <div className="shome-posts">
          {posts.map(post => (
            <div className="post-card" key={post.id}>
              <div className="post-header">
                <span className="username">{post.username}</span>
              </div>
              <img src={post.image} alt={post.title} className="post-image" />
              <div className="post-content">
              <div className="like-row">
  <div className="like-text">
    <h2 className="post-title">{post.title}</h2>
    <p className="post-description">{post.description}</p>
    <span className="like-count">{likesInfo[post.id]?.count || 0} likes</span>
  </div>
  <div className="like-icon" onClick={() => toggleLike(post.id)}>
    {likesInfo[post.id]?.isLiked ? (
      <AiFillHeart color="red" size={28} />
    ) : (
      <AiOutlineHeart size={28} />
    )}
  </div>
</div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SHomePage;
