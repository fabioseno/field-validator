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
    numberMessage: 'Campo possui número inválido',
    emailMessage: 'Campo possui e-mail inválido'
};

function setDefaultSettings(options = {}) {
    if (typeof options === 'string') { options = { message: options } }
    if (typeof options.allowEmptyValue !== 'boolean') { options.allowEmptyValue = true }

    return options;
}

function isEmpty(value) {
    return (value === '' || isNull(value));
}

function isNull(value) {
    return (value === undefined || value === null);
}

function required(ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.requiredMessage;

    const requiredValidator = (globalOptions = {}) => {
        return (value) => {
            let isValid = !isEmpty(value);

            if (Array.isArray(value) && value.length === 0) { isValid = false; }

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return requiredValidator;
}

function array(ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.arrayMessage;

    const arrayValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isNull(value))
                || (value && Array.isArray(value));

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return arrayValidator;
}

function minlength(size, ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.minlengthMessage;

    const minlengthValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isEmpty(value))
                || (typeof (value) === 'string' && value.length >= size);

            return createValidationResponse(isValid, ruleOptions);
        };
    }

    return minlengthValidator;
}

function maxlength(size, ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.maxlengthMessage;

    const maxlengthValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isEmpty(value))
                || (typeof (value) === 'string' && value.length <= size);

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return maxlengthValidator;
}

function range(min, max, ruleOptions = {}) {
    options = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.rangeMessage;

    const rangeValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isEmpty(value))
                || (typeof (value) === 'string' && value.length > min && value.length <= max);

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return rangeValidator;
}

function guid(ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.guidMessage;

    const guidValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isEmpty(value))
                || new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(value);

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return guidValidator;
}

function cpfFn(ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.cpfMessage;

    const cpfValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isEmpty(value))
                || cpf.isValid(value);

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return cpfValidator;
}

function cnpjFn(ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.cnpjMessage;

    const cnpjValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isEmpty(value))
                || cnpj.isValid(value);

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return cnpjValidator;
}

function cpfCnpj(ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.cpfCnpjMessage;

    const cpfCnpjValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isEmpty(value))
                || cpf.isValid(value) || cnpj.isValid(value);

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return cpfCnpjValidator;
}

function number(ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.numberMessage;

    const numberValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isEmpty(value))
                || new RegExp(/^[0-9]*$/).test(value);

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return numberValidator;
}

function email(ruleOptions = {}) {
    ruleOptions = setDefaultSettings(ruleOptions);

    ruleOptions.message = ruleOptions.message || settings.emailMessage;

    const emailValidator = (globalOptions) => {
        return (value) => {
            const isValid = ((globalOptions.allowEmptyValue || ruleOptions.allowEmptyValue) && isEmpty(value))
                || new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(value).toLowerCase());

            return createValidationResponse(isValid, ruleOptions);
        };
    };

    return emailValidator;
}

function createValidationResponse(valid, options) {
    options.isValid = valid;

    if (valid) { delete options.message; }
    delete options.allowEmptyValue;

    return options;
}

function check(validations) {
    let response = { isValid: true, validations: {} };

    for (const field in validations) {
        let [value, ...rules] = validations[field];
        let globalOptions = {};
        let ignoreLastRule = false;

        response.validations[field] = {};

        if (typeof rules[rules.length - 1] === 'object') {
            globalOptions = rules[rules.length - 1];
            ignoreLastRule = true;
        }

        rules.forEach((rule, index) => {
            let validationWithLocalSettings = rule;

            if (!ignoreLastRule || index !== rules.length - 1) {
                if (rule.name.indexOf('Validator') < 0) { validationWithLocalSettings = rule() };

                let validationWithGlobalSettings = validationWithLocalSettings(globalOptions);

                let test = validationWithGlobalSettings(value);
                const ruleName = rule.name.replace('Validator', '');

                if (!test.isValid) { response.isValid = false };

                response.validations[field][ruleName] = test;
            }
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
    number,
    email
}