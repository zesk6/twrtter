<script lang="ts">
    import { user } from '$lib/firebase'

</script>
{#if $user}
    <slot />
{:else}
    <a href="/" class="p-2 m-2 rounded-full border-white bg-black text-white text-2xl">sign in, or ELSE.....</a>
{/if}