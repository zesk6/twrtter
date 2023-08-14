<script lang="ts">
   import { updateDoc, doc } from "firebase/firestore";
   import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
   import { db, storage } from "$lib/firebase";


   export let uid: string
   export let exit: () => void
   export let profilePic: string;
   export let username: string;
   export let bio: string
   let saving = false;
   let uploading = false;
   let previewURL: string;
   let newPhotoUrl: string;
   $: userNameTooLong = username.length > 29;
   $: bioTooLong = bio.length > 249;
   $: userNameZero = username.length === 0
   $: bioZero = bio.length === 0
   $: userStatus = (userNameZero) ? "It's empty." : (userNameTooLong) ? "Too long." : ""        //wtf is all this code
   $: bioStatus = (bioZero) ? "It's empty" : (bioTooLong) ? "Too long." : ""             // nested ternary hell
   $: userColor = (userStatus === "") ? 'blue' : 'red'
   $: bioColor = (bioStatus === "") ? 'blue' : 'red'
   

    async function handleSubmit(){
        saving = true
        const documentRef = doc(db, "users", uid) // i did a little oopsy when designing the database schema now i have to 
        
        await updateDoc(documentRef, {
            username: username,
            bio: bio,
            photoUrl: newPhotoUrl ?? profilePic,
        })
        
        setTimeout(() => {
            exit()
        }, 500)
        saving = false; 
   }
   async function handleUpload(e: any){
       uploading = true;
       const files = e.target.files[0] 
       previewURL = URL.createObjectURL(files) 
       const storageRef = ref(storage, `users/${uid}/profilepictures` )
       const result = await uploadBytes(storageRef, files) 
       newPhotoUrl = await getDownloadURL(result.ref)
       uploading = false; 
   }
</script>
<!-- popup window -->
<div class="shadow-2xl shadow-white rounded-xl bg-black fixed text-white top-3 left-64 z-20 h-[430px]
  flex flex-col p-2 w-[500px] ">
    <form on:submit={handleSubmit}>
    <div class="flex justify-between items-center">
        <button on:click={exit} class="p-2 rounded-full hover:bg-slate-800 transition duration-150 ">
            <svg viewBox="0 0 24 24" width="24px"   style="color: rgb(239, 243, 244);"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" fill="white"></path></g></svg>
        </button>
        <h1 class="text-white text-xl font-semibold ">{(saving) ? 'saving...' : 'Edit porfile'}</h1>
        {#if uploading}
        <button class="text-black bg-red-500 rounded-full p-2 text-md">Uploading... </button> 
        {:else}
        <input type="submit" class="text-black bg-white rounded-full p-2 text-md">
        {/if}
    </div>
    <div>
        <div class="w-full flex justify-center">
            <img src={ previewURL ?? profilePic} alt=" who fuckng gives a shit " class="w-[100px] rounded-full">
        </div>
       
            <label for="file" class="rounded-full bg-black opacity-75 p-[4px] absolute top-[85px] text-sm cursor-pointer
            left-[205px] hover:opacity-90 transition duration-100">choose photo</label>
            <input type="file" id="file" name="file" class="w-[0.01px]" accept="image/jpeg, image/gif, image/png, image/webp"
            on:change={handleUpload}>
            <label for="name" class="text-white font-semibold text-md block"> Username:</label>
            <input type="text" bind:value={username} maxlength={30} class="bg-black p-[4px] rounded-md w-full text-sm
            " name="name" id="name" >
            <span class="text-sm text-{userColor}-500 font-semibold">{username.length}/30 {userStatus}</span>
            <span class="text-md text-white font-semibold block mt-5">Bio:</span>
            <textarea cols="30" rows="10" bind:value={bio} maxlength={250} class="w-full h-20 text-white
            p-[4px] rounded-lg bg-black text-sm" style="resize:none;"></textarea>
            <span class="text-sm text-{bioColor}-500 font-semibold">{bio.length}/250 {bioStatus}</span>
     
    </div>
    </form>
    <span class="text-white font-semibold text-md m-2 p-2 w-full flex justify-center">Refresh the page!(i cant fix this bug)</span>
</div>
