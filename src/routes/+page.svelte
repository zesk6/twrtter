<script lang="ts">

    import { user } from '$lib/firebase';
    import { scroll } from '$lib/firebase';
    import Auth from '$lib/components/auth/auth.svelte';

    let isSignin = true;
    scroll.set(true)
    

    

</script>
<svelte:head>
    <title>Welcome to Twrtter</title>
</svelte:head>
<div class="flex justify-center items-center">
    
    {#if $user}
        <h1 class="text-6xl text-white text-bold">thx 4 signing in {$user.displayName}</h1><br><br><br>
        <br><br>
        <div class="flex justify-center w-full">
        <a href="/home" class="bg-blue-500 p-3  text-white border-2 border-blue-600 text-xl
        text-semibold   rounded-full hover:bg-blue-300 transition duration-100
        ">continue to twrtter</a>
        </div>
    {:else}
            
        <Auth /> 

    {/if}

</div>
