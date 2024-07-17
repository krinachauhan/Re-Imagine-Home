import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Upload = () => {

    // review form
    const [reviewText, setReviewText] = useState();
    const [selected, setSelected] = useState(0);

    const startGenerated = (numOfStars = 10) => {
        return Array(numOfStars).fill().map((item, i) => (
            <Star 
                key={i} 
                selected={selected > i}
                onSelected={() => setSelected(i + 1)}
            />
        ));
    }

    const Star = ({ selected, onSelected }) => {
        return <FaStar color={selected ? "yellow" : "gray"} className="starSize" onClick={onSelected} />;
    }

    const GiveReview = async () => { 
        const res = await fetch("http://localhost:8000/sendfeedback", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: localStorage.getItem("id"), img: base64Image, rating: selected, feedback: reviewText
            })
        })
        setShowForm(false)
        const data = await res.json()
        window.alert(data.message)
       
    }

    // user review form 
    const [showForm, setShowForm] = useState(false);

    // fileObject is of type File
    const [fileObject, setFileObject] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(null);

    // display image
    const [displayImg, setDisplayImg] = useState(null);
    const [displayImg2, setDisplayImg2] = useState(null);
    const [displayImg3, setDisplayImg3] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    // for images
    const convertToBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setBase64Image(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error", error);
        };
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        // Check if a file is selected
        if (file) {
            // Check file type and size
            if (
                file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png"
            ) {
                if (file.size <= 4 * 1024 * 1024) {
                    setErrorMessage("");
                    convertToBase64(file);
                    setFileObject(file);
            
                } else {
                    setErrorMessage("Image size should be less than 4 MB");
                    setFileObject("");
                }
            } else {
                setErrorMessage("Please select a PNG, JPEG, or JPG file");
                setFileObject("");
            }
        } else {
            setErrorMessage("Please select an image file");
            setFileObject("");
        }
    };

    async function handleUpload() {
        setLoading(true); // Set loading state to true
        const form = new FormData();
        form.append('image_file', fileObject);

        try {
            const responses = await Promise.all([
                fetchAndProcessImage(form),
                fetchAndProcessImage(form),
                fetchAndProcessImage(form)
            ]);

            const [base64String1, base64String2, base64String3] = responses;

            if (base64String1 && base64String2 && base64String3) {
                setDisplayImg(base64String1);
                setDisplayImg2(base64String2);
                setDisplayImg3(base64String3);
                setShowForm(true)
                const img = {
                    id: localStorage.getItem("id"),
                    input: base64Image,
                    output_img1: base64String1,
                    output_img2: base64String2,
                    output_img3: base64String3
                };
                console.log(img);
                await historyImg(img);
            }
        } catch (error) {
            setError('Error processing image');
            console.error('Error processing image:', error);
        } finally {
            setLoading(false); // Set loading state to false
        }
    }

    async function fetchAndProcessImage(form) {
        const response = await fetch('https://clipdrop-api.co/reimagine/v1/reimagine', {
            method: 'POST',
            headers: {
                'x-api-key': "6a7499b5781d73cc0377497a45ac82d968b12a16e617d4ca49cc82adfc971975e057c8f499d3e7d71b0a5606a74de17b",
            },
            body: form,
        });
        const buffer = await response.arrayBuffer();
        const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
        return base64String;
    }

    async function historyImg(img) {
        await fetch('http://localhost:8000/addHistory', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(img)
        });
    }


    return (
        <Wrapper>
            <div className="upload-section">
                <div className="upload-header d-flex">
                    <div className="upload-header-logo">
                        <Link className="links" to={"/"}>
                            <AiOutlineLeft style={{ fontSize: "2.3rem" }} />
                        </Link>
                    </div>
                    <h2>ReImagine your space in seconds</h2>
                </div>
                <div className="upload-container">
                    <div className="upload-images-section">
                        {base64Image === "" ? (
                            <>
                                <img
                                    className="upload-image"
                                    src="./Image/upload.png"
                                    alt="upload"
                                />
                                <div className="upload-text-section">
                                    <h5>Upload a photo of your space</h5>
                                    <p>
                                        PNG, JPEG & JPG files are allowed. No
                                        larger than 4MB
                                    </p>
                                </div>
                                <div className="image-main">
                                    <label htmlFor="myfiles" className="my-lbl">
                                        Choose an Image
                                    </label>
                                </div>
                                <input
                                    type="file"
                                    id="myfiles"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={handleFileChange}
                                />
                                {errorMessage && (
                                    <p className="form-error">{errorMessage}</p>
                                )}
                            </>
                        ) : (
                            <>
                                <img
                                    className="upload-image2"
                                    src={base64Image}
                                    alt="uploaded imagine"
                                />
                                <div className="upload-section-buttons">
                                    <div className="upload-section-right-btn">
                                        <div className="upload-section-btn-text">
                                            Generate designs with just-a-click
                                        </div>
                                        <button
                                            type="button"
                                            className="upload-btn2"
                                            onClick={handleUpload}
                                            disabled={loading} // Disable button when loading
                                        >
                                            {loading ? (
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            ) : (
                                                "Generate"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="display-container">
                    {error && <p>{error}</p>}
                    {displayImg && <img src={`data:image/jpeg;base64,${displayImg}`} width='420px' alt='demo1' />}
                    {displayImg2 && <img src={`data:image/jpeg;base64,${displayImg2}`} width='420px' alt='demo1' />}
                    {displayImg3 && <img src={`data:image/jpeg;base64,${displayImg3}`} width='420px' alt='demo1' />}
                </div>

                {
                    (showForm === true) &&
                        <div className='form-container'>
                            <div className='form-group'>
                                <label className='heading-padding'>
                                    <b className='form-title'>Review</b>
                                </label>
                                <div className="input-block">
                                    <label className='input-label'>Rating</label>
                                    <div>
                                    {startGenerated()}
                                    </div>    
                                </div>
                                
                                <div className='input-block'>
                                    <label htmlFor='password' className='input-label'>Review</label>
                                    <input type="text"
                                        id="review"
                                        name='review'
                                        autoComplete='off'
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder='Give us your suggestion' />
                                </div>
                                <button className='input-button' onClick={GiveReview}>Confirm</button>
                            </div>
                        </div>
                }
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

// form 
.form-container {

    margin: 2rem auto;
    max-width: 40vw;
    width: 100%;
    border-radius: 10px;

  }
  
  .form-group {
    padding: 60px 30px 20px;
    background: #fff;
    background: #f8f9fa;
  }
  
  .heading-padding {
    margin-bottom: 1.8rem;
  }
  
  .single-form-lists {
    display: flex;
    justify-content: center;
    margin-bottom: 2.4rem;
  }
  
  .flex {
    display: flex;
    justify-content: center;
  }
  
  .form-title {
      font-weight: 700;
      font-size: 2.5rem;
      color: #1c1d3d;
  }
  
  .input-block {
      display: flex;
      flex-direction: column;
      padding: 10px 10px 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 20px;
      transition: 0.3s;
  }
  
    .input-label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.7px;
      color: #8c7569;
      transition: 0.3s;
    }
    
    .input-block input {
      outline: 0;
      border: 0;
      background: #f8f9fa;
      padding: 4px 0 0;
      font-size: 16px;
    }
    
    .input-block input::-moz-placeholder {
      color: #ccc;
      opacity: 1;
    }
    .input-block input:-ms-input-placeholder {
      color: #ccc;
      opacity: 1;
    }
    .input-block input::placeholder {
      color: #ccc;
      opacity: 1;
    }
    .input-block:focus-within {
      border-color: #8c7569;
    }
    .input-block:focus-within .input-label {
      color: rgba(140, 117, 105, 0.8);
    }
  
    .input-button {
      border: 0.5px solid gray;
      padding: 10px 30px;
      font-weight: 600;
      font-size: 19px;
      color: #efe4e4;
      border-radius: 7px;
      background: #1c1d3d;
      transition: 0.3s;
      cursor: pointer;
    }
    .input-button:hover {
      background: #0f0f31;
    }
  

background: #f1f1f1;

h2, h5 {
    color: #0f0f31;
}

.upload-section{
    padding: 3rem 5rem;
}

.upload-header {

    h2 {
        margin-bottom: 2rem;
    }
    
}

.links {
    color: #0f0f31;
}

.upload-container {
    background: #f8f9fa;
    border-radius: 8px;

    .upload-images-section {
        padding: 5rem 2rem;
    }

    .upload-text-section {
        h5 {
            text-align: center;
            font-weight: 700;
            margin: 1rem 0;
        }
        p {
            text-align: center;
            margin: 1rem 0;
            font-weight: 500;
        }
    }

}

.upload-section-midd {
    border: 0.5px solid #707070;
    margin-left: 48px;
    margin-right: 48px;
}

.upload-section-buttons {
    display: flex;
    justify-content: center;  
    margin-top: 1rem;
}

.upload-section-btn-text {
    font-size: 16px;
    color: #707070;
    font-weight: 500;
    margin-bottom: 1rem;
}

.upload-section-left-btn, .upload-section-right-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.upload-btn1 {
    border: 0.5px solid gray;
    padding: 9px;
    border-radius: 7px;
    font-size: 19px;
    width: 200px;
    text-align: center;
    font-weight: 600;
    color: #0f0f31;
    cursor: pointer;
}

.upload-btn2 {
    border: 0.5px solid gray;
    padding: 9px;
    border-radius: 7px;
    font-size: 19px;
    width: 165px;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
    color: #efe4e4;
    background: #0f0f31;
}

// input file design
input[type="file"] {
    display: none;
}

.upload-image {
    margin: auto;
    width: 100px;
    display: block;
    height: 100px;
}

.upload-image2 {
    margin: auto;
    width: 550px;
    display: block;
    height: 425px;
    border-radius: 8px;
}
  
.my-lbl {
    font-size: 1.3rem;
    display: inline-block;
    width: 20rem;
    color: #d1d0cf;
    cursor: pointer;
    background: black;
    padding: 1rem 0;
    text-align: center;
}
  
.image-main {
    display: flex;
    justify-content: center;
}

.form-error {
    font-size: 1.8rem;
    color: #1c1d3d;
    text-align: center;
    font-weight: 700;
    margin: 2rem;
}

.form-errors {
    font-size: 1.6rem;
  color: #1c1d3d;
  margin-bottom: 0;
  font-weight: 700;
}

.img-advance-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background: white;
    width: 430px;
    margin: auto;
    border-radius: 8px;
}

.single-section {
    display: flex;
    flex-direction: column;
}

.new-lbl {
    color: #0f0f31;
    margin-top: 24px;
    margin-bottom: 12px;
    font-weight: 500;
}

.single-section-box {
    height: 40px;
    width: 384px;
    color: #4b4b6f;
    font-weight: 600;
    text-transform: capitalize;
    border: 0.5px solid #949597;
    border-radius: 8px;
}

.my-last-btn {
    height: 45px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    color: white;
    margin: 24px;
    width: 400px;
    text-align: center;
    background: #0f0f31;
    text-decoration: none;
    align-items: center;
    display: flex;
    justify-content: center;
}

//media

@media screen and (max-width: 800px) and (min-width: 451px) {
    .upload-image2 {
        width: 62vw;
        height: 67%;
    }
    .upload-section {
        padding: 1.5rem 3.5rem;
    }
    .upload-section-buttons {
        flex-direction: column;
    }
    .upload-btn1 {
        margin-bottom: 1.5rem;
    }
    .upload-section-midd {
        margin-bottom: 1rem;
    }
}

@media screen and (max-width: 600px) and (min-width: 0px) {
    .upload-section {
        padding: 7px 15px;
    }
    .img-advance-section {
        margin: 12px auto;
        width: 80vw;
    }
    .single-section-box {
        width: 70vw;
    }
    .my-last-btn {
        width: 71vw;
    }
}

@media screen and (max-width: 450px) {
    .upload-header h2 {
        font-size: 20px;
        margin-bottom: 1.7rem;
    }
    .upload-section{
        padding: 1rem 1rem;  
    }
    .upload-image {
        width: 75px;
        height: 75px;
    }
    .upload-image2 {
        width: 70vw;
        height: 55%; 
    }
    .upload-container {
    
        .upload-images-section {
            padding: 6rem 2rem;
        }
        .upload-text-section {
            p {
                margin: 1.5rem  0;
            }
        }
    }
    .my-lbl {
        padding: 0.8rem 0;
        font-size: 1rem;
    }
    .upload-section-buttons {
        flex-direction: column;
    }
    .upload-btn1 {
        margin-bottom: 1.5rem;
    }
    .upload-section-btn-text{
        text-align: center;
    }
    .upload-section-midd {
        margin-bottom: 1rem;
    }
}

.display-container {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
}

.starSize {
    width:2rem; 
    height:2rem;
    margin-right: 21px; 
    cursor: pointer;
}


`;

export default Upload
