import React, { useState } from 'react';
import '../css/main1.css';

const AP = () => {
  
  const [postData, setPostData] = useState({
    title: '',
    image: null,
    description: '',
  });


  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeimg = (e) => {
    setPostData({
      ...postData,
      image: e.target.files[0]
    });
  };
 
  const handleSubmit = () => {
    const formData = new FormData();
    const username = 'Admin'
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    formData.append('image', postData.image);
    formData.append('username', username);

    fetch('http://localhost:8000/post/create/', {
      method: 'POST',
      headers: {
        'Authorization': `Token a3a3aff90439be49b9a54103a39eb6f2de631a9d`
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Clear form fields after successful submission
      setPostData({
        title: '',
        image: null,
        description: ''
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <>
      <div className="container-min">
        <h1> Admin Page</h1>
      </div>
      <div className="container">
        <div className="left-div">
          <div className='title'>Post</div>
          <input
            className='post-title'
            type='text'
            name='title'
            value={postData.title}
            onChange={handleChange}
            placeholder='Post Title'
          />
          <input
            className='post-img'
            type='file'
            name='image'
            onChange={handleChangeimg}
          />
          {postData.image && (
            <img src={URL.createObjectURL(postData.image)} alt="Selected" style={{ width: '100px', height: '100px' }} />
          )}
          <input
           type='text'
            className='post-desc'
            name='description'
            value={postData.description}
            onChange={handleChange}
            placeholder='Description'
          />
          <button className='post-button' onClick={handleSubmit}>SUBMIT</button>
         
        </div>

      </div>
    </>
  );
};

export default AP;