<!-- HTML -->
<template>
    <v-responsive class="ma-0 pa-0">
        <v-select
            v-model="select"
            v-bind="$attrs"
            :items="items"
            :label="texto"
            :bg-color="cor"
            style="border: 1px solid #656565;"
            class="ma-0 shrink rounded"
            item-title="title"
            item-value="value"
            density="compact"
            variant="solo"
            persistent-hint
            return-object
            single-line
            hide-details>
        </v-select>
    </v-responsive>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

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
        itemsTitle: String,
        itemsValor: String,
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

<!-- STYLE -->
<style scoped>
</style>