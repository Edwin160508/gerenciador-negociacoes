class NegociacaoController {

    constructor(){ /*melhorando performace no 'DOM' guardando os seletores no construtor. evitando percorrer o DOM inúmeras vezes
        OU senja sumulando um 'cash útil' nesse caso ajudando na performace.*/
        var $ = document.querySelector.bind(document);//alias apelidando funções e armazenando em variáveis
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
        //this._mensagem =  new Mensagem();
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
    }

    adiciona(event){
        event.preventDefault();//cancelando comportamento padrão de um submit do formulário para não recarregar página
        
        /*Instanciando negociacao
        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );*/
        /*otimizando codigo, criando uma função para instanciar o objeto negociacao*/
        try{
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso!';
            //this._negociacoesView.update(this._listaNegociacoes);
            //this._mensagemView.update(this._mensagem); 
            this._limpaFormulario();
        }catch(erro) {
            this._mensagem.texto = erro;
        }  
    }

    importaNegociacoes(){
        var service = new NegociacaoService();
        service
        .obterNegociacoes()
        .then(negociacoes => negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociações do período importadas.'
        }))
        .catch(erro => this._mensagem.texto = erro);

        //chamando a classe Promise invocando metodo all
        /*Promise.all([
            service.obterNegociacoesDaSemana(), 
            service.obterNegociacoesDaSemanaAnterior(), 
            service.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            console.log(negociacoes);
            negociacoes.reduce((arrayAchatado, array)=>{ arrayAchatado.concat(array) },[])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso.';
        })
        .catch(erro => this._mensagem.texto = erro);
        */
        /*
        service.obterNegociacoesDaSemana()//promessa que vai retornar negociacoes da semana.
        .then(negociacoes => { 
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso.';
        })//caso seja comprida coloca na lista e da mensagem.
        .catch(erro => this._mensagem.texto = erro);//caso algo tenha dado errado informa o problema.    

        service.obterNegociacoesDaSemanaAnterior()
        .then(negociacoes => {//promessa que vai retornar negociações da semana anterior
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações da semana anterior obtidas com sucesso.';
        })
        .catch(erro => this._mensagem.texto = erro);//caso algo tenha dado errado

        service.obterNegociacoesDaSemanaRetrasada()
        .then(negociacoes=>{
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto= 'Negociações da semana retrasada obtidas com sucesso.';
        })
        .catch(erro => this._mensagem.texto = erro);
        */
        
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        //this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem.texto = 'Negociações removidas com sucesso!';
        //this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    /**Conceito de apenas a classe NegociacaoController ter acesso a esse metodo */
    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
    
    ordena(coluna){
        console.log(coluna);
        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverteOrdem();
        }else{
            this._listaNegociacoes.ordena((a,b)=> a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;        
    }
    //Edw1n!@#$%
    //Edw1n!@#$%
}