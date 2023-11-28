<!-- HTML -->
<template>
    <navBar />
    <router-view />
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

// COMPONENT
import navBar from '@/components/Nav/NavBar.vue';

export default defineComponent({
    components: { navBar }
});
</script>