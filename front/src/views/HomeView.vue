<!-- HTML -->
<template>
  <v-sheet color="transparent" elevated="0" v-for="(key, i) in reactiveVar.listCardFilterBooks" :key="i">

    <v-card color="transparent" elevated="0" variant="flat">

      <!-- TITULO -->
      <v-breadcrumbs class="text-ligth" :items="key.breadcrumbs">

        <!-- TITULO -->
        <template v-slot:title="{ item }">
          <div style="cursor: default;">{{ item.title }}</div>
        </template>

        <!-- DIVISOR -->
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>

      </v-breadcrumbs>

      <!-- LISTA DE CARD -->
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="(listBook, row) in key.books" :key="row" v-slot="{}">

          <!-- LIVRO CLICAVEL PARA ALUGAR -->
          <cardBookViewClick v-if="key.carregamento == false" :capa="key.books[row]['capa']"
            :titulo="key.books[row]['titulo']" class="ma-2 ml-8" :to="'/livro/' + key.books[row]['_id']" />

          <cardBookViewLoad v-if="key.carregamento == true" class="ma-2 ml-8" />

          <!-- NENHUM LIVRO REGISTRADO -->
          <!-- <cardBookViewNull v-if="!key.books[row]['titulo'] && key.carregando != true" class="ma-2 ml-8" /> -->

        </v-slide-group-item>
      </v-slide-group>

    </v-card>

  </v-sheet>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

// COMPONENT
import cardBookViewClick from '@/components/Card/BookViewClick.vue';
import cardBookViewNull from '@/components/Card/BookViewNull.vue';
import cardBookViewLoad from '@/components/Card/BookViewLoad.vue';

export default defineComponent({
  el: '#homeView',
  data() {

    // AXIOS - PARA REQUISIÇÃO DE API
    const axios = require('axios');
    axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

    var reactiveVar = reactive(
      {
        listCardFilterBooks: [
          { tag: "ação", books: [{}, {}, {}, {}, {}, {}], "breadcrumbs": [{ title: 'Ação', disabled: false, href: '' }], carregamento: true },
          { tag: "suspense", books: [{}, {}, {}, {}, {}, {}], "breadcrumbs": [{ title: 'Suspense', disabled: false, href: '' }], carregamento: true },
          { tag: "comedia", books: [{}, {}, {}, {}, {}, {}], "breadcrumbs": [{ title: 'Comedia', disabled: false, href: '' }], carregamento: true },
          { tag: "romance", books: [{}, {}, {}, {}, {}, {}], "breadcrumbs": [{ title: 'Romance', disabled: false, href: '' }], carregamento: true },
          { tag: "economia", books: [{}, {}, {}, {}, {}, {}], "breadcrumbs": [{ title: 'Economia', disabled: false, href: '' }], carregamento: true },
        ],
        listaApiLoad: true
      }
    );

    // PUXA LIVROS POR CATEGORIA
    const atualizarListaLivro = async (categoria, indice) => {

      let body = {
        "filter": {
          "titulo": { "$regex": "a", "$options": "i" },
          "categorias": categoria
        },
        "sort": {
          "_id": -1
        },
        "limit": 99
      }

      // HEADER
      let config = {
        method: 'POST',
        withCredentials: true,
        url: '/api/book/list_book',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        data: body
      };

      // RUN AXIOS
      await axios.request(config)
        .then((response) => {
          let listLivros = response.data.data_base.result;

          reactiveVar.listCardFilterBooks[indice]["books"] = [];
          reactiveVar.listCardFilterBooks[indice]["books"] = listLivros;
          reactiveVar.listCardFilterBooks[indice]["carregamento"] = false;
          reactiveVar.listaApiLoad = false;

        })
        .catch((error) => {
          console.log(error);
          reactiveVar.listaApiLoad = false;
        });

    }

    const atualizarListaLivroDemanda = async () => {
      for (let row in reactiveVar.listCardFilterBooks) {
        let listaAtual = reactiveVar.listCardFilterBooks[row]
        await atualizarListaLivro(listaAtual.tag, row);
        console.log(listaAtual.tag);
      }
    }

    // ATUALIZA A LISTA DE LIVRO POR DEMANDA
    atualizarListaLivroDemanda();

    return {
      reactiveVar
    }

  },
  components: {
    cardBookViewClick,
    cardBookViewNull,
    cardBookViewLoad
  }
});
</script>