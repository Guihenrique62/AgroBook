<!-- HTML -->
<template>
    <navBarLivros />
    <router-view />
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

// COMPONENT
import navBarLivros from '../components/Nav/NavBarLivros.vue';

export default defineComponent({
    components: { navBarLivros }
});
</script>