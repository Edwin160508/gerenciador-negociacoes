class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){

        return new Promise((resolve, reject) =>{
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro =>{
                    console.log(erro);
                    reject('Não foi possível obter negociações da semana.');
                });
        });    
            /*let xhr = new XMLHttpRequest();

            xhr.open('GET','negociacoes/semana');

            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        console.log('Obtendo as negociações do servidor.');
                        resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
                        
                    } else {
                        reject('Não foi possível obter negociações da semana.');
                        console.log(xhr.reponseText);//resposta do servidor em formato de texto.

                    }

                }
            };
            xhr.send();

        });
            */
        

        
    }

    obterNegociacoesDaSemanaAnterior(){

        return new Promise((resolve, reject)=>{
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro =>{
                    console.log(erro);
                    reject('Não foi possível obter negociações da semana anterior.');
                });
            });    
            /*let xhr = new XMLHttpRequest();
    
            xhr.open('GET','negociacoes/anterior');

            
            xhr.onreadystatechange = () => {
            
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        console.log('Obtendo as negociações do servidor.');
                        resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
                        
                    } else {
                        reject('Não foi possível obter negociações da semana anterior.');
                        console.log(xhr.reponseText);

                    }

                }
            };
            xhr.send();


        });
            */

    }

    obterNegociacoesDaSemanaRetrasada(){
         return new Promise((resolve, reject)=>{
             this._http
                 .get('negociacoes/retrasada')
                 .then(negociacoes => {
                     console.log(negociacoes);
                     resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                 })
                 .catch(erro =>{
                     console.log(erro);
                     reject('Não foi possível obter negociações da semana retrasada.');
                 });
            /*let xhr = new XMLHttpRequest();

            xhr.open('GET','negociacoes/retrasada');

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        console.log('Obtendo as negociações do servidor.');
                        resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
                        
                    } else {
                        reject('Não foi possível obter negociações da semana retrasada.');
                        console.log(xhr.reponseText);
                    }
                }
            };
            xhr.send();
            */
        });
    }

    obterNegociacoes() {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]).then(periodos => {

                let negociacoes = periodos
                    .reduce((dados, periodo) => dados.concat(periodo), [])
                    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

                resolve(negociacoes);

            }).catch(erro => reject(erro));
        });
    } 
}