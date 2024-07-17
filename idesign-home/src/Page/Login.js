import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useFormik } from "formik"
import { validationSchemaLogin } from '../FormValidation/LoginValidation'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const initialValues = {
    emailID: "",
    password: "",
  }

  const navigate = useNavigate()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validationSchemaLogin,
      onSubmit: async (values, action)  => {
        const { emailID, password } = values

        const res = await fetch("http://localhost:8000/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            emailID, password
          })
        })

        const data = await res.json()
        if (res.status === 422 || !data) {
          window.alert(data.message)
        } else {
          window.alert(data.message)
          localStorage.setItem("firstName",data.firstName)
          localStorage.setItem("lastName",data.lastName)
          localStorage.setItem("id",data.userId)
          navigate("/")
        }
        action.resetForm();
      },
    });

  return (

    <Wrapper>
      <div className='form-container'>
        <div className='form-left-side'>
          <h1 className="form-title">Sign-In</h1>
          <p className="form-desc">
            To the Re-Imagine Home .
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                name="emailID"
                id="email"
                placeholder="Email"
                value={values.emailID}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.emailID && touched.emailID ? (
                <p className="form-error">{errors.emailID}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div className="modal-buttons">
              <button className="input-button" type="submit">
                Sign in
              </button>
            </div>
          </form>
          <div className="sign-up">
            <p>Want to create account?</p> <Link className='reg-link' to="/register">Sign Up now</Link>
          </div>
        </div>
        <div className='form-right-side'>
          <img src='./Image/Background-img2/img2.png' alt="" />
        </div>
      </div>
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
  display: flex;
  max-width: 60vw;
  width: 100%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  transition-duration: 0.3s;
  background: #fff;
}

.form-left-side {
  padding: 60px 30px 20px;
  background: #fff;
  flex: 1.7;
  transition-duration: 0.5s;
  opacity: 1;
}

.form-right-side {
  flex: 2;
  font-size: 0;
  transition: 0.3s;
  overflow: hidden;
}
.form-right-side img {
  width: 100%;
  height: 100%;
  transform: scale(1);
  -o-object-fit: cover;
  object-fit: cover;
  transition-duration: 1.2s;
}


.form-title {
  font-weight: 700;
  font-size: 2.9rem;
  color: #0f0f31;
}

.form-desc {
  color: #707070;
  font-weight: 500;
  font-size: 17px;
  margin-bottom: 1.8rem;
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

.modal-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-bottom: 1.8rem;
}
.input-button:hover {
  background: #0f0f31;
}
.sign-up {
  p {
    display: inline-block;
    color: #707070;
    font-weight: 500;
  }
  .reg-link {
    color: #0f0f31;
    font-weight: 500;
  }
}

@media (max-width: 750px) {
  .form-container {
    max-width: 90vw;
  }

  .form-right-side {
    display: none;
  }
}
.form-error {
  font-size: 1.4rem;
  color: #1c1d3d;
  margin-bottom: 0;
  font-weight: 500;
}
`;
export default Login
