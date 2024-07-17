import React from 'react'
import styled from 'styled-components'
import { BsInstagram } from 'react-icons/bs'
import { BiLogoFacebookCircle } from 'react-icons/bi'
import { AiOutlineTwitter } from 'react-icons/ai'
import { BsDiscord } from 'react-icons/bs'
const Footer = () => {
  return (
    <Wrapper>
      <div className='my-footer'>
        <div>
          <h4>iDESIGN</h4>
          <p>Home</p>
          <p>About us</p>
          <p>Contect us</p>
          <p>History</p>
        </div>
        <div>
          <h4>Services</h4>
          <p>Replace furniture</p>
          <p>Helping to create your future home</p>
        </div>
        <div>
          <h4>Our Information</h4>
          <span><BsInstagram /></span>
          <span> <BiLogoFacebookCircle /></span>
          <span> <AiOutlineTwitter /></span>
          <span> <BsDiscord /></span>
          <p className='mt-4'>idesign@gmail.com</p>
          <p>+91 123 456 789</p>
        </div>
        <div>
          <h4>Get in touch</h4>
          <p>Uka tarsadia university, Mahuva-Bardoli Rd</p>
          <p>Tarsadi, Bardoli, Tarsadi</p>
          <p>Gujarat 394620</p>
        </div>
      </div>
      <hr />
      <div className='last-footer-section'>
        <p >
          @{new Date().getFullYear()} . All Rights Reserved
        </p>
        <p>TERMS & CONDITIONS | PRIVACY POLICY </p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`

background: url('./Image/Background-image/footer-bg.webp') no-repeat center/cover;
padding: 5rem 8rem 3rem 8rem;

h4 {
  color: white;
  margin-bottom: 2rem;
}

p {
  color: #7a7878;
  font-size: 18px; 
}

span {
  color: #7a7878;
  font-size: 25px;
  margin-right: 10px;
}

.my-footer {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

hr {
  color: white;
  margin-top: 3rem;
}

.last-footer-section {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
}

// media query 
@media screen and (max-width: 1300px) {
  padding: 2rem 2rem 1rem 2rem;
}

@media screen and (max-width: 650px) {
  div {
    width: 100%;
    text-align: center;
  }
}
`;

export default Footer
