import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
const HeroSection = () => {

    //first way
    // const [imgIndex, setimgIndex] = useState(1)

    // useEffect(() => {

    //     const updateValue = setInterval(() => {
    //         setimgIndex((prevIndex) => (prevIndex === 1 ? 2 : 1))
    //     }, 3000)

    //     return () => setInterval(updateValue)

    // }, [])

    //second way
    const [currentIndex, setCurrentIndex] = useState(1); // Start with the first image
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 1 ? 2 : 1));
        }, 3000); // Change image every 2 seconds (adjust as needed)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [])

    return (
        <Wrapper>
            <div className='hero-section'>
                <div className='hero-left-section'>
                    <div className='hero-heading'>
                        <h1>REimagine your space</h1>
                    </div>
                    <div className='hero-text'>
                        <p>Redesign any space to match your vision, or let our AI show you inspiring designs in seconds.</p>
                    </div>
                    <div className='hero-btn'>
                        <Button className='hbtn' style={{'backgroundColor': '#0f0f31'}} variant="dark" as={Link} to={'/upload-image'}>Start designing</Button>
                    </div>
                    <div className='hero-hr'>
                        <hr />
                    </div>
                    <div className='hero-text-new'>
                        <p>Try with a sample image</p>
                    </div>
                    <div className='hero-left-img'>
                        <img src='./Image/Background-image/background1.jpg' alt='demo-bg' width='120px' height='80px' />
                        <img src='./Image/Background-image/background4.webp' alt='demo-bg' width='120px' height='80px' />
                    </div>
                </div>
                <div className='hero-right-section'>
                    {
                        currentIndex === 1 ?
                            <>
                                <div className='btn'>Original image</div>
                                <img src='./Image/Background-image/background3.jpg' alt='bg' />
                            </> :
                            <>
                                <div className='btn'>Output image</div>
                                <img src='./Image/Background-image/background2.jpg' alt='bg' />
                            </>
                    }
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    background: #f1f1f1;
    padding: 1rem 5rem 4rem 5rem;

    .hero-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .hero-left-section {
        width: 49%;
        h1 {
            font-weight: 700;
            font-size: 2.9rem;
            color: #0f0f31;
            margin-bottom: 2.5rem;
        }
        .hero-text {
            color: #707070;
            font-size: 20px;
            margin-bottom: 2rem;
        }
        .hero-text-new {
            margin-top: 1rem;
            color: #867a7a;
            font-size: 19px;
            font-weight: 500;
        
        }
        .hero-btn {
            .hbtn {
                padding: 10px 25px;
                font-size: 19px;
                background: #0f0f31;
                margin-bottom: 1rem;
            }
            
        }
        .hero-hr {
            hr {
                width: 12rem;
            } 
        }
        .hero-left-img {
            img {
                border-radius: 7px;
                margin-right: 1rem;
            }
        }
    }
    .hero-right-section {
        width: 49%;

        img {
            width: 100%;
            height: 500px;
            border-radius: 7px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
        }

        .btn {
            position: relative;
            font-size: 19px;
            background: rgba(23 ,22 ,22, 0.5);
            top: 11rem;
            left: 20px; 
            color: white;
            padding: 11px;
            border-radius: 10px;
        }
    }

    // media query 
    @media screen and (max-width: 1000px) {
        padding: 0rem 2rem 2rem 2rem;
        .hero-section {
            flex-direction: column-reverse;
        }

        .hero-left-section, .hero-right-section {
            width: 100%;
        }

        .hero-left-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            h1 {
                margin-top: 1.5rem; 
                font-size: 2.3rem;
                margin-bottom: 1.5rem;
                text-align: center;
            }
            .hero-text {
                margin-bottom: 1rem;
                text-align: center;
            }
            hr {
                margin: 0.7rem 0 0 0;
                padding: 0;
            }
            .hero-left-img {
                img {
                    margin: 0 0.5rem 0 0.5rem; 
                }
            }
            
        }

        .hero-right-section img {
            width: 100%;
            height: 100%; 
        }
    }

    @media screen and (max-width: 340px) {

        .hero-right-section {
            .btn {
                top: 4rem;
                left: 10px; 
                font-size: 10px;
                padding: 5px;
            }
        }
        .hero-left-section {
            h1 {
                font-size: 2rem;
            }
        }
        .hero-left-img {
            display: flex; 
            flex-direction: column;
        }

    }
`;

export default HeroSection
