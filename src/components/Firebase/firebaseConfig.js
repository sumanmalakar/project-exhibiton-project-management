import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
import { getFirestore } from '@firebase/firestore';


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCPKwpTuXVOmoKvv2kzn93m9WAYhbv3sqs",
//   authDomain: "otif-40108.firebaseapp.com",
//   projectId: "otif-40108",
//   storageBucket: "otif-40108.appspot.com",
//   messagingSenderId: "292235935057",
//   appId: "1:292235935057:web:31a51b4d29fa69c2b66770"
// };


const firebaseConfig = {
  apiKey: "AIzaSyCQ8IsJ4giV2yz_LiQSfNN4OBGcQqFV4ZA",
  authDomain: "braided-lambda-266810.firebaseapp.com",
  databaseURL: "https://braided-lambda-266810.firebaseio.com",
  projectId: "braided-lambda-266810",
  storageBucket: "braided-lambda-266810.appspot.com",
  messagingSenderId: "509687963458",
  appId: "1:509687963458:web:606a02272a889afa09b2db",
  measurementId: "G-74J4GL1GMM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider()

