import React from 'react'
import './SignUp.scss'
import RTMSignUpForm from '../../components/RTMSignUpForm/RTMSignUpForm'
const SignUp = () => {
  return (
    <section className="login-page">
    <div className="form-container">
      <RTMSignUpForm></RTMSignUpForm>
    </div>
    <div className="image-container">

    </div>
  </section>
  )
}

export default SignUp