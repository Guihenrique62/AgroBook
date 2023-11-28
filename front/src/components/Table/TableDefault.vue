<!-- HTML -->
<template>
    <v-container class="rounded" style="border: 1px solid #656565;">
        <v-data-table
            color="white" v-model:search="search" v-model:items-per-page="itemsPorPagina" :headers="cabecalho"
            :items-length="tamanhoItems" :items="items" :loading="carregando" item-value="" @update:options="filter"
            single-select item-key="nome">

            <template v-slot:item="props">
                <tr style="cursor: default;">
                    <td v-for="(row, i) in cabecalho" :key="i">
                        <div v-if="typeof(props.item[row.key]) == 'object' && row.tipo != 'btnIcon'">
                            {{
                                props.item[row.key][0][row.objectKey]
                            }}
                        </div>
                        <div v-if="typeof(props.item[row.key]) != 'object' && row.tipo == 'diaMesAno' && row.tipo != 'btnIcon'">
                            {{ 
                                new Date(props.item[row.key]).getDate() + '/' + (new
                                Date(props.item[row.key]).getMonth() + 1) + '/' + new
                                Date(props.item[row.key]).getFullYear()
                            }}
                        </div>
                        <div v-if="typeof(props.item[row.key]) != 'object' && row.tipo == 'listaPersonalisada' && row.tipo != 'btnIcon'" :style="'color: ' + row.listaPersonalizada[props.item[row.key]]['cor'] ">
                            {{ 
                                row.listaPersonalizada[props.item[row.key]]["titulo"]
                            }}
                        </div>
                        <div v-if="typeof(props.item[row.key]) == 'string' && row.tipo != 'btnIcon'">
                            {{ props.item[row.key] }}
                        </div>
                        <div v-if="typeof(props.item[row.key]) == 'number' && row.tipo != 'btnIcon'">
                            {{ props.item[row.key] }}
                        </div>
                        <div v-if="row.tipo == 'btnIcon'" @click="rowClick(props.item)">
                            <BtnIcon :icone="row.icone" cor="info"/>
                        </div>
                    </td>
                </tr>
            </template>

            <template v-slot:bottom>
            </template>

        </v-data-table>
    </v-container>
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

// COMPONENTS
import BtnIcon from '@/components/Button/BtnIcon.vue';

export default defineComponent({
    data() {

        var reactiveVar = reactive(
            {
                listaStatus: {
                    0: { titulo: "Aguardando", cor: "#CBDC07" },
                    1: { titulo: "Alugado", cor: "#070FDC" },
                    2: { titulo: "Entregue", cor: "#0BDC07" },
                    3: { titulo: "Vencido", cor: "#FF6B00" },
                    4: { titulo: "Recusado", cor: "#DC0707" }
                }
            }
        );

        return {
            reactiveVar
        }
    },
    components: {
        BtnIcon
    },
    props: {
        itemsPorPagina: Number,
        tamanhoItems: Number,
        items: Object,
        cabecalho: Object,
        carregando: Boolean,
        search: String
    },
    methods: {
        rowClick: function (row) {
            this.$emit('rowClickTable', row);
        }
    },
    computed: {
        filter: {
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
.v-table {
    background: rgb(var(--v-theme-white))
}
tr {
    transition: 0.3s ease-in-out;
}
tr:hover {
    background: #0000000f;
}
</style>