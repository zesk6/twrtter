import type { PageLoad } from './$types';
import { db } from '$lib/firebase'
import { getDocs, where, limit, query } from 'firebase/firestore'
import { collection } from 'firebase/firestore';
import { error } from '@sveltejs/kit';
export const load = (async ({ params }) => {
    const tweetRef = collection(db, "tweets")
    const q = query(
        tweetRef,
        where("tweetId", "==", params.tweetId),
        limit(1)
    )
    const snapshot =  await getDocs(q)
    const exists = snapshot.docs[0].exists()
    const data = snapshot.docs[0].data()
    if (!exists ){
        throw error(404, "this tweet does not currently have existence in this reality")
    }
    return {
        text: data.text,
        uid: data.uid,
        likes: data.likes,
        timestamp: data.timestamp,
        actualPhoto: data.ActualPhoto,
        tweetId: data.tweetId,
        replys: data.replies
    };
}) satisfies PageLoad;