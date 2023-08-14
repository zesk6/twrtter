<script lang="ts">
    import Input from '$lib/components/input.svelte';
    import Tweet from '$lib/components/tweet.svelte';
    import type { PageData } from './$types';


    export let data: PageData
    const tweets = data.tweetsss
    
</script>
<svelte:head>
    <title>home | Twrtter</title>
</svelte:head>
<h1 class="text-white text-2xl font-bold p-4 border-b border-gray-700">home</h1>

<Input />
<div id='allTweets'>
    {#if tweets}
    {#each tweets.reverse() as tweet (tweet.tweetId)}            
    <Tweet uid={tweet.uid} text={tweet.text}  
    photo={tweet.ActualPhoto} replys={tweet.replys?.length ?? 0} likes={tweet.likes} tweetId={tweet.tweetId} 
     />
    {/each } 
    {/if}
    <div class="absolute top-1 right-1 h-full min-h-screen">
    <span class="text-white font-bold text-xl"> click both "ctrl"  and  "=" to zoom in </span> 
    <span class=" text-white font-bold text-xl block">(i made mistakes and everything is small )</span>

    <div class="text-white font-bold text-xl">you can edit your profile</div> 
        <a href="https://github.com/zesk6/twrtter" class="text-white bg-blue-500 p-2 rounded-full 
        border-2 m-2 border-white font-bold hover:bg-blue-300 transition duration-150">star us on Github. DO IT.</a>
    </div>
</div>