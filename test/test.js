'use strict';

var expect = require('chai').expect;
var validator = require('../index');

describe('#required', function () {

    describe('#success', function () {
        it('should validate valid string', function () {
            const result = validator.check({
                name: ['Fábio', validator.required]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate not empty array', function () {
            const result = validator.check({
                name: [['item 1'], validator.required]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate true boolean value', function () {
            const result = validator.check({
                name: [true, validator.required]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate false boolean value', function () {
            const result = validator.check({
                name: [false, validator.required]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('should validate empty value', function () {
            const result = validator.check({
                name: ['', validator.required]
            });

            expect(result.isValid).to.equal(false);
        });

        it('should validate null value', function () {
            const result = validator.check({
                name: ['', validator.required]
            });

            expect(result.isValid).to.equal(false);
        });

        it('should validate undefined value', function () {
            const result = validator.check({
                name: ['', validator.required]
            });

            expect(result.isValid).to.equal(false);
        });

        it('should validate empty array', function () {
            const result = validator.check({
                name: [[], validator.required]
            });

            expect(result.isValid).to.equal(false);
        });

        it('should validate error message', function () {
            let message = 'My field name is required';

            const result = validator.check({
                name: ['', validator.required({ message: message })]
            });

            expect(result.validations['name']['required'].message).to.equal(message);
        });

        it('should validate error message: short form', function () {
            let message = 'My field name is required';

            const result = validator.check({
                name: ['', validator.required(message)]
            });

            expect(result.validations['name']['required'].message).to.equal(message);
        });
    });

});

describe('#array', function () {

    describe('#success', function () {
        it('should validate valid array', function () {
            const result = validator.check({
                name: [[], validator.array]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('should validate invalid array', function () {
            const result = validator.check({
                name: ['', validator.array]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#minlength', function () {

    describe('#success', function () {
        it('should validate valid string length', function () {
            const result = validator.check({
                name: ['abcd', validator.minlength(3)]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('should validate invalid string length', function () {
            const result = validator.check({
                name: ['abcd', validator.minlength(5)]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#maxlength', function () {

    describe('#success', function () {
        it('should validate valid string length', function () {
            const result = validator.check({
                name: ['abcd', validator.maxlength(5)]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('should validate invalid string length', function () {
            const result = validator.check({
                name: ['abcd', validator.maxlength(3)]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#range', function () {

    describe('#success', function () {
        it('should validate valid string range', function () {
            const result = validator.check({
                name: ['abcd', validator.range(1, 4)]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('should validate invalid string range', function () {
            const result = validator.check({
                name: ['abcd', validator.maxlength(3, 6)]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#guid', function () {

    describe('#success', function () {
        it('should validate valid guid version 1', function () {
            const result = validator.check({
                name: ['ce2d6f72-3ab3-11ec-8d3d-0242ac130003', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate valid guid version 2', function () {
            const result = validator.check({
                name: ['c9b302a8-3ab4-11ec-9f54-047d7bb283ba', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate valid guid version 3', function () {
            const result = validator.check({
                name: ['9b655ea1-d778-3891-b93d-2747b6ee5ccc', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate valid guid version 4', function () {
            const result = validator.check({
                name: ['a807321b-f4e9-4754-9629-918a7852d37a', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate valid guid version 5', function () {
            const result = validator.check({
                name: ['59bbf6ae-7fc0-5e0a-8910-02998b2c53a4', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('should validate invalid guid', function () {
            const result = validator.check({
                name: ['abcd', validator.guid]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#cpf', function () {

    describe('#success', function () {
        it('should validate valid cpf', function () {
            const result = validator.check({
                name: ['26771901840', validator.cpf]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate valid cpf with mask', function () {
            const result = validator.check({
                name: ['267.719.018-40', validator.cpf]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('should validate invalid cpf', function () {
            const result = validator.check({
                name: ['26771901844', validator.cpf]
            });

            expect(result.isValid).to.equal(false);
        });

        it('should validate invalid cpf', function () {
            const result = validator.check({
                name: ['99999999999', validator.cpf]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#cnpj', function () {

    describe('#success', function () {
        it('should validate valid cnpj', function () {
            const result = validator.check({
                name: ['90670203000188', validator.cnpj]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate valid cnpj with mask', function () {
            const result = validator.check({
                name: ['90.670.203/0001-88', validator.cnpj]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('should validate invalid cnpj', function () {
            const result = validator.check({
                name: ['90670203000182', validator.cnpj]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#cpfCnpj', function () {

    describe('#success', function () {
        it('should validate valid cpf or cnpj', function () {
            const result = validator.check({
                name: ['90670203000188', validator.cpfCnpj]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate valid cnpj with mask', function () {
            const result = validator.check({
                name: ['90.670.203/0001-88', validator.cpfCnpj]
            });

            expect(result.isValid).to.equal(true);
        });

        it('should validate valid cpf or cnpj', function () {
            const result = validator.check({
                name: ['66785017300', validator.cpfCnpj]
            });

            expect(result.isValid).to.equal(true);
        });
        
    });

    describe('#fail', function () {
        it('should validate invalid cnpj', function () {
            const result = validator.check({
                name: ['90670203000182', validator.cnpj]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#number', function () {

    describe('#success', function () {
        it('should validate valid number', function () {
            const result = validator.check({
                name: ['2314234', validator.number]
            });

            expect(result.isValid).to.equal(true);
        });
        
        it('should validate valid number', function () {
            const result = validator.check({
                name: ['004343', validator.number]
            });

            expect(result.isValid).to.equal(true);
        });
        
    });

    describe('#fail', function () {
        it('should validate invalid number', function () {
            const result = validator.check({
                name: ['aavcee', validator.number]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});