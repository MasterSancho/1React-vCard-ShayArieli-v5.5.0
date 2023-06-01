import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: 'AIzaSyA32fBMbwdVCulDkxImJ16xZ_YK9Wt8p3k',
 authDomain: 'arieli-shaii.firebaseapp.com',
 projectId: 'arieli-shaii',
 storageBucket: 'arieli-shaii.appspot.com',
 messagingSenderId: '667526557069',
 appId: '1:667526557069:web:a33f36086424336f3961c4',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
