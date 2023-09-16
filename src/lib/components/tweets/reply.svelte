<script lang="ts">
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase';
    import { doc, getDoc, type DocumentData } from 'firebase/firestore'

    import { error } from '@sveltejs/kit';


    export let text: string;
    export let photo: any;
    export let uid: string

    let userData: DocumentData | undefined
    onMount(async() => {
        const userRef = doc(db, "users", uid)
        const Doc = await getDoc(userRef)
        const exists = await Doc.exists()
        if (!exists){
            throw error(500, 'i give up on life. its over. i give up. im going to kill myself, goodbye.')
        }
        userData = await Doc?.data() 
        
    })

</script>
<div class="w-full p-2 border-b border-gray-700 h-auto flex  flex-col">
<div  class="w-full h-auto flex pb-2">
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
<!-- fix this code for me plz -->
</div>

    <div class="flex  justify-between w-full ml-9 ">

        
    


    </div>
</div>