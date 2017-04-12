class ProxyFactory {
    static create(objeto, props, acao){
       return new Proxy(objeto,{
            get(target, prop, receiver){
                // perguntando se adiciona e esvazia tem prop, perguntando se adiciona e esvazia são funcoes...
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])){
                    return function(){
                        console.log(`interceptando ${prop}`);
                        var retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){
                var retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)){
                    acao(target);
                }
                return retorno;
                
            }
        });
    }

    static _ehFuncao(func){
        return typeof(func) == typeof(Function);
    }
}