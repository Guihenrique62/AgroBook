<!-- HTML -->
<template>
    <v-responsive class="ma-0 pa-0">
        <!-- <v-text-field v-model="selected" v-bind="$attrs" style="border: 1px solid #656565;" :loading="carregar"
            :bg-color="cor" class="ma-0 shrink rounded" elevation="0" :append-inner-icon="prependIcon" density="compact"
            clearable :label="texto" variant="solo" hide-details>
        </v-text-field> -->
        <v-select
            v-model="selected"
            v-bind="$attrs"
            style="border: 1px solid #656565;"
            class="ma-0 shrink rounded"
            :items="items"
            item-title="title"
            item-value="value"
            :label="texto"
            persistent-hint
            return-object
            density="compact"
            single-line
            variant="solo"
            :bg-color="cor"
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
            select: { title: 'Administrador', value: 0 },
            items: [
                { title: 'Administrador', value: 0 },
                { title: 'Colaborador', value: 1 }
            ],
        }
    },
    props: {
        carregar: Boolean,
        cor: String,
        texto: String,
        prependIcon: String,
        itemsTitle: String,
        itemsValor: String,
        items: Object,
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