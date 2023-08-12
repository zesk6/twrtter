<script lang="ts">
    import Tweet from '$lib/components/tweet.svelte'

    
    export let tweets: any;
</script>
<div id='allTweets' class="pt-2 border-t border-gray-700">
    {#if tweets}
    {#each tweets.reverse() as tweet (tweet.tweetId)}            
    <Tweet profilePic={tweet.UserphotoUrl} text={tweet.text}  name={tweet.username}
    photo={tweet.ActualPhoto} replys={tweet.replys?.length ?? 0} likes={tweet.likes} tweetId={tweet.tweetId} handle={tweet.handle} />
    {/each } 
    {/if}
    
</div>