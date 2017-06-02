class Mensagem {
    /*constructor(texto=''){
        this._texto = texto;
    }*/
    // Prestando suporte ao navegador Edger 13 que não suporta recebimento de parametro Opcional
    constructor(texto){
        this._texto = texto || '';//se texto for undefined, o valor passa a ser '' -> String em branco
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}

