<script lang="ts">
    export let text: string;
    export let url: string;
</script>

<a href={url} class="w-[50px] flex justify-center p-2 mr-2 h-[50px] items-center  rounded-full hover:bg-gray-700
transition duration-100 group">
    <slot name="image"></slot>
    <span class="absolute m-2 p-1 scale-0 transiton flex justify-end duration-200 group-hover:scale-100 
    bg-gray-500 text-white text-xs font-sans rounded">{text}</span>
</a>