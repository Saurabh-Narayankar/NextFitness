import { useRouter } from 'next/router'
import Link from 'next/link';

import classes from './signUp.module.css'

import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from "../../../lib/firebase";
import SignUpImg from '../../../assets/signUp.svg'


const SignUp = () => {

    const router = useRouter()

    const signUpHandler = async (event) => {
        event.preventDefault();

        const email = event.target.email.value
        const password = event.target.password.value
        const confirmPassword = event.target.confirmPassword.value

        if (password !== confirmPassword) {
            alert('password do not match')
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailandPassword(email, password)
            await createUserDocumentFromAuth(user)
            if (user) {
                router.push('/')
            }

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user Email ID already in use');                
            }else {
                console.log('error', error);
            }
        }

        event.target.email.value = ''
        event.target.name.value = ''
        event.target.password.value = ''
        event.target.confirmPassword.value = ''

    }

    return (
        <div>
            <div className={classes.logInContainer}>
                <div className={classes.logInInnerContainer}>
                    <div className={classes.logInImage}>
                    <div className={classes.logInImageInner}>
                        <SignUpImg className={classes.authenticateImage} />
                    </div>
                    </div>
                    <div className={classes.logInForm}>
                        <div className={classes.logInFormInner}>
                            <form className={classes.logInFormContainer} onSubmit={signUpHandler}>
                                <div className={classes.logInInput}>
                                    <div>
                                        <label id="email">Email</label>
                                        <input type='email' id="email" name="email" required />
                                    </div>
                                    <div>
                                        <label id="name">Name</label>
                                        <input type='text' id="name" name="name" required />
                                    </div>
                                    <div>
                                        <label id="password">Password : </label>
                                        <input type='password' id="password" name="password" required />
                                    </div>
                                    <div>
                                        <label id="confirmPassword">Confirm Password</label>
                                        <input type='password' id="confirmPassword" name="confirmPassword" required />
                                    </div>
                                </div>
                                <div className={classes.logInButton}>
                                    <button type="submit">LogIn</button>
                                </div>
                            </form>
                            <p className={classes.Register}>Have and Account ? <Link className={classes.RegisterLink} href='/authenticate/signInPage'>SignIn</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignUp;