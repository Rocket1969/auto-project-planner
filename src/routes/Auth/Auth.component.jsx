import SignInForm from "../../components/sign-in-form/Sign-In-Form.component"
import SignUpForm from "../../components/sign-up-form/Sign-Up-Form.component"

import "./auth.styles.css"

const Auth = () => {
  return (
    <div className='auth-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Auth