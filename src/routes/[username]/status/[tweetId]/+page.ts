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
    const replyRef = collection(db, "replies")
    const q2 = query(
        replyRef, 
        where('tweetID', '==', params.tweetId),
        limit(25)
    ) 

    const snapshot2 = await getDocs(q2)
    function getReplyData(){
    if (snapshot2.docs[0]?.exists()){
        let data = []
        for(const reply of snapshot2.docs){
            const replyData = reply.data()
            data.push(replyData)
            console.log(replyData)
        }
        return data
    }
    return [{}]
    }
    const allReplyData = getReplyData()

    return {
        text: data.text,
        uid: data.uid,
        likes: data.likes,
        timestamp: data.timestamp,
        actualPhoto: data.ActualPhoto,
        tweetId: data.tweetId,
        replys: allReplyData
    };
}) satisfies PageLoad;