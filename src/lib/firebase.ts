import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable, derived} from 'svelte/store';
import type { Readable } from 'svelte/store';
import { doc, onSnapshot } from 'firebase/firestore';

export const app = initializeApp({
  apiKey: "AIzaSyCKCLCs5CIdPdrCHZfOn78f9pN_gpqyCMI",
  authDomain: "twrtter-c005f.firebaseapp.com",
  projectId: "twrtter-c005f",
  storageBucket: "twrtter-c005f.appspot.com",
  messagingSenderId: "951972471015",
  appId: "1:951972471015:web:cfad8d79f1798ea61a8242",
  measurementId: "G-1BDTPN6Z2X"
});
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)



function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();
export function docStore<T>(
  path: string,
) {
  let unsubscribe: () => void;

  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}
interface UserData {
  username: string;
  bio: string;
  photoUrl: string;
  tweets: any[],
  handle: string,
  uid: string
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => { 
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null); 
  }
}); 
export const scroll = writable(true);


