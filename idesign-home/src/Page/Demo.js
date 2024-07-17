import React, { useState } from 'react';
import styled from 'styled-components';

const Demo = () => {
  const [photo, setPhoto] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);


  const formSubmitted = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('image_file', photo);

    fetch('https://clipdrop-api.co/reimagine/v1/reimagine', {
      method: 'POST',
      headers: {
        'x-api-key': "805d043a4f12d4f9776742cd932fff29a4acae2986eb7803c1a797b15228c2545fba063c84123dd616c2927c9786cfb0",
      },
      body: form,
    })
      .then(response => response.arrayBuffer())
      .then(buffer => {
        console.log(buffer)
        // Convert the buffer to base64
        const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
        setImg1(base64String);
        setError(null); // Reset error state
      })
      .catch(error => {
        setError('Error processing image');
        console.error('Error processing image with first API:', error);
      });

      // Make another API call with the second API key
      fetch('https://clipdrop-api.co/reimagine/v1/reimagine', { // Replace with your second API endpoint
      method: 'POST',
      headers: {
        'x-api-key': "805d043a4f12d4f9776742cd932fff29a4acae2986eb7803c1a797b15228c2545fba063c84123dd616c2927c9786cfb0", // Replace with your second API key
      },
      body: form,
    })
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // Convert the second response buffer to base64
        const base64String2 = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
        setImg3(base64String2);
      })
      .catch(error => {
        console.error('Error processing image with second API:', error);
      });

       // Make another API call with the second API key
       fetch('https://clipdrop-api.co/reimagine/v1/reimagine', { // Replace with your second API endpoint
       method: 'POST',
       headers: {
         'x-api-key': "805d043a4f12d4f9776742cd932fff29a4acae2986eb7803c1a797b15228c2545fba063c84123dd616c2927c9786cfb0", // Replace with your second API key
       },
       body: form,
     })
       .then(response => response.arrayBuffer())
       .then(buffer => {
         // Convert the second response buffer to base64
         const base64String2 = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
         setImg2(base64String2);
       })
       .catch(error => {
         console.error('Error processing image with second API:', error);
       });
  };

  const getPhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    // Display the selected image
    const url = URL.createObjectURL(file);
    setSelectedImage(url)
    // const img = new Image();
    // img.src = url;
    // img.onload = () => {
     
    //   if (img.width > 1024 || img.height > 1024) {
    //     compressImg(file);
    //   }
    
    // };
  };

  // const compressImg = async (file) => {
  //   // Create a FormData object to handle file uploads
  //   const formData = new FormData();
  //   formData.append("image", fileObject);

  //   const res = await fetch("http://localhost:8000/resize", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: formData
  //   })

  //   const data = await res.json()
  //   if (res.status === 200 ) {
    
  //   } else {
   
  //   }
  // }

  return (
    <Wrapper>
      <div>
        {selectedImage && <img src={selectedImage} width='400px' alt='selected' />}
        <form onSubmit={formSubmitted}>
          <label htmlFor='file' className='custom-file-upload'>
            <input type='file' id='file' name='file' onChange={getPhoto} />
            Upload Image
          </label>
          <input type='submit' value='Process' />
        </form>
        {error && <p>{error}</p>}
        {img1 && <img src={`data:image/jpeg;base64,${img1}`} width='400px' alt='demo1' />}
        {img2 && <img src={`data:image/jpeg;base64,${img2}`} width='400px' alt='demo2' />}
        {img2 && <img src={`data:image/jpeg;base64,${img3}`} width='400px' alt='demo2' />}
      </div>
   
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  div {
    text-align: center;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    .custom-file-upload {
      border: 2px solid #ccc;
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
      background-color: #f8f8f8;
      color: #555;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    input[type='submit'] {
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
  }

  img {
    margin-top: 20px;
    border-radius: 8px;
  }
`;

export default Demo;
