<script lang="ts">
    import Input from '$lib/components/input.svelte';
    import Tweet from '$lib/components/tweet.svelte';
    import type { PageData } from './$types';


    export let data: PageData
    const tweets = data.tweetsss
    
</script>
<h1 class="text-white text-2xl font-bold p-4 border-b border-gray-700">home</h1>

<Input />
<div id='allTweets'>
    {#if tweets}
    {#each tweets.reverse() as tweet (tweet.tweetId)}            
    <Tweet profilePic={tweet.UserphotoUrl} text={tweet.text}  name={tweet.username}
    photo={tweet.ActualPhoto} replys={tweet.replys?.length ?? 0} likes={tweet.likes} tweetId={tweet.tweetId} handle={tweet.handle}
     />
    {/each } 
    {/if}
    
</div>