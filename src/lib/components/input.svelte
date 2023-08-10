
<script lang='ts'>
    import defaultProfile from '$lib/pictures/anime.jpg'
    import { page } from '$app/stores';
    import { userData, user} from '$lib/firebase'
    import { db } from '$lib/firebase'
    import { arrayUnion, doc, updateDoc, writeBatch } from 'firebase/firestore'
    


    let count = 0;
    let visible = 0;
    let text = "";
    let beforeAfter = 80
    let tooLong = false;
    function handleInput(e: any) {
        beforeAfter = 174.4
        visible = 100;
        if (count >= 249) {
           
           tooLong = true;
           return;
           
        } else {
            tooLong = false;
            count = text.length
        }
    
    }
    async function handleSubmit(e: any){
       const tweetId = crypto.randomUUID()
       const tweetRef = doc(db, 'tweets', tweetId );
       const userRef = doc(db, 'users', $user!.uid)
       const batch = writeBatch(db);
       batch.set(tweetRef,{
            uid: $userData?.uid,
            likes: 0,
            photoUrl: $userData?.photoURL ?? defaultProfile,
            timestamp: new Date().toJSON().slice(0, 10),
            tweetId: tweetId,
            username: $userData?.username,
            handle: $userData?.handle,
       })
       await updateDoc(userRef, {
            tweets: arrayUnion({
                tweetId: tweetId
            }),
       }) 
       await batch.commit()
       text = "";
        
    }


</script>


<div class='w-full  border-b border-gray-700 h-{`${beforeAfter}px`} flex'>
    <div class="p-2">
        <img src={$page?.data?.photoUrl ?? defaultProfile} alt="no one cares"
        class="w-[40px] rounded-full  ">
    </div>
    <form on:submit|preventDefault={handleSubmit} class="w-[400px]" >
        <textarea maxlength="250" bind:value={text} on:input={handleInput}
         placeholder={`so, hows ur day, ${$userData?.username ?? 'colombianCocaine'}?`} cols="30" rows="10" class=" w-[500px]  
        bg-black  focus:border-none text-white h-20 m-4 " style="resize:none;"></textarea>
        <div class="flex justify-evenly items-center w-full ">
            <span class="text-md text-blue-500 font-semibold scale-{visible}">Everyone can reply</span>
            <span class="text-md text-blue-500 font-semibold scale-{visible}">{count}/250</span>
            {#if tooLong == false}
            <input type="submit" class="rounded-full text-white font-semibold text-md p-3 bg-blue-500 scale-{visible}
           hover:bg-blue-600 cursor-pointer" />
            {:else}
            
            <button disabled type="submit" class="rounded-full text-white font-semibold text-md p-3 bg-red-500 scale-{visible}
           hover:bg-red-600 cursor-default">Too long!</button>
           {/if}
        </div>
    </form>

</div>