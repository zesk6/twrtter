<script lang="ts">
    import { db, user  } from '$lib/firebase'
    import { doc, updateDoc, arrayUnion, getDocs, where, query, limit, collection, arrayRemove } from 'firebase/firestore'
    import { onMount } from 'svelte';


    onMount( async () => {
       const collectionRef = collection(db, "users") 
       const q = query(
        collectionRef,
        where("uid", "==", $user?.uid ?? 'i will fucking kill myself'),
        limit(1)
       )
       const snapshot = await getDocs(q)
       const data = snapshot.docs[0].data()
       //i've only learned one way to fetch data in firebase
         
        userLiked = data.likes
        for (const userLike of userLiked){
            if (userLike.tweetId === tweetId){
                canLike = false;
            }
        }
    })
    let userLiked: any
    export let tweetId: string;
    export let likes: number;
    let canLike = true;
    const tweetRef = doc(db, "tweets", tweetId)
    const userRef = doc(db, "users", $user?.uid ||"u got to b kidding me")
    async function handleLike(){
        if (canLike){
            likes += 1
            canLike = false;
            await updateDoc(tweetRef, {
                likes: likes 
            })
            await updateDoc(userRef, {
                likes: arrayUnion({
                    tweetId: tweetId
                })
            })
            
            
        }

    }
    async function handleUnlike(){
        likes -= 1;
        canLike = true;
        await updateDoc(tweetRef, {
            likes: likes,
        })
        await updateDoc(userRef, {
            likes: arrayRemove(tweetId)
        })

    }
</script>
{#if canLike}
       <button class="mr-[40px] p-2 rounded-full hover:bg-slate-900 transition duration-150" on:click|preventDefault={handleLike}>
       <svg viewBox="0 0 24 24" width="19px" class='inline'><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" fill="gray"></path></g></svg> 
       <span class="text-xs text-gray-500">{likes}</span>
        </button>
        {:else}
<button class="mr-[40px] p-2 rounded-full hover:bg-gray-800 transition duration-150" on:click|preventDefault={handleUnlike}>
       <svg viewBox="0 0 24 24" width="19px" class='inline'><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" fill="red"></path></g></svg> 
       <span class="text-xs text-red-500">{likes}</span>
        </button>

{/if}
