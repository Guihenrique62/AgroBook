<!-- HTML -->
<template>
    <v-combobox
        v-model="select"
        :items="items"
        :bg-color="cor"
        :label="texto"
        :append-inner-icon="prependIcon"
        v-bind="$attrs"
        style="border: 1px solid #656565;"
        class="ma-0 shrink rounded"
        elevation="0"
        density="compact"
        variant="solo"
        multiple
        chips
        persistent-hint
        return-object
        single-line
        hide-details>
    </v-combobox>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            select: []
        }
    },
    props: {
        carregar: Boolean,
        cor: String,
        texto: String,
        prependIcon: String,
        items: Object
    },
    computed: {
        selected: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('data', val);
            }
        }
    }
});
</script>