

    export default function Tela_login(){

        async function Validar(){
            var myHeaders = new Headers();
        myHeaders.append("Accept", "*/*");
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://20.226.73.46:57601/auth/singin/valid", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        }


return(
        <form action="">
            <label htmlFor="email">
               <p>Email:</p>     
                <input type="email" name="" id="" />
            </label>

            <label htmlFor="password">
                <p>Senha:</p>
                <input type="password" name="password" id="pass" />
            </label>
             
             <button>login</button>
            
        </form>
        
    )


}
    

