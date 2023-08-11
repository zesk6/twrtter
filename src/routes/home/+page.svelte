<script lang="ts">
    import Input from '$lib/components/input.svelte';
    import Tweet from '$lib/components/tweet.svelte';
    import type { PageData } from './$types';


    export let data: PageData
    const tweets = data.tweetsss
    
</script>
<h1 class="text-white text-2xl font-bold p-4 border-b border-gray-700">home</h1>
<div class="absolute top-3 right-[100px] w-[200px] bg-gray-800 rounded-xl p-2 ">
    <h2 class="text-xl text-white font-semibold">tips:</h2>
    <ul>    
    <li class="text-sm text-white">Reload after sending a tweet</li>
    <li class="text-sm text-white">Only images are allowed, no video</li>
    <li class="text-sm text-white">The profile button on the navbar works</li>
    <li class="text-sm text-white">DO NOT SPAM! If you spam my database writes are going to go into the sky and Google Cloud
        will kill me with the bills. So please don't.
    </li>
    <li class="text-sm text-white">Everything in this website is satire except for the tips. If you are mad, fuck you. </li>
    
    </ul>
</div>
<div class="absolute top-[340px] right-[100px] w-[200px] bg-gray-800 rounded-xl p-2 ">
    <h2 class="text-xl text-white font-semibold "> who to follow</h2>
    <span class="text-sm text-white">this site will never be big enough <br> for me to make a follow feature</span>
</div>
<Input />
<div id='allTweets'>
    {#if tweets}
    {#each tweets as tweet (tweet.tweetId) }            
    <Tweet profilePic={tweet.UserphotoUrl} text={tweet.text} time={tweet.timestamp} name={tweet.username}
    photo={tweet.ActualPhoto} replys={tweet.replys?.length ?? 0} likes={tweet.likes} tweetId={tweet.tweetId} handle={tweet.handle} />
    {/each } 
    {/if}
    
</div>