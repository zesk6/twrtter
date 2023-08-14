<script lang="ts">
    import { scroll } from '$lib/firebase'
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase';
    import { doc, getDoc, type DocumentData } from 'firebase/firestore'
    import ReplyInput from '$lib/components/replyInput.svelte';
    import LikeBtn from '$lib/components/likeBtn.svelte'
    import { error } from '@sveltejs/kit';


    export let text: string;
    export let photo: any;
    export let uid: string
    export let replys: number;
    export let likes: number;
    export let tweetId: string;
    let userData: DocumentData | undefined
    let isReply = false;
    onMount(async() => {
        const userRef = doc(db, "users", uid)
        const Doc = await getDoc(userRef)
        const exists = await Doc.exists()
        if (!exists){
            throw error(500, 'i give up on life. its over. i give up. im going to kill myself, goodbye.')
        }
        userData = await Doc?.data() 
        
    })
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
<a href={`/${userData?.handle ?? "i give up"}/status/${tweetId}`} class="w-full h-auto flex pb-2">
   <div class="flex flex-col items-start h-full w-[40px] mr-4">
        <img src={userData?.photoUrl  } alt=" who fucking cares" class="w-[40px] h-[40px] rounded-full">
    
   </div> 
   <div class="flex flex-col w-full">
    <div class="flex justify-start items-center">
        <a href={`/${userData?.handle}`}><h2 class=" text-lg text-white font-bold font-sans hover:underline">{userData?.username}</h2></a>
        <span class="text-md text-gray-500 ml-2">{`@${userData?.handle}`}</span>
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
            <ReplyInput {tweetId} handle={userData?.handle} {text}  name={userData?.username} profilePic = {userData?.photoUrl}
            {exit} />            
        {/if}
        <LikeBtn {tweetId} {likes} />


    </div>
</div>