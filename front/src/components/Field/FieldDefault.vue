<!-- HTML -->
<template>
    <v-responsive class="ma-0 pa-0">
        <v-text-field :type="tipo" v-model="selected" v-bind="$attrs" style="border: 1px solid #656565;" :loading="carregar"
            :bg-color="cor" class="ma-0 shrink rounded" elevation="0" :append-inner-icon="prependIcon" density="compact"
            clearable :label="texto" variant="solo" hide-details>
        </v-text-field>
    </v-responsive>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    data() {
        // AXIOS - PARA REQUISIÇÃO DE API
        const axios = require('axios');
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

        var reactiveVar = reactive({

        });

        return {
            reactiveVar
        }
    },
    props: {
        carregar: Boolean,
        cor: String,
        texto: String,
        prependIcon: String,
        tipo: String
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