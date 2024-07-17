import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'

const HomeExample = () => {

    //second way
    const [currentIndex, setCurrentIndex] = useState(1); 
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 1 ? 2 : 1));
        }, 4000); 

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [])

    return (
        <Wrapper>
            <div className='example-section'>

                <div className='example-section-heading'>
                    <h1>Unlock creative possibilities with REimagine</h1>
                </div>
                <div className='example-section-text'>
                    <p className='remove-margin'>
                        Our AI redesigns any space through evaluating architectural elements, detecting room    type, understanding preferred design styles and
                    </p>
                    <p>
                        adhering to your color preferences & text instructions.
                    </p>
                </div>
                <div className='example-card'>
                    <div className='single-card'>
                        {
                            currentIndex === 1 ?
                                <>
                                    <div className='single-card-btn'>Input Image</div>
                                    <Card>
                                        <Card.Img variant="top" height='250px' src="./Image/Background-image/kidz-room.jpg" />
                                        <Card.Body>
                                            <Card.Title>Kidz Room Input</Card.Title>
                                            <Card.Text>
                                                <span className='border btn'>Kidz Room</span>
                                                <span className='border btn'>play area</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                                :
                                <>
                                    <div className='single-card-btn'>Output Image</div>
                                    <Card>
                                        <Card.Img variant="top" height='250px' src="./Image/Background-image/kidz-room2.jpg" />
                                        <Card.Body>
                                            <Card.Title>Kidz Room Inputs</Card.Title>
                                            <Card.Text>
                                                <span className='border btn'>Kidz Room</span>
                                                <span className='border btn'>play area</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                        }
                    </div>
                    <div className='single-card'>
                        {
                            currentIndex === 1 ?
                                <>
                                    <div className='single-card-btn'>Input Image</div>
                                    <Card>
                                        <Card.Img variant="top" height='250px' src="./Image/Background-image/kitchen-room2.jpg" />
                                        <Card.Body>
                                            <Card.Title>Kitchen Area inputs</Card.Title>
                                            <Card.Text>
                                                <span className='border btn'>Kitchen</span>
                                                <span className='border btn'>Modern</span>
                                                <span className='border btn'>Coastal</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </> :
                                <>
                                    <div className='single-card-btn'>Output Image</div>
                                    <Card>
                                        <Card.Img variant="top" height='250px' src="./Image/Background-image/kitchen-room.jpg" />
                                        <Card.Body>
                                            <Card.Title>Kitchen Area inputs</Card.Title>
                                            <Card.Text>
                                                <span className='border btn'>Kitchen</span>
                                                <span className='border btn'>Modern</span>
                                                <span className='border btn'>Coastal</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                        }

                    </div>
                    <div className='single-card'>
                        {
                            currentIndex === 1 ?
                                <>
                                    <div className='single-card-btn'>Input Image</div>
                                    <Card>
                                        <Card.Img variant="top" height='250px' src="./Image/Background-image/pooja-room.jpg" />
                                        <Card.Body>
                                            <Card.Title>Pooja Room Input</Card.Title>
                                            <Card.Text>
                                                <span className='border btn'>Pooja Room</span>
                                                <span className='border btn'>Simple</span>
                                                <span className='border btn'>Vastu</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                                :
                                <>
                                    <div className='single-card-btn'>Output Image</div>
                                    <Card>
                                        <Card.Img variant="top" height='250px' src="./Image/Background-image/pooja-room1.jpg" />
                                        <Card.Body>
                                            <Card.Title>Pooja Room Input</Card.Title>
                                            <Card.Text>
                                                <span className='border btn'>Pooja Room</span>
                                                <span className='border btn'>Simple</span>
                                                <span className='border btn'>Vastu Style</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                        }
                    </div>

                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

background: #f8f9fa;

.example-section {
    padding: 5rem;

    .example-section-heading {
        text-align: center;

        h1 {
            margin-bottom: 1.7rem;
            font-weight: 700;
            color: #0f0f31;
        }

    }

    .example-section-text {
        font-size: 22px;
        color: #707070;

        p {
            text-align: center;
        }
        
        .remove-margin {
            margin-bottom: 0;
        }

    }

    .example-card {
        padding: 2rem 1rem;
        display: flex;
        justify-content: space-around;

        .btn {
            display: inline-block;
            color: #585759;
            padding: 5px;        
        }

        .single-card {

            .single-card-btn {
                position: relative;
                z-index: 1;
                left: 17px;
                top: 97px;
                width: 7rem;
                font-size: 15px;
                background: rgba(23 ,22 ,22, 0.5);
                color: white;
                padding: 9px;
                border-radius: 7px;
            }

            .card {
                width: 23rem;
            }
        }
    }
}

// media 
@media screen and (max-width: 1400px){
    padding: 3rem;

    .example-section {
        padding: 0;
    }
    .example-card {
        flex-wrap: wrap;
    }
    .example-section-heading {
        h1 {
            font-size: 36px;
        }
    }
    .example-section-text {
        .remove-margin {
            font-size: 20px;    
        }
    }
}


`;

export default HomeExample
