class HttpService{
    get(url) {
        return new Promise((resolve, reject)=>{

            var xhr = new XMLHttpRequest();

            xhr.open('GET', url);
            /**Configurações de requisição */
            xhr.onreadystatechange = () => {
                /*
                    0: requisição ainda não iniciada

                    1: conexão com o servidor estabelecida

                    2: requisição recebida

                    3: processando requisição

                    4: requisição concluída e a resposta esta pronta
                */  
                if(xhr.readyState == 4) {
                    
                    if(xhr.status == 200) {   
                        
                        resolve(JSON.parse(xhr.responseText));  
                    } else {
                        
                        reject(xhr.responseText);
                    }
                }
            };
            /**Fim Configurações de requisição */
            xhr.send();
        });
    }

    post(url, dado){
        return new Promise((resolve, reject)=>{
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            /**Configurações de requisição */
            xhr.onreadystatechange = () => {
                /*
                    0: requisição ainda não iniciada

                    1: conexão com o servidor estabelecida

                    2: requisição recebida

                    3: processando requisição

                    4: requisição concluída e a resposta esta pronta
                */
                if(xhr.readyState == 4){
                    /*
                        1xx: informativo

                        2xx: sucesso 

                        3xx: redirecionado

                        4xx: Erro na requisição no lado cliente

                        5xx: Resposta mau sucedida no lado do servidor
                    */
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject(xhr.responseText);
                    }
                }
            };
            /**Fim Configurações de requisição */
            // usando JSON.stringifly para converter objeto em uma string no formato JSON.
            xhr.send(JSON.stringify(dado));
        });
    }
}