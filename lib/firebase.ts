import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);

export async function storeUserData(walletAddress: string) {
  try {
    // First check if a user with this wallet address already exists
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("wallet_address", "==", walletAddress));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Generate UUID
      const uuid = crypto.randomUUID();
      const userRef = doc(db, "Users", uuid);
      
      await setDoc(userRef, {
        id: uuid,
        creator_name: "",
        bio: "",
        user_icon: "",
        website: "",
        earning: 0,
        email: "",
        ip: [],
        item: [],
        wallet_address: walletAddress,
        createdAt: new Date().toISOString(),
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error storing user data:", error);
    return false;
  }
}

export { db, storage };