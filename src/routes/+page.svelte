<script lang="ts">
    import Google from '$lib/pictures/download (4).png';
    import { auth, db } from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
    import { writeBatch, doc } from 'firebase/firestore';
    import { user } from '$lib/firebase'
    import  defaultProfile from '$lib/pictures/anime.jpg'

    const handleId = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}
    ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`


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
            followers: 0,
            following: 0,
            bio: 'i like high-school girls (default bio[change it])',
        });
        await batch.commit();        
    } 
</script>

{#if $user}
    <h1 class="text-6xl text-white text-bold">thx 4 signing in</h1><br><br><br>
    <a href="/home" class="bg-white p-2 m-2 text-black text-xl text-semibold absolute left-96">go to home page</a>
{:else}
<button class="flex text-white text-xl border-2 border-white rounded-full p-2 m-2 absolute top-64 left-64" on:click={signIn}>
    <img src={Google} alt="who fucking cares" class="w-12">
    Sign in with google
</button>
{/if}

