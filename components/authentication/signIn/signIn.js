import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './signIn.module.css'
import Authenticate from '../../../assets/authentication.svg'

import { signInWithGooglePopup, signInAuthUserWithEmailandPassword } from "../../../lib/firebase";




const defaultFormFields = {
    email: '',
    password: '',
}


const SignIn = () => {

    const [formfields, setformfields] = useState(defaultFormFields);
    const { email, password} = formfields;
    const router = useRouter()

    const signInWithGoogle = async () => {
        try {
            const { user } = await signInWithGooglePopup();
            if (user) {
                router.push('/')
            }
        } catch (error) {
            console.log(error.code);
        }
    };


    const resetFormFields = () => {
        setformfields(defaultFormFields);
    };


    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setformfields({...formfields, [name]: value});
    };


    const signInHandler = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailandPassword(email, password);
            resetFormFields();
            if (user) {
                router.push('/')
            }

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('you have entered the wrong password');
                    break;
                case 'auth/user-not-found':
                    alert('Please Sign-Up first');
                    break;
                default:
                    console.log(error);
                    break;
            };
        };
    };
    

    return (
        <div>
            <div className={classes.logInContainer}>
                <div className={classes.logInInnerContainer}>
                    <div className={classes.logInImage}>
                    <div className={classes.logInImageInner}>
                        <Authenticate className={classes.authenticateImage} />
                    </div>
                    </div>
                    <div className={classes.logInForm}>
                        <div className={classes.logInFormInner}>
                            <form className={classes.logInFormContainer} onSubmit={signInHandler}>
                                <div className={classes.logInInput}>
                                    <div>
                                        <label id="email">Email : </label>
                                        <input type='email' id="email" name="email" required onChange={onChangeHandler} value={email} />
                                    </div>
                                    <div>
                                        <label id="password">Password : </label>
                                        <input type='password' id="password" name="password" required onChange={onChangeHandler} value={password} />
                                    </div>
                                </div>
                                <div className={classes.logInButton}>
                                    <button type="submit">LogIn</button>
                                </div>
                            </form>
                            <p className={classes.or}>------------------------------ OR ------------------------------</p>
                            <div className={classes.logInOtherMethods}>
                                <div className={classes.logInOtherMethodsButton} onClick={signInWithGoogle}>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                                    c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                                    c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                                    C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                                    c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                                    c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className={classes.Register}>Dont have an Account? <Link className={classes.RegisterLink} href='/authenticate/signUpPage'>Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignIn;