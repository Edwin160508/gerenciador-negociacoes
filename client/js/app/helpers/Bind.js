class Bind{//associa o model com a view
    constructor(model, view, ...props){
        var proxy = ProxyFactory.create(model, props, model =>
            view.update(model));
        
        view.update(model);

        return proxy;//particularidade javascript que tem construtor que retorna.

    }
}