import {initializeApp } from 'firebase/app'
import { 
    getAuth,  
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt: 'select_account'
});


export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);



export const createUserDocumentFromAuth = async (userauth) => {
    if (!userauth) return;

    const userDocRef = doc(db, 'users', userauth.uid);
    const userSnapshot = await getDoc(userDocRef)
    
    if(!userSnapshot.exists()) {
        const { email } = userauth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                email,
                createdAt,
            });
        } catch (error) {
            console.log('error creating the user');
        }
    }

    return userDocRef;
}


export const createAuthUserWithEmailandPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailandPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}


export const SignOutUser = async () => await signOut(auth);


export const OnAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export default db