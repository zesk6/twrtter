<script lang="ts">
    import { page } from '$app/stores';
    import video from '$lib/404video.mp4'
</script>
<svelte:head>
    <title>error | Twrtter</title>
</svelte:head>
<h1 class="text-3xl text-white font-bold">{$page.status}: {$page.error?.message}</h1>
<video width="500px" height="500px" autoplay>
    <source src={video} type="video/mp4" >
    <track kind="captions">
</video>
