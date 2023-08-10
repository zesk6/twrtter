<script lang="ts">
    import type { PageData } from './$types';
    import defaultProfile from '$lib/pictures/anime.jpg' 
    export let data: PageData;
    let photo: any = null
</script>

<div class="px-2">
<div class="fixed flex items-center bg-black w-full ">
    <a class="p-2 rounded-full bg-black hover:bg-gray-800 m-2 transition duration-100" href="/home">
        <svg viewBox="0 0 24 24" width="24px" height="24px" style="color: rgb(239, 243, 244);"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" fill="white"></path></g></svg>
    
    </a>
    <span class="text-white font-bold text-xl ml-4">john</span>



</div>
<div class="w-[600px] h-[200px]  bg-gray-600">
    {#if photo}
       <img src={photo} alt="who fucking cares"> 
    {/if}
</div>
<div class="rounded-full w-[141.67px] h-[141.67px] flex items-center justify-center top-[120px] left-[220px] bg-black absolute"> 
    <img src={data.photoUrl ?? defaultProfile } alt="profile" class="absolute w-[133.67px] h-[133.67px] bg-none rounded-full ">
</div>
<div class="w-full flex justify-end h-fit">
    <a href="/edit" class="rounded-full bg-black text-xl text-white border border-gray-700 hover:bg-gray-500 transition duration-150 p-2 m-2 align-end">
        Edit profile
    </a>
</div>
<h1 class="text-2xl font-bold  ml-6 text-white">{data.username}</h1>
<span></span>
<div class="w-full cursor-pointer bg-black p-2 mt-6 hover:bg-gray-700 flex justify-center border-b-4 border-blue-400 transition duration-150">
    <h2 class="text-white font-semibold text-md">tweets</h2>
</div>
</div>