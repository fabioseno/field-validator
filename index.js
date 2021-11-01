/*
    fieldValidator.validate(
        { 'name': [value, required, max(30), min(10)] },
        { 'group': [value, required] }
    )

    date
    cep,
    year
        
*/

const { cpf, cnpj } = require('cpf-cnpj-validator');

const settings = {
    requiredMessage: 'Campo obrigatório',
    arrayMessage: 'Campo deve ser do tipo Array',
    minlengthMessage: 'Campo possui tamanho menor que o tamanho mínimo',
    maxlengthMessage: 'Campo possui tamanho maior que o tamanho máximo',
    rangeMessage: 'Campo possui tamanho fora do limite permitido',
    guidMessage: 'Campo possui valor inválido',
    cpfMessage: 'Campo possui CPF inválido',
    cnpjMessage: 'Campo possui CNPJ inválido',
    cpfCnpjMessage: 'Campo possui CPF/CNPJ inválido',
    numberMessage: 'Campo possui número inválido'
};

function required(options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings.requiredMessage; }

    const requiredValidator = (value) => {
        let validation =
            value !== '' &&
            value !== undefined &&
            value !== null;

        if (Array.isArray(value) && value.length === 0) { validation = false; }

        return createValidationResponse(validation, options.message);
    };

    return requiredValidator;
}

function array(options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings.arrayMessage; }

    const arrayValidator = (value) => {
        return createValidationResponse(value && Array.isArray(value), options.message);
    };

    return arrayValidator;
}

function minlength(size, options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings.minlengthMessage; }

    const minlengthValidator = (value) => {
        let validation = !value || (typeof (value) === 'string' && value.length >= size);

        return createValidationResponse(validation, options.message);
    };

    return minlengthValidator;
}

function maxlength(size, options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings.maxlengthMessage; }

    const maxlengthValidator = (value) => {
        let validation = !value || (typeof (value) === 'string' && value.length <= size);

        return createValidationResponse(validation, options.message);
    };

    return maxlengthValidator;
}

function range(min, max, options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings.rangeMessage; }

    const maxlengthValidator = (value) => {
        let validation = !value || (typeof (value) === 'string' && value.length > min && value.length <= max);

        return createValidationResponse(validation, options.message);
    };

    return maxlengthValidator;
}

function guid(options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings.guidMessage; }

    const guidValidator = (value) => {
        let validation = !value || new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(value);

        return createValidationResponse(validation, options.message);
    };

    return guidValidator;
}

function cpfFn(options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings.cpfMessage; }

    const cpfValidator = (value) => {
        let validation = !value || cpf.isValid(value);

        return createValidationResponse(validation, options.message);
    };

    return cpfValidator;
}

function cnpjFn(options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings.cnpjMessage; }

    const cnpjValidator = (value) => {
        let validation = !value || cnpj.isValid(value);

        return createValidationResponse(validation, options.message);
    };

    return cnpjValidator;
}

function cpfCnpj(options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings.cpfCnpjMessage; }

    const cnpjValidator = (value) => {
        let validation = !value || cpf.isValid(value) || cnpj.isValid(value);

        return createValidationResponse(validation, options.message);
    };

    return cnpjValidator;
}

function number(options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (!options.message) { options.message = settings. numberMessage; }

    const numberValidator = (value) => {
        let validation = !value || new RegExp(/^[0-9]*$/).test(value);

        return createValidationResponse(validation, options.message);
    };

    return numberValidator;
}

function createValidationResponse(valid, message) {
    return ({
        isValid: valid,
        message: message
    });
}

function check(validations) {
    let response = { isValid: true, validations: {} };

    for (const field in validations) {
        let [value, ...rules] = validations[field];

        response.validations[field] = [];

        rules.forEach(rule => {
            if (rule.name.indexOf('Validator') < 0) { rule = rule() };

            let test = rule(value);
            const ruleName = rule.name.replace('Validator', '');

            if (!test.isValid) { response.isValid = false };

            response.validations[field][ruleName] = test;
        });
    }

    return response;
};

module.exports = {
    check,
    required,
    array,
    minlength,
    maxlength,
    range,
    guid,
    cpf: cpfFn,
    cnpj: cnpjFn,
    cpfCnpj,
    number
}