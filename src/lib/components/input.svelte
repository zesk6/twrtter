
<script lang='ts'>
    import defaultProfile from '$lib/pictures/anime.jpg'
    import { page } from '$app/stores';
    import { userData, user} from '$lib/firebase'
    import { db, storage } from '$lib/firebase'
    import { arrayUnion, doc, updateDoc, writeBatch } from 'firebase/firestore'
    import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
    import Image from '$lib/components/image.svelte'     


    let photo = false
    let count = 0;
    let visible = 0;
    let text = "";
    let beforeAfter = 80
    let previewURL: string;
    let uploading = false; 
    let fileUrl: string;
    let tweeterID = crypto.randomUUID()
    function handleInput(e: any) {

        beforeAfter = 174.4
        count = text.length
    }
    async function handleSubmit(e: any){
       const tweetRef = doc(db, 'tweets', tweeterID );
       const batch = writeBatch(db);
       batch.set(tweetRef,{
            uid: $userData?.uid,
            likes: 0,
            ActualPhoto: fileUrl ?? null, 
            timestamp: new Date(),
            tweetId: tweeterID,
            handle: $userData?.handle,
            text: text,
            replys: []

       })
       await batch.commit()
       text = "";
       previewURL = ''
        
    }

    async function upload(e: any){
        uploading = true;
        const file = e.target.files[0] 
        previewURL = URL.createObjectURL(file);
        const storageRef = ref(storage, `tweets/${tweeterID}/photo`  );
        const result = await uploadBytes(storageRef, file)
        fileUrl = await getDownloadURL(result.ref);
        uploading = false;
        photo = true;
    }

</script>


<div class='w-full  border-b border-gray-700 h-{`${beforeAfter}px`} flex pb-2'>
    <div class="p-2">
        <img src={$userData?.photoUrl} alt="no one cares"
        class="w-[40px] h-[40px] rounded-full  ">
    </div>
    <form on:submit|preventDefault={handleSubmit} class="w-[400px]" >
        <textarea maxlength="250" bind:value={text} on:input={handleInput} on:focus={() => visible = 100}
         placeholder={`Reload to see your twrrt, ${$userData?.username ?? 'colombianCocaine'}!`} cols="30" rows="10" class=" w-[380px]  
        bg-black focus:border-none text-white h-20 m-4 " style="resize:none;"></textarea>
        {#if previewURL} 
            <Image {previewURL} />
        {/if}
        <div class="flex justify-evenly items-center w-full ">
           <input type="file" class="scale-{visible} cursor-pointer "  name="photoURL" accept="image/png, image/jpeg, image/gif, image/webp
           " on:change={upload} >
           <span class="text-md text-blue-500 font-semibold scale-{visible} mr-2">{count}/250</span>
            {#if text.length > 249}
            <button disabled type="submit" class="rounded-full text-white font-semibold text-md p-2 bg-red-500 scale-{visible}
           hover:bg-red-600 cursor-default">Too long!</button>
            {:else if uploading}    
            <button disabled type="submit" class="rounded-full text-white font-semibold text-md p-2 bg-red-500 scale-{visible}
           hover:bg-red-600 cursor-default">
            <span class="w-12 h-12 border border-white rounded-[50%] animate-spin"></span>
                uploading
            </button>
            {:else if text.length === 0 && !photo}
            <button disabled type="submit" class="rounded-full text-white font-semibold text-md p-2 bg-red-500 scale-{visible}
           hover:bg-red-600 cursor-default">Empty.</button>
            {:else}
            <input type="submit" class="rounded-full text-white font-semibold text-md p-2 bg-blue-500 scale-{visible}
           hover:bg-blue-600 cursor-pointer" />
    {/if}
        </div>
    </form>

</div>