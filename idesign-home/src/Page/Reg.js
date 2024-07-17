import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useFormik } from 'formik';
import { validationSchemaRegister } from '../FormValidation/RegisterValidation';
import { useNavigate } from 'react-router-dom';

const Register = ()=> {
    const initialValues = {
        firstName: '',
        lastName: '',
        emailID: '',
        password: '',
    };

    const navigate = useNavigate();

    const validateName = (name) => {
        const regex = /^[a-zA-Z]*$/;
        return regex.test(name);
    };

    // const validationEmail = (emailID) => {
    //     const regex =  /^[^.][a-zA-Z0-9.!#$%&'*+/=?^`{|}~-]+@{1}(?:gmail.com|yahoo.com|yahoo.in|utu.ac.in|hotmail.in)$/;
    //     return regex.test(emailID)
    // }

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema: validationSchemaRegister,
        onSubmit: async (values, action) => {
            const { firstName, lastName, emailID, password } = values

            const res = await fetch("http://localhost:8000/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName, lastName, emailID, password
                })
            })

            const data = await res.json()
            if (res.status === 422 || !data) {
                window.alert(data.message)
            } else {
                window.alert(data.message)
                navigate("/login")
            }

            action.resetForm();
        },
    });

    const handleFirstNameChange = (e) => {
        const { value } = e.target;
        if (validateName(value) || value === '') {
            setFieldValue('firstName', value);
        }
    };

    const handleLastNameChange = (e) => {
        const { value } = e.target;
        if (validateName(value) || value === '') {
            setFieldValue('lastName', value);
        }
    };

    return (
        <Wrapper>
            <div className='form-container'>
                <div className='form-left-side'>
                    <h1 className="form-title">Sign-Up!</h1>
                    <p className="form-desc">
                        To the Re-Imagine Home .
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-block">
                            <label htmlFor="fname" className="input-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                autoComplete="off"
                                name="firstName"
                                id="fname"
                                placeholder="first name"
                                value={values.firstName}
                                onChange={handleFirstNameChange}
                                onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName ? (
                                <p className="form-error">{errors.firstName}</p>
                            ) : null}
                        </div>
                        <div className="input-block">
                            <label htmlFor="fname" className="input-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                autoComplete="off"
                                name="lastName"
                                id="lname"
                                placeholder="Last name"
                                value={values.lastName}
                                onChange={handleLastNameChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastName && touched.lastName ? (
                                <p className="form-error">{errors.lastName}</p>
                            ) : null}

                        </div>
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
                                Sign up
                            </button>
                        </div>
                    </form>
                    <div className="sign-up">
                        <p>Already have an account?</p> <Link className='reg-link' to="/login">Sign In now</Link>
                    </div>
                </div>
                <div className='form-right-side'>
                    <img src='./Image/Background-image/home_bg3.jpg' alt="" />
                </div>
            </div>
        </Wrapper>
    );
};

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



export default Register;
