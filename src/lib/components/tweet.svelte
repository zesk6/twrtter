<script lang="ts">
    import defaultProfile from '$lib/pictures/anime.jpg'
    import { db, scroll } from '$lib/firebase'
    import { doc, updateDoc } from 'firebase/firestore'
    import ReplyInput from './replyInput.svelte';
    export let profilePic: any;
    export let name: string;
    export let text: string;
    export let photo: any;
    export let replys: number;
    export let likes: number;
    export let tweetId: string;
    export let handle: string
    let canLike = true;
    let isReply = false;


    async function handleLike(){
        if (canLike){
            canLike = false;
            likes += 1
            const docRef = doc(db, "tweets", tweetId)
            await updateDoc(docRef, {likes: likes})
        }
    }
    async function handleUnlike(){
        if (!canLike){
            canLike = true;
            likes -= 1;
            const docRef = doc(db, 'tweets', tweetId)
            await updateDoc(docRef, {likes: likes})
        }
    }
    function handleReply(){
       isReply = true;
       scroll.set(false)
    }
    function exit(){
        isReply = false;
        scroll.set(true)
    }

</script>
<div class="w-full p-2 border-b border-gray-700 h-auto flex  flex-col">
<a href={`/${handle}/status/${tweetId}`} class="w-full h-auto flex pb-2">
   <div class="flex flex-col items-start h-full w-[40px] mr-4">
        <img src={profilePic ?? defaultProfile } alt=" who fucking cares" class="w-[40px] rounded-full">
    
   </div> 
   <div class="flex flex-col w-full">
    <div class="flex justify-start items-center">
        <a href={`/${name}`}><h2 class=" text-lg text-white font-bold font-sans hover:underline">{name}</h2></a>
        <span class="text-md text-gray-500 ml-2">{`@${handle}`}</span>
    </div>
    <div>
        <p class="text-white text-md">{text}</p>
       {#if photo}
        <img src={photo} alt="who fucking cares" class="rounded-2xl mt-2" width="450px">
        {/if}
    </div>
</div>

</a>

    <div class="flex  justify-between w-full ml-9 ">

        <button on:click={handleReply}>
        <svg viewBox="0 0 24 24" width="19px" class="inline"  ><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" fill="gray"></path></g></svg>
        <span class="text-xs text-gray-500">{replys}</span>
        </button>
        {#if isReply }
            <ReplyInput {tweetId} {handle} {text}  {name} {profilePic} {exit} />            
        {/if}
       {#if canLike}
       <button class="mr-[40px]" on:click|preventDefault={handleLike}>
       <svg viewBox="0 0 24 24" width="19px" class='inline'><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" fill="gray"></path></g></svg> 
       <span class="text-xs text-gray-500">{likes}</span>
        </button>
        {:else}
<button class="mr-[40px]" on:click|preventDefault={handleUnlike}>
       <svg viewBox="0 0 24 24" width="19px" class='inline'><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" fill="red"></path></g></svg> 
       <span class="text-xs text-red-500">{likes}</span>
        </button>

        {/if}
    </div>
</div>