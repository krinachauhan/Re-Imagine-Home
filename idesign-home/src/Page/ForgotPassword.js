import React, { useState } from 'react'
import styled from 'styled-components'
import OTPInput from 'otp-input-react'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {

    const navigate = useNavigate()

    const [stepper, setstepper] = useState(false)
    const [otpsection, setotpsection] = useState(false)
    const [verifyEmail, setverifyEmail] = useState('')
    const [OTP, setOTP] = useState(0)
    const [newpassword, setnewpassword] = useState('')

    const sendOtp = async () => {

        // Email Validation
        const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/i
    
        if (verifyEmail === "") {
          window.alert("Enter your email")
        } else if (!checkEmail.test(verifyEmail)) {
          window.alert("Enter proper email")
        } else {
    
          const res = await fetch("http://localhost:8000/sendOTP", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              verifyEmail
            })
          })
    
          const data = await res.json()
          localStorage.setItem("otp", data.Myotp)
          setTimeout(() => {
            localStorage.removeItem('otp')
          }, 120000)
          setotpsection(true)
        }
    
      }
    
      const submitOtp = () => {
        if (OTP === localStorage.getItem("otp")) {
          window.alert("Email id verify successfully")
          localStorage.removeItem('otp')
          setstepper(true)
        } else {
          window.alert("Invalid otp please send again")
          setotpsection(false)
        }
      }

      const UpdatePassword = async () => {
        const res = await fetch("http://localhost:8000/changepassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: localStorage.getItem("id"), newpassword
            })
        })

        const data = await res.json()
        if (res.status === 422 || !data) {
            window.alert(data.message)
        } else {
            window.alert(data.message)
            navigate("/")
        }
    }

    

  return (
    <Wrapper>
      {
            (stepper === false) ? 
            <div className='form-container'>
            {
              (otpsection === false) ?
                <div className='form-group'>
                  <label className='heading-padding'><b className='form-title'>Your Email</b></label>
                  <div className='input-block'>
                    <label htmlFor='email' className='input-label'>email</label>
                    <input type="email" id="email" autoComplete='off'
                      value={verifyEmail} onChange={(e) => setverifyEmail(e.target.value)}
                      placeholder='Enter Your Email' />
                  </div>
                  <button onClick={sendOtp} className='input-button'>Send OTP</button>
                </div>
                :
                <div className='form-group'>
                  <label className='heading-padding flex'><b className='form-title'>Enter the OTP</b></label>
                  <div className='single-form-lists'>
                    <OTPInput className='my-otp' value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                  </div>
                  <div className='flex'>
                    <button className='input-button' onClick={submitOtp}>otp submit</button>
                  </div>
                </div>
            }
          </div>
           :
           <div className='form-container'>
                <div className='form-group'>
                    <label className='heading-padding'>
                        <b className='form-title'>Enter New Password</b>
                    </label>
                    <div className='input-block'>
                        <label htmlFor='password' className='input-label'>password</label>
                        <input type="text"
                            id="password"
                            name='password'
                            value={newpassword}
                            onChange={(e) => setnewpassword(e.target.value)}
                            autoComplete='off'
                            placeholder='Enter Password' />
                    </div>
                    <button className='input-button' onClick={UpdatePassword}>Send OTP</button>
                </div>
              </div>
        }
    </Wrapper>
  )
}
const Wrapper = styled.section`
width: 100%;
/* height: 60px; */
background: #f1f1f1;
padding: 4rem 0;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
transition: 0.4s;

.form-container {
  max-width: 40vw;
  width: 100%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background: #fff;
}

.form-group {
  padding: 60px 30px 20px;
  background: #fff;
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

  .forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.forgot-text {
    color: #0f0f31;
    font-weight: 500;
    cursor: pointer;
    font-size: 1.3rem;
}

`;
export default ForgotPassword
