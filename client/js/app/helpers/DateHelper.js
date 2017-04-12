class DateHelper {

    constructor(){
        throw new Error('Esta classe não pode ser instanciada');
    }

    static dataParaTexto(data) {//recebe um Date
        /*return data.getDate()+
               '/'+(data.getMonth() + 1)+
               '/'+data.getFullYear();*/
        /*usando template string ECMA6 e necessário uso de Crases `texto ${variável} fim.` 
        evita uso de concatenação da forma antiga deixando código mais limpo e legível*/
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;    
    }

    static textoParaData(texto) {
        /*pegando o valor de data do formulario formato string e utilizando o objeto
        Date dividindo data em partes passando numeros para o "new Date(number,number,number)"
        */ 
        /*let data = new Date(...//conceito do ECMA6 "..."spread operator interando o array
            texto
            .split('-')//momento da separação das strings pelo -
            .map((item, indice) => item - indice % 2)//solucão pegando o mês tirando -1 o construtor Date numbers começam de 0 por isso foi necessário efetuar -1 no mês
        );
        return data;*/
        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)) 
            throw new Error('Deve esta no formato dd/mm/aaaa');
        // veja que usamos no split '/' no lugar de '-'. Usamos `reverse` também para ficar ano/mes/dia.
        return new Date(...texto.split('/').reverse().map((item, indice) => item - indice % 2));//simplificando código.

    }

    
}