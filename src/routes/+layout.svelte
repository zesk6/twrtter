<script lang="ts">
    import '../app.css'
    import Navbtn from '$lib/components/navbtn.svelte';
</script>

<nav class="w-full min-w-screen bg-black flex px-2 pt-2 h-full min-h-screen">
    <section class="w-40 flex flex-col relative  " id="navbar">
        <div class="flex justify-center h-[55px] w-full">
            <a href="/home" class=" w-[55px] text-white text-md">twrtter</a>
        </div>
        <Navbtn text="Home" url="/home"><span slot="image" class="text-white">home</span></Navbtn>
        <Navbtn text="Explore" url="/explore"><span slot="image" class="text-white">explore</span></Navbtn>
        <Navbtn text="Notifications" url="/notives"><span slot="image" class="text-white">Notifications</span></Navbtn>
        <Navbtn text="Messages" url="/messages"><span slot="image" class="text-white">Messages</span></Navbtn>
        <Navbtn text="Lists" url="/lists"><span slot="image" class="text-white">Lists</span></Navbtn>
        <Navbtn text="Communities" url="/communities"><span slot="image" class="text-white">Communities</span></Navbtn>
        <Navbtn text="free" url="/free"><span slot="image" class="text-white">free</span></Navbtn>
        <Navbtn text="profile" url="/profile"><span slot="image" class="text-white">profile</span></Navbtn>
        <Navbtn text="more" url="/more"><span slot="image" class="text-white">more</span></Navbtn>
        <a href="/tweet" class="h-[55px] group w-[55px] flex items-center justify-center
        hover:bg-gray-700"><span class="text-white">tweet</span>
        <span class="absolute m-2 p-1 scale-0 transiton flex justify-end duration-200 group-hover:scale-100 origin-top
    bg-gray-500 text-white text-xs font-sans rounded bottom-10">post</span></a>

    </section>
    <main><slot></slot></main>
    

</nav>