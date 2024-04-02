import React, { useState } from 'react';
import '../css/main.css';

const Co = () => {
  
  const [postData, setPostData] = useState({
    title: '',
    image: null,
    description: '',
  });

  const [text, setTextData] = useState({
    text: '',
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

  const handleChangeAnn = (e) => {
    setTextData({
      text: e.target.value
    });
  };

  const handleSubmitAnn = () => {
    const formData1 = new FormData();
    formData1.append('text', text.text);

    console.log(formData1)
    fetch('http://localhost:8000/announce/ee/', {
      method: 'POST',
      headers: {
        'Authorization': `Token 4773bfdd9baf4aec539488aefa7ab7c0aa98f55d`
      },
      body: formData1
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setTextData({
        text:''
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  }

  const handleSubmit = () => {
    const formData = new FormData();
    const username = 'Co_Dept'
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    formData.append('image', postData.image);
    formData.append('username', username);

    fetch('http://localhost:8000/post/create/', {
      method: 'POST',
      headers: {
        'Authorization': `Token 4773bfdd9baf4aec539488aefa7ab7c0aa98f55d`
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
        <h1>EE Admin Page</h1>
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
            className='post-desc'
            name='description'
            value={postData.description}
            onChange={handleChange}
            placeholder='Description'
          />
          <button className='post-button' onClick={handleSubmit}>SUBMIT</button>
        </div>


        <div className="right-div">
        <div className='title'>Announcements</div>
          <input
            className='post-title'
            type='text'
            name='text'
            value={text.text}
            onChange={handleChangeAnn}
            placeholder='Announcement'
          />
          <button className='post-button' onClick={handleSubmitAnn}>SUBMIT</button>
        </div>
      </div>
    </>
  );
};

export default Co;