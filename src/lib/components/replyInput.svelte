<script lang="ts">
    import defaultProfile from '$lib/pictures/anime.jpg'
    import { userData, db, storage } from '$lib/firebase'
    import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
    import { doc, writeBatch, arrayUnion, updateDoc } from 'firebase/firestore'
    import { page } from '$app/stores';
    //this is the most complex thing i've ever built, and completly unintelligeble even to myself

    export let tweetId: string;
    export let handle: string;
    export let text: any;
    export let name: string;
    export let profilePic: any;
    export let exit: () => void;
    const replyID = crypto.randomUUID();
    let Text = ''
    let photo = false;
    let uploading = false;
    let previewURL: any;
    let fileURL: any;
    $: canSee = (Text.length > 0) ? 100 : 0;
    $: count = Text.length 
    function check(){
        if(count > 249) return;
    }
    async function upload(e: any) {
        uploading = true;
        const files = e.target.files[0]
        previewURL = URL.createObjectURL(files)
        const storageRef = ref(storage, `replies/${replyID}/photo`);
        const result = await uploadBytes(storageRef, files) 
        fileURL = await getDownloadURL(result.ref)
        uploading = false;
        photo = true;
    }
    async function handleSubmit(){
        const documentRef = doc(db, "replies", replyID)
        const batch = writeBatch(db)
        batch.set(documentRef, {
            tweetID: tweetId,
            replyID: replyID,
            likes: 0,
            text: Text,
            ActualPhoto: fileURL ?? null,
            timestamp: new Date(),
            uid: $userData?.uid

        })
      
        await batch.commit()
        
        Text = ""
        previewURL = ""
        count = 0
        setTimeout( exit, 500)
        

    }

    
</script>
<div class="fixed top-10 left-1/4 h-auto p-4 flex flex-col bg-black rounded-xl  w-1/2 shadow-2xl shadow-white">
    <div>
        <button on:click={exit} class="rounded-full hover:bg-gray-800 transition duration-200 p-[5px] mb-5">
            <svg viewBox="0 0 24 24" width="20px" style="color: rgb(239, 243, 244);"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" fill="white"></path></g></svg>
        </button>
    </div>
    <div class="flex w-full h-full">
        <div class="w-[40px]">
        <img src={profilePic ?? defaultProfile} alt="who fucking gives a shit" class="rounded-full" width="40px" height="40px">
        </div>
        <div class="w-[322px]">
            <div class="flex items-center">
                <h3 class="text-white font-semibold text-md mx-2">{name}</h3>
                <span class="text-gray-500 text-sm">{`@${handle}`}</span>
            </div>
            {#if text}
            <p class="text-sm text-white ml-2">{text}</p>
            {/if}
            <span class="text-gray-500 text-sm">Replying to <span class="text-blue-500 text-xm">{`@${handle}`}</span></span>
        </div>
    </div>
    <form on:submit|preventDefault={handleSubmit} class="mt-3">
        <div class="flex flex-col">
            <div class="flex">
                <div>
                    <img src={$userData?.photoUrl ?? defaultProfile} alt=" who fucking gives a fucking shit" class="w-[40px]
                    rounded-full">
                </div> 
                <textarea bind:value={Text} on:change={check} id="replyarea" cols="30" rows="10" style="resize:none;" 
                placeholder="reply here" class="ml-2 w-full h-20 bg-black text-white"></textarea>     
            </div>
            {#if previewURL}
                <img src={previewURL} alt="i dont really give a fuck y'know" height="100px" >
            {/if}
            <div class="mt-2 flex items-center justify-between">
           <input type="file" class="  cursor-pointer "  name="photoURL" accept="image/png, image/jpeg, image/gif, image/webp
           " on:change={upload} >
            <span class="text-blue-500 text-md scale-{canSee} font-bold">{count}/250</span>
            {#if count > 249} 
            <button disabled type="submit" class="rounded-full text-white font-semibold text-md p-2 bg-red-500 
           hover:bg-red-600 cursor-default">Too long!</button>
           {:else if count === 0 && !photo}
            <button disabled type="submit" class="rounded-full text-white font-semibold text-md p-2 bg-red-500 
           hover:bg-red-600 cursor-default">It's empty.</button>
           {:else if uploading}
            <button disabled type="submit" class="rounded-full text-white font-semibold text-md p-2 bg-red-500 
           hover:bg-red-600 cursor-default">Uploading... </button>
           {:else}
            <input type="submit" class="rounded-full text-white font-semibold text-md p-2 bg-blue-500 
           hover:bg-blue-600 cursor-pointer" />
           {/if}
            </div>
        </div>
    </form>
</div>