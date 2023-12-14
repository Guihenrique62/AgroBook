const filtroLivros = async (books,setBookAcao,setBookComedia) => {
   let listAcao = books.filter((book) => book.categorias.indexOf("ação") > -1)
   let listComedia = books.filter((book) => book.categorias.indexOf("comedia") > -1)
  
   setBookAcao(listAcao)
   setBookComedia(listComedia)
 }

 export default filtroLivros;