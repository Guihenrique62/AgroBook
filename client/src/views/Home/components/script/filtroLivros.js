const filtroLivros = async (books,setBookAcao,setBookComedia,setBookRomance) => {
   let listAcao = books.filter((book) => book.categorias.indexOf("ação") > -1)
   let listComedia = books.filter((book) => book.categorias.indexOf("comedia") > -1)
   let listRomance = books.filter((book) => book.categorias.indexOf("romance") > -1)
   setBookAcao(listAcao)
   setBookComedia(listComedia)
   setBookRomance(listRomance)
 }

 export default filtroLivros;