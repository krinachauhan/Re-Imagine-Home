import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'

const Download = () => {
    return (
        <Wrapper>
            <div className='download-main-section'>
                <div className='download-nav'>
                    <div className='nav-left'>
                        <Link className='links' to={'/upload-image'}>
                            <AiOutlineLeft className='back-arrow' /><p>back</p>
                        </Link>
                    </div>
                    <div className='nav-right'>
                        <div className='borders'>Save as favorite</div>
                        <div className='borders'>Share</div>
                        <div>Report</div>
                    </div>
                </div>
                <div className='download-image'>
                    <div className='upload-images-section'>
                        <img className='upload-image2' src='./Image/Background-image/background1.jpg' alt='upload' />
                        <div className='upload-section-buttons'>
                            <div className='upload-section-left-btn'>
                                <div className='upload-section-btn-text'>
                                    Generate more variations of this image
                                </div>
                                <div className='upload-btn1'>redesign this image</div>
                            </div>

                            <div className='upload-section-midd'></div>
                            <div className='upload-section-right-btn'>
                                <div className='upload-section-btn-text'>
                                    Download watermark free
                                </div>
                                <div className='upload-btn2'>Download</div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

background: #f1f1f1;

.back-arrow {
    font-size: 1.2rem;
    color: black;
}

.nav-left {
    p {
        display: inline-block;
        font-weight: 500;
        font-size: 1.2rem;
        margin-bottom: 0;
        color: black;
    }
}

.download-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 8rem;
}

.nav-right {
    display: flex;
    div {
        color: #0f0f31;
        cursor: pointer;
        padding: 0 20px;
        font-size: 17px;
        font-weight: 500;
    }

    .borders {
        border-right: 2px solid #e1e1e1;
    }
}

.download-image {
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

.upload-image2 {
    margin: auto;
    width: 550px;
    display: block;
    height: 425px;
    border-radius: 8px;
}

@media screen and (max-width: 800px) and (min-width: 451px) {
    .download-nav {
        padding: 12px;
    }
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

@media screen and (max-width: 450px) {
    .download-nav {
        padding: 12px;
        flex-direction: column;
        align-items: flex-start;
    }
    .nav-left {
        p {
            font-size: 15px;
        }
    }
    .nav-right {
        div {
            font-size: 15px;
        }
    }
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

`;
export default Download
