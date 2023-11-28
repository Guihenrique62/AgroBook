<!-- HTML -->
<template>
    <navBarPedidos />
    <router-view />
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

// COMPONENT
import navBarPedidos from '../components/Nav/NavBarPedidos.vue';

export default defineComponent({
    components: { navBarPedidos }
});
</script>