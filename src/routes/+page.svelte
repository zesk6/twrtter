<script lang="ts">
    import Google from '$lib/pictures/download (4).png';
    import { auth, db } from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
    import { writeBatch, doc } from 'firebase/firestore';
    import { user } from '$lib/firebase'
    import  defaultProfile from '$lib/pictures/anime.jpg'

    const handleId = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
    


    async function signIn(){
        const provider = new GoogleAuthProvider();
        const User = await signInWithPopup(auth, provider);
        const batch = writeBatch(db);
        batch.set(doc(db, "users", User.user.uid ), {
            username: User.user.displayName,
            email: User.user.email,
            uid:  User.user.uid,
            photoUrl: defaultProfile,
            handle: `colombianCocaine${handleId}`,
            tweets: [],
            replys: [],
            bio: 'i like high-school girls (default bio[change it])',
            joinDate: new Date()
        });
        await batch.commit();        
    } 
</script>

{#if $user}
    <h1 class="text-6xl text-white text-bold">thx 4 signing in {$user.displayName}</h1><br><br><br>
    <a href="/home" class="bg-blue-500 p-3 m-2 text-white border-2 border-blue-600 text-xl
     text-semibold absolute left-64 rounded-full hover:bg-blue-300 transition duration-100
    ">continue to twrtter</a>
{:else}
<button class="flex text-white text-xl border-2 border-white rounded-full p-2 m-2 absolute top-64 left-64" on:click={signIn}>
    <img src={Google} alt="who fucking cares" class="w-12 rounded-full">
    Sign in with google

</button>
<span class="absolute text-white text-xl font-semibold bottom-10 left-64">sorry thats all we have at this moment</span>
{/if}

