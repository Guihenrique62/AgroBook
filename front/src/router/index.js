import { createRouter, createWebHistory } from 'vue-router'

const axios = require('axios');
const appName = "Agrobook";

axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

const routes = [

  // [ INICIO ] ROTAS HOME
  { path: "/", name: "Ínicio", component: () => import("@/layout/defaultNavLivros.vue"), children: [{ path: '/', name: 'Ínicio', component: () => import(`@/views/HomeView.vue`) }], meta: { requiresAuth: true, title: `${appName} - Iníco` } },
  // [ FIM ] ROTAS HOME

  // [ INICIO ] ROTAS LOGIN
  { path: "/entrar", name: "Entrar na Agrobook", component: () => import("@/layout/defaultNotNav.vue"), children: [{ path: '/entrar', name: 'Entrar na Agrobook', component: () => import(`@/views/LoginView.vue`) }], meta: { requiresAuth: false, title: `${appName} - Entrar` } },
  // [ FIM ] ROTAS LOGIN

  // [ INICIO ] ROTAS PEDIDOS
  { path: "/pedidos", name: "Seus pedidos", component: () => import("@/layout/defaultNavPedidos.vue"), children: [{ path: '/pedidos', name: 'Seus pedidos', component: () => import(`@/views/OrderView.vue`) }], meta: { requiresAuth: true, title: `${appName} - Pedidos` } },
  // [ FIM ] ROTAS PEDIDOS

  // [ INICIO ] ROTAS ESTOQUE
  { path: "/estoque", name: "Estoque de livros", component: () => import("@/layout/defaultNavLivros.vue"), children: [{ path: '/estoque', name: 'Estoque de livros', component: () => import(`@/views/StockView.vue`) }], meta: { requiresAuth: true, title: `${appName} - Estoque` } },
  // [ FIM ] ROTAS ESTOQUE

  // [ INICIO ] ROTAS LIVROS
  { path: "/livro/:id", name: "Detalhes sobre o livro", component: () => import("@/layout/default.vue"), children: [{ path: '/livro/:id', name: 'Detalhes sobre o livro', component: () => import(`@/views/BookView.vue`) }], meta: { requiresAuth: true, title: `${appName} - Detalhe sobre o livro` } },
  // [ FIM ] ROTAS LIVROS

  // [ INICIO ] ROTAS MINHA BIBLIOTECA
  { path: "/biblioteca", name: "Minha biblioteca", component: "MyLibraryView", meta: { requiresAuth: true, title: `${appName} - Minha biblioteca` } },
  // [ FIM ] ROTAS MINHA BIBLIOTECA

  // [ INICIO ] ROTAS USUARIOS
  { path: "/usuarios", name: "Lista de usuarios cadastrados", component: () => import("@/layout/default.vue"), children: [{ path: '/usuarios', name: 'Lista de usuarios cadastrados', component: () => import(`@/views/UsersView.vue`) }], meta: { requiresAuth: true, title: `${appName} - Usuários` } },
  // [ FIM ] ROTAS USUARIOS

  // [ INICIO ] ROTAS 404
  { path: "/:pathMatch(.*)", name: "Não Encontrada", component: "ErroView", meta: { title: `${appName} - Página não encontrada` } },
  // [ FIM ] ROTAS 404

];

// const routes = routerOptions.map(route => {
//   return {
//     ...route,
//     component: () => import(`../views/${route.component}.vue`)
//   };
// });

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// VALIDA TODAS AS ROTAS
router.beforeEach(async (to, from) => {

  sessionStorage.setItem('to', JSON.stringify(to));
  sessionStorage.setItem('from', JSON.stringify(from));

  const validLogin = async () => {

    // BODY
    let data = JSON.stringify();

    // HEADERS
    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      withCredentials: true,
      url: '/auth/singin/valid',
      headers: { 'Content-Type': 'application/json' },
      data: data
    };

    // RUN AXIOS
    const result = await axios.request(config)

    try {
      localStorage.setItem('auth', JSON.stringify(result.data));
    } catch (x) {
      localStorage.setItem('auth', JSON.parse(result.data));
    }

    return result;

  }

  if (to.meta.requiresAuth) {

    try {

      var result = await validLogin();

    } catch (x) {
      Toast.fire(x.response.data.mensagem, "", "error");
      return {
        path: '/entrar',
        query: { redirect: to.fullPath },
      }
    }

  }

})

export default router
