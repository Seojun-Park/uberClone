import firebase from "firebase/app";
import "firebase/storage";
import { config } from "../key";

const firebaseConfig = config;
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
