module.exports = {//exportando o schema
    type: "object",
    properties:{
        titulo: {type: "string", maxLength: 100, minLength: 5},//tamanho maximo e minimo.
        texto: {type: "string"}
    },
    required: ["titulo", "texto"],
    additionalProperties: false
};