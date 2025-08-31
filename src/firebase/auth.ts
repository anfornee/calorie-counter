import { auth } from '../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword
} from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = ({ email, password }: { email: string, password: string }) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
}

export const doSignOut = () => {
  return auth.signOut();
}

export const doPasswordReset = ({ email }: { email: string }) => {
  return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = ({ password }: { password: string }) => {
  if (auth.currentUser) {
    return updatePassword(auth.currentUser, password);
  }
}

export const doSendEmailVerification = () => {
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`
    })
  }
}