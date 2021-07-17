module.exports = {//exportando o schema
    type: "object",
    properties:{
        email: {type: "string", format: "email"},//formato de email
        senha: {type: "string"}
    },
    required: ["email", "senha"],
    additionalProperties: false
};