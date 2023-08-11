import { db } from '$lib/firebase'
import { collection, getDocs, where, limit, query } from 'firebase/firestore'
import { error } from '@sveltejs/kit';


export const load = (async ({ params }) => {
    const docRef = collection(db, "users")
    const q = query(
        docRef,
        where( 'handle' , '==', params.username),
        limit(1)
    )
    const snapShot =  await getDocs(q)
    const exists = snapShot.docs[0]?.exists()
    const data = snapShot.docs[0]?.data()
    if (!exists){
        throw error(404, 'I forgot to make this page or it doesn"t exist, sorry')
    }
    

    return {
        username: data.username,
        photoUrl: data.photoUrl,
        followers: data.followers,
        handle: data.handle,
        following: data.following,
        tweets: data.tweets,
        bio: data.bio,
    

    };
});