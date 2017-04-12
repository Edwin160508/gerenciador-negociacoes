class NegociacoesView extends View{

    constructor(elemento){
        super(elemento);
    }

    template(model){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onClick="negociacaoController.ordena('data')">DATA</th>
                    <th onClick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onClick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onClick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>
        
            <tbody>
                ${model.negociacoes.map(n => //processa cada objeto e alocando em um array
                     `
                        <tr>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>
                    `
                ).join('')/*join()converte o array em string e concatena com a String principal*/}
            </tbody>
        
            <tfoot>
                <tr>
                    <td colspan="3"></td>
                    <td>${//${} só pode esperar retorno de algo
                        model.volumeTotal
                        //model.negociacoes.reduce((total,n) => total+n.volume,0.0)
                        /*
                        model.negociacoes.reduce(function(total, n){
                            return total + n.volume;
                        }, 0.0)
                        
                        (function (){
                            let total = 0;
                            model.negociacoes.forEach(n => total+=n.volume);
                            return total;
                        })()//funcao anônima e invocando seguida "imiedatly invoked function IIFE" 
                         */
                    }</td>
                </tr>
            </tfoot>
        </table>`;
    }
    /*
    update(model){
        this._elemento.innerHTML = this._template(model);//convertendo a String em elemento DOM
    }
    */

}