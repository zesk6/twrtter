import type { PageLoad } from './$types';
import { db } from '$lib/firebase'
import { getDocs, query, limit, collection, orderBy, doc, getDoc } from 'firebase/firestore'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export const load = (async () => {
    try{
    const collectionRef = collection(db, 'tweets')
    const q = query(
        
        collectionRef, 
        orderBy("timestamp"),
        limit(25),
    )
    const snapshot = await getDocs(q)
    function getTweetData(docs: QueryDocumentSnapshot<DocumentData>[] ){
        
        let data = []
        for (const tweet of docs){
            const tweetData = tweet.data()
            data.push(tweetData) 
        }
        return data;
    }
    // allTweetData is a [{ tweetid:jrkejrwerewrjlkewrjlewrjej }] an array of objects full of tweet properties
    const allTweetData = getTweetData(snapshot.docs)
    

    return {
        tweetsss: allTweetData,
        
       
    };
} catch(error){
    console.log(error)
}
}) satisfies PageLoad;