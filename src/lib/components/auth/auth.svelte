<script lang="ts">
    import Google from '$lib/pictures/download (4).png';
    import  defaultProfile from '$lib/pictures/anime.jpg'

    import { auth, db } from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
    import { writeBatch, doc, updateDoc, getDoc } from 'firebase/firestore';

    
    
    let username = ''
    let password = ''

      
    const handleId = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
   
    // this code runs one time and turns off the scroll

    function exit() {
        alert("this button is a lie >:)))")
    }
    async function signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        const User = await signInWithPopup(auth, provider);
        const batch = writeBatch(db);
        batch.set(doc(db, "users", User.user.uid ), {
            username: User.user.displayName,
            email: User.user.email,
            uid:  User.user.uid,
            photoUrl: defaultProfile,
            handle: `colombianCocaine${handleId}`,
            likes: [],
            bio: 'i like high-school girls (default bio[change it so you are not a pedophile])',
            joinDate: new Date()
        });
       
        await batch.commit();        
    }
    async function signInWithEmail(){

    }
</script>
<style lang="scss">
    .gradient{
        background-image: linear-gradient(to right, #216679, #00c8ff);
    }
    
</style>
<!--bord and white text are classes defined in the app.css -->
<div class="flex flex-col justify-center p-5 w-1/2 rounded-xl bord fixed top-28
shadow-xl shadow-white">
    <div class="flex justify-between  items-center">
        <h2 class="white-text2 mb-2">Sign up</h2>
        <button on:click={exit} class="rounded-full hover:bg-gray-800 transition duration-200 p-[5px] mb-2
         ">
            <svg viewBox="0 0 24 24" width="35px" style="color: rgb(239, 243, 244);"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" fill="white"></path></g></svg>
        </button>
    </div>
    <div class="flex flex-col justify-left ">
        <label for="user" class="white-text">Username:</label>
        <input type="text" bind:value={username} class="p-2 rounded my-2" name="user" id="user">
    </div>
    <div class="flex flex-col justify-left">
        <label for="password" class="white-text">Password:</label>
        <input type="text" bind:value={password} class="p-2 rounded my-2" name="password" id="password">
    </div>
    <button type="submit" class="p-2 m-2 white-text border-2  border-white rounded-full flex justify-center
    items-center hover:bg-gray-700 transition duration-300 ">
        Sign up
    </button>
    <div class="gradient w-full h-1 my-3 rounded-full" ></div>
    
    <button class="flex items-center border-2 border-white rounded-full p-2 m-2 hover:bg-gray-700 transition
    duration-300" on:click={signInWithGoogle}>
        <img src={Google} alt="who fucking cares" class="w-8 rounded-full">
        <span class="ml-5 white-text ">Sign in with google</span>
    </button>
</div>