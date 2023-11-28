<!-- HTML -->
<template>
    <v-responsive class="ma-0 pa-0">
        <v-textarea
            v-model="selected"
            v-bind="$attrs"
            style="border: 1px solid #656565;"
            :loading="carregar"
            :bg-color="cor"
            class="ma-0 shrink rounded"
            elevation="0"
            :append-inner-icon="prependIcon"
            density="compact"
            clearable
            :label="texto"
            variant="solo"
            hide-details>
        </v-textarea>
    </v-responsive>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    props: {
        carregar: Boolean,
        cor: String,
        texto: String,
        prependIcon: String
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