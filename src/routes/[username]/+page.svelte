<script lang="ts">
    import type { PageData } from './$types';
    import defaultProfile from '$lib/pictures/anime.jpg' 
    import TweetShowArea from '$lib/components/tweetShowArea.svelte';
    import defaultBanner from '$lib/pictures/lol.jpg'
    import EditProfile from '$lib/components/editProfile.svelte';
    import { scroll } from '$lib/firebase';
    export let data: PageData;
    let isEdit = false;
    function openEdit(){
        scroll.set(false)
        isEdit = true
    }
    function exit(){
        scroll.set(true)
        isEdit = false;
    }
</script>
<svelte:head>
    <title>{data.username} | Twrtter</title>
</svelte:head>

<div >
<div class="fixed flex items-center bg-black w-full z-10 ">
    <a class="p-2 rounded-full bg-black hover:bg-gray-800 m-2 transition duration-100" href="/home">
        <svg viewBox="0 0 24 24" width="24px" height="24px" style="color: rgb(239, 243, 244);"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" fill="white"></path></g></svg>
    
    </a>
    <span class="text-white font-bold text-xl ml-4">{data.username}</span>
</div>
<div class="w-full h-[200px]  bg-gray-600">
    <img src={defaultBanner} alt="who fucking cares" height='200px' class="max-h-[200px] w-full"> 
</div>
<div class="rounded-full w-[120.67px] h-[120.67px] flex items-center justify-center top-[120px] left-[220px] bg-black absolute"> 
    <img src={data.photoUrl ?? defaultProfile } alt="profile" class="absolute w-[113.67px] h-[113.67px] bg-none rounded-full ">
</div>
<div class="w-full flex justify-end h-fit">
    <button on:click={openEdit} class="rounded-full bg-black text-md text-white border border-gray-700 hover:bg-gray-800
     transition duration-150 p-[4px] m-2 align-end">
        Edit profile
    </button>
</div>
{#if isEdit}
    <EditProfile {exit} bio={data.bio} username={data.username} profilePic={data.photoUrl ?? defaultProfile }
    uid={data.uid} />
{/if}
<h1 class="text-xl font-bold  ml-6 text-white">{data.username}</h1>
<span class="text-sm block text-gray-400 ml-6 mb-2">{`@${data.handle}`}</span>
<div class="text-sm text-white font-semibold ml-6 mb-2">{data.bio}</div>
<span class="text-xs text-gray-500 ml-6 "><svg viewBox="0 0 24 24" width="20px" class="inline"   ><g><path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z" fill="gray"></path></g></svg>{`   Joined: ${data.dateCreated}`}</span>
<div class="w-full cursor-pointer bg-black mt-2 flex justify-center">
    <div class="w-1/2  flex items-center justify-center hover:bg-gray-800 transition duration-100">
    <h2 class="text-white font-semibold text-md py-2 border-b-4 border-blue-500 rounded">twrrts</h2>
    </div>
    <button class="w-1/2 p-2 flex items-center justify-center hover:bg-gray-800 transition duration-100" on:click={() =>alert('this button is a lie')}>
    <h2 class="text-white font-semibold text-md">replies</h2>
    </button>
</div>
{#if data.hasTweets}
<TweetShowArea tweets={data.allTweetdata}/>
{:else}
<p class="text-white font-semibold text-lg font-sans">You dont have twrrts. Twrrt some now!  </p>
{/if}
</div>