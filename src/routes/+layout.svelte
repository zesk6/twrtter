<script lang="ts">
    import '../app.css'
    import Navbtn from '$lib/components/navbtn.svelte';
    import Bell from '$lib/pictures/bell.svg';
    import House from '$lib/pictures/hous.svg'
    import Mail from '$lib/pictures/mail.svg';
    import More from '$lib/pictures/more.svg';
    import Search from '$lib/pictures/search.svg';
    import Tweet from '$lib/pictures/tweet.svg';
    import Logo from '$lib/pictures/twitterLogo.svg';
    import defaultProfile from '$lib/pictures/anime.jpg'
    import { user, userData, scroll } from '$lib/firebase';

    function stupid(e: MouseEvent){
        e.preventDefault()
        alert("cant you see the textbox on the top of the screen? How can you see a button as small as this but not THE TEXTBOX THAT COVER THE 1/2 OF THE ENTIRE VIEWPORT")
    }

</script>
{#if $scroll === false}
<style>
   body {
   height: 100%;
   overflow-y: hidden;
}
</style>
{/if}
<div class="w-full min-w-screen bg-black flex px-[100px] h-full min-h-screen">
    {#if $user}
    <section class="w-[90px] flex flex-col items-center sticky  mr-3  " >
        <div class="flex justify-right h-[55px] w-full ml-8">
            <a href="/home" class=" w-[55px] text-white text-md"><img src={Logo} alt="who fucking cares" width="50px">
            </a>
        </div>
        <!-- disgusting unreadable code...... but it works -->
        <Navbtn text="Home" url="/home"><img src={House} alt="who fucking cares" slot="image"></Navbtn>
        <Navbtn text="Explore" url="/explore"><img src={Search} slot="image" alt="who fucking cares"></Navbtn>
        <Navbtn text="Notifications" url="/notives"><img  slot="image" src={Bell} alt="who fucking cares"></Navbtn>
        <Navbtn text="Messages" url="/messages"><img slot="image" src={Mail} alt="who fucking cares"></Navbtn>
        <Navbtn text="free" url="/free"><span slot="image" class="text-[30px] text-white">F</span></Navbtn>
        <Navbtn text="profile" url={$userData?.handle ?? 'no'}><span slot="image"class="text-[30px] text-white" >P</span></Navbtn>
        <Navbtn text="more" url="/more"><img src={More} slot="image" alt="who fucking cares"></Navbtn>
        <button on:click={stupid}  class="h-[55px] group w-[55px] bg-blue-400 flex rounded-full items-center justify-center
        hover:bg-gray-700"><img src={Tweet} width="35px" alt="who fucking cares">
        <span class="absolute m-2 p-1 scale-0 transiton flex justify-end duration-200 group-hover:scale-100 origin-top
    bg-gray-500 text-white text-xs font-sans rounded bottom-10">post</span></button>
        <div class="mt-4 group hover:bg-gray-700 transition duration-100 rounded-full p-2 flex items-center justify-center">
                <img src={ $userData?.photoUrl ?? defaultProfile } 
                alt="no one cares" class="w-[40px] h-[40px] rounded-full">
                <div class="absolute scale-0 group-hover:scale-100 w-28 py-2 m-2 bg-black border-2 border-gray-400 rounded-xl
                shadow transition duration-100 bottom-14 left-14">
                    <a href="/logout" class='flex justify-center hover:bg-gray-700 group transition duration-100 flex-col'>
                        <span class="text-white text-md font-bold m-2 ">logout</span>
                        <span class="text-white text-[7.258762px] font-semibold mt-[3px] group "> hah you cant reach this
                           
                        </span>
                    </a>
                </div> 
        </div>
    </section>
    {:else}
    <h1>sign IN, mf</h1>
    {/if}
    <main class="w-[480px] border-x border-gray-700"><slot></slot></main>
</div>