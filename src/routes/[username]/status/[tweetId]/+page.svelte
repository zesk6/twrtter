<script lang="ts">
    import type { PageData } from './$types';
    import defaultProfile  from '$lib/pictures/anime.jpg' 
    import LikeBtn from '$lib/components/likeBtn.svelte';
    import ReplyInput from '$lib/components/replyInput.svelte';
    import type { DocumentData } from 'firebase/firestore';
    import { db } from '$lib/firebase'
    import { onMount } from 'svelte';
    import { doc, getDoc } from 'firebase/firestore'
    import { scroll } from '$lib/firebase';
    import { error } from '@sveltejs/kit';
    import Reply from '$lib/components/reply.svelte';
    export let data: PageData;
    let isReply = false;
    let userData: DocumentData | undefined
    
    function exit(){
        scroll.set(true)
        isReply = false;
    }
    onMount(async() => {
        const userRef = doc(db, "users", data.uid)
        const document = await getDoc(userRef)
        const exists = await document.exists()
        if (!exists){
           throw error( 500, 'i do not want to live anymore, put me out of my misery') 
        }
        userData = await document.data() 

    })
    console.log(data.replys)
</script>
<div class="flex items-center bg-black w-full  z-50 fixed">
    <a class="p-2 rounded-full bg-black hover:bg-gray-800 m-2 transition duration-100" href="/home">
        <svg viewBox="0 0 24 24" width="24px" height="24px" style="color: rgb(239, 243, 244);"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" fill="white"></path></g></svg>
    
    </a>
    <span class="text-white font-bold text-xl ml-4">post</span>
</div>

<div class="flex flex-col p-3 h-full min-h-screen ">
    <div class="flex items-center">
        <br><br><br><br><br><br>
        <div >
            <img src={userData?.photoUrl ?? defaultProfile} alt="who fucking gives a shit" width="40px" height="40px" class="
            rounded-full">
        </div>
        <div class="ml-2">
            <h2 class="text-white text-md font-semibold">{userData?.username}</h2>
            <span class="text-gray-500 text-sm ">{`@${userData?.handle}`}</span>
        </div>
    </div>
    {#if data.text}
    <p class="text-lg text-white mb-[3px]">{data.text}</p>
    {/if}
    {#if data.actualPhoto}
        <img src={data.actualPhoto} alt="who fucking cares" class="rounded-xl w-full h-auto py-2">
    {/if}
    <span class="text-gray-500 text-sm">{`Created: ${data.timestamp}`}</span>
    <div class="flex justify-between mt-3">
        <button class="p-2 rounded-full hover:bg-gray-800 transition duration-150 flex items-center" on:click={() => {
        isReply = true; scroll.set(false)}}>
            <svg viewBox="0 0 24 24" width="24px" class='inline'><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" fill="gray"></path></g></svg>
        <span class="text-xs text-gray-500 inline ml-2">{data.replys?.length ?? 0}</span>
        </button>

        <LikeBtn tweetId={data.tweetId} likes={data.likes}/>
    </div>
    {#if isReply}
        <ReplyInput exit={exit} profilePic={userData?.photoUrl} name={userData?.username} text={data.text} 
       tweetId={data.tweetId} handle={userData?.handle}/>
    {/if} 

    <div id='allTweets' class="pt-2 border-t border-gray-700">
        {#if data.replys}
        {#each data.replys.reverse() as reply (reply.replyID)}            
        <Reply text={reply.text}  
        photo={reply.ActualPhoto} uid={reply.uid}  />
        {/each } 
        {/if}
        
    </div>

</div>