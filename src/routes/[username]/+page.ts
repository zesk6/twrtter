import { db } from '$lib/firebase'
import { collection, getDocs, where, limit, query, orderBy } from 'firebase/firestore'
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
    async function fetchTweets(){
        const docRef2 = collection(db, "tweets")
        const q2 = query(
            docRef2,
            where("handle", "==", params.username),
            orderBy('timestamp')
        )
        const snapShot2 = await getDocs(q2)
        const exists = snapShot2.docs[0].exists()
        let allTweetdata = []
        for(const tweet of snapShot2.docs){
            const tweetData = tweet.data()
            allTweetdata.push(tweetData) 
        }
        return {
            allTweetdata,
            exists
        };
    }
    const userAllTweetData = await fetchTweets(); // contains if the user has tweets and/or the user tweets data (incomprehensible comments)
    return {
        username: data.username,
        photoUrl: data.photoUrl,
        handle: data.handle,
        bio: data.bio,
        uid: data.uid,
        dateCreated: data.joinDate,
        allTweetdata: userAllTweetData.allTweetdata,
        hasTweets: userAllTweetData.exists
    };
});