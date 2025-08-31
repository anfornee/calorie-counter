import { useState } from 'react'
import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login () {
  const authContext = useAuth();
  let isUserLoggedIn;
  if (authContext) isUserLoggedIn = authContext.isUserLoggedIn;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword({ email, password })
      } catch (error) {
        let errorMessageText = "Error signing in";
        if (error instanceof Error) {
          errorMessageText += `: ${error.message}`;
        } else errorMessageText += '.'

        setErrorMessage(errorMessageText)
      }

      setIsSigningIn(false);
    }
  }

  return (
    <div className="login-form-container">
      {isUserLoggedIn && <Navigate to={'/home'} replace={true} />}
      {errorMessage && <p role='alert' className='login-form-error-message'>{errorMessage}</p>}
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor='login-form-email-input' className='login-input-label'>Email</label>
        <input type='email' id='login-form-email-input' className='login-form-input' placeholder='mrButtz@urmom.com' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <label htmlFor='login-form-password-input' className='login-form-input-label'>Password</label>
        <input type='password' id='login-form-password-input' className='login-form-input' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        <input type='submit' value='Login' disabled={isSigningIn} />
      </form>
    </div>
  )
}