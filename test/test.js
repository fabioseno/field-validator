'use strict';

var expect = require('chai').expect;
var validator = require('../index');

describe('#required', function () {

    describe('#success', function () {
        it('1) Should validate valid string', function () {
            const result = validator.check({
                name: ['Fábio', validator.required]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should validate not empty array', function () {
            const result = validator.check({
                name: [['item 1'], validator.required]
            });

            expect(result.isValid).to.equal(true);
        });

        it('3) Should validate true boolean value', function () {
            const result = validator.check({
                name: [true, validator.required]
            });

            expect(result.isValid).to.equal(true);
        });

        it('4) Should validate false boolean value', function () {
            const result = validator.check({
                name: [false, validator.required]
            });

            expect(result.isValid).to.equal(true);
        });

        it('5) Should ignore allowEmptyValue param', function () {
            const result = validator.check({
                name: [false, validator.required({ allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('1) Should validate empty value', function () {
            const result = validator.check({
                name: ['', validator.required]
            });

            expect(result.isValid).to.equal(false);
        });

        it('2) Should validate null value', function () {
            const result = validator.check({
                name: ['', validator.required]
            });

            expect(result.isValid).to.equal(false);
        });

        it('3) Should validate undefined value', function () {
            const result = validator.check({
                name: ['', validator.required]
            });

            expect(result.isValid).to.equal(false);
        });

        it('4) Should validate empty array', function () {
            const result = validator.check({
                name: [[], validator.required]
            });

            expect(result.isValid).to.equal(false);
        });

        it('5) Should validate error message', function () {
            let message = 'My field name is required';

            const result = validator.check({
                name: ['', validator.required({ message: message })]
            });

            expect(result.validations['name']['required'].message).to.equal(message);
        });

        it('6) Should validate error message: short form', function () {
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
        it('1) Should validate valid array', function () {
            const result = validator.check({
                name: [[], validator.array]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should ignore allowEmptyValue param', function () {
            const result = validator.check({
                name: [null, validator.array({ allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(false);
        });
    });

    describe('#fail', function () {
        it('1) Should validate invalid array', function () {
            const result = validator.check({
                name: ['', validator.array]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#minlength', function () {

    describe('#success', function () {
        it('1) Should validate valid string length', function () {
            const result = validator.check({
                name: ['abcd', validator.minlength(3)]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should consider allowEmptyValue param if passed false', function () {
            const result = validator.check({
                name: [null, validator.minlength(3, { allowEmptyValue: false })]
            });

            expect(result.isValid).to.equal(false);
        });

        it('3) Should consider allowEmptyValue param if passed true', function () {
            const result = validator.check({
                name: [null, validator.minlength(3, { allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(true);
        });

        it('4) Should consider allowEmptyValue true if ommitted', function () {
            const result = validator.check({
                name: [null, validator.minlength(3)]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('5) Should validate invalid string length', function () {
            const result = validator.check({
                name: ['abcd', validator.minlength(5)]
            });

            expect(result.isValid).to.equal(false);
        });
    });

});

describe('#maxlength', function () {

    describe('#success', function () {
        it('1) Should validate valid string length', function () {
            const result = validator.check({
                name: ['abcd', validator.maxlength(5)]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should consider allowEmptyValue param if passed false', function () {
            const result = validator.check({
                name: [null, validator.maxlength(3, { allowEmptyValue: false })]
            });

            expect(result.isValid).to.equal(false);
        });

        it('3) Should consider allowEmptyValue param if passed true', function () {
            const result = validator.check({
                name: [null, validator.maxlength(3, { allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(true);
        });

        it('4) Should consider allowEmptyValue true if ommitted', function () {
            const result = validator.check({
                name: [null, validator.maxlength(3)]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('1) Should validate invalid string length', function () {
            const result = validator.check({
                name: ['abcd', validator.maxlength(3)]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#range', function () {

    describe('#success', function () {
        it('1) Should validate valid string range', function () {
            const result = validator.check({
                name: ['abcd', validator.range(1, 4)]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should consider allowEmptyValue param if passed false', function () {
            const result = validator.check({
                name: [null, validator.range(1, 3, { allowEmptyValue: false })]
            });

            expect(result.isValid).to.equal(false);
        });

        it('3) Should consider allowEmptyValue param if passed true', function () {
            const result = validator.check({
                name: [null, validator.range(1, 3, { allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(true);
        });

        it('4) Should consider allowEmptyValue true if ommitted', function () {
            const result = validator.check({
                name: [null, validator.range(1, 3)]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('1) Should validate invalid string range', function () {
            const result = validator.check({
                name: ['abcd', validator.maxlength(3, 6)]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#guid', function () {

    describe('#success', function () {
        it('1) Should validate valid guid version 1', function () {
            const result = validator.check({
                name: ['ce2d6f72-3ab3-11ec-8d3d-0242ac130003', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should validate valid guid version 2', function () {
            const result = validator.check({
                name: ['c9b302a8-3ab4-11ec-9f54-047d7bb283ba', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });

        it('3) Should validate valid guid version 3', function () {
            const result = validator.check({
                name: ['9b655ea1-d778-3891-b93d-2747b6ee5ccc', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });

        it('4) Should validate valid guid version 4', function () {
            const result = validator.check({
                name: ['a807321b-f4e9-4754-9629-918a7852d37a', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });

        it('5) Should validate valid guid version 5', function () {
            const result = validator.check({
                name: ['59bbf6ae-7fc0-5e0a-8910-02998b2c53a4', validator.guid]
            });

            expect(result.isValid).to.equal(true);
        });

        it('6) Should consider allowEmptyValue param if passed false', function () {
            const result = validator.check({
                name: [null, validator.guid({ allowEmptyValue: false })]
            });

            expect(result.isValid).to.equal(false);
        });

        it('7) Should consider allowEmptyValue param if passed true', function () {
            const result = validator.check({
                name: [null, validator.guid({ allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(true);
        });

        it('8) Should consider allowEmptyValue true if ommitted', function () {
            const result = validator.check({
                name: [null, validator.guid()]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('1) Should validate invalid guid', function () {
            const result = validator.check({
                name: ['abcd', validator.guid]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#cpf', function () {

    describe('#success', function () {
        it('1) Should validate valid cpf', function () {
            const result = validator.check({
                name: ['26771901840', validator.cpf]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should validate valid cpf with mask', function () {
            const result = validator.check({
                name: ['267.719.018-40', validator.cpf]
            });

            expect(result.isValid).to.equal(true);
        });

        it('3) Should consider allowEmptyValue param if passed false', function () {
            const result = validator.check({
                name: [null, validator.cpf({ allowEmptyValue: false })]
            });

            expect(result.isValid).to.equal(false);
        });

        it('4) Should consider allowEmptyValue param if passed true', function () {
            const result = validator.check({
                name: [null, validator.cpf({ allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(true);
        });

        it('5) Should consider allowEmptyValue true if ommitted', function () {
            const result = validator.check({
                name: [null, validator.cpf()]
            });

            expect(result.isValid).to.equal(true);
        });
    });

    describe('#fail', function () {
        it('1) Should validate invalid cpf', function () {
            const result = validator.check({
                name: ['26771901844', validator.cpf]
            });

            expect(result.isValid).to.equal(false);
        });

        it('2) Should validate invalid cpf', function () {
            const result = validator.check({
                name: ['99999999999', validator.cpf]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#cnpj', function () {

    describe('#success', function () {
        it('1) Should validate valid cnpj', function () {
            const result = validator.check({
                name: ['90670203000188', validator.cnpj]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should validate valid cnpj with mask', function () {
            const result = validator.check({
                name: ['90.670.203/0001-88', validator.cnpj]
            });

            expect(result.isValid).to.equal(true);
        });

        it('3) Should consider allowEmptyValue param if passed false', function () {
            const result = validator.check({
                name: [null, validator.cnpj({ allowEmptyValue: false })]
            });

            expect(result.isValid).to.equal(false);
        });

        it('4) Should consider allowEmptyValue param if passed true', function () {
            const result = validator.check({
                name: [null, validator.cnpj({ allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(true);
        });

        it('5) Should consider allowEmptyValue true if ommitted', function () {
            const result = validator.check({
                name: [null, validator.cnpj()]
            });

            expect(result.isValid).to.equal(true);
        });

    });

    describe('#fail', function () {
        it('1) Should validate invalid cnpj', function () {
            const result = validator.check({
                name: ['90670203000182', validator.cnpj]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#cpfCnpj', function () {

    describe('#success', function () {
        it('1) Should validate valid cpf or cnpj', function () {
            const result = validator.check({
                name: ['90670203000188', validator.cpfCnpj]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should validate valid cnpj with mask', function () {
            const result = validator.check({
                name: ['90.670.203/0001-88', validator.cpfCnpj]
            });

            expect(result.isValid).to.equal(true);
        });

        it('3) Should validate valid cpf or cnpj', function () {
            const result = validator.check({
                name: ['66785017300', validator.cpfCnpj]
            });

            expect(result.isValid).to.equal(true);
        });

        it('4) Should consider allowEmptyValue param if passed false', function () {
            const result = validator.check({
                name: [null, validator.cpfCnpj({ allowEmptyValue: false })]
            });

            expect(result.isValid).to.equal(false);
        });

        it('5) Should consider allowEmptyValue param if passed true', function () {
            const result = validator.check({
                name: [null, validator.cpfCnpj({ allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(true);
        });

        it('6) Should consider allowEmptyValue true if ommitted', function () {
            const result = validator.check({
                name: [null, validator.cpfCnpj()]
            });

            expect(result.isValid).to.equal(true);
        });

    });

    describe('#fail', function () {
        it('7) Should validate invalid cnpj', function () {
            const result = validator.check({
                name: ['90670203000182', validator.cnpj]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#number', function () {

    describe('#success', function () {
        it('1) Should validate valid number', function () {
            const result = validator.check({
                name: ['2314234', validator.number]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should validate valid number', function () {
            const result = validator.check({
                name: ['004343', validator.number]
            });

            expect(result.isValid).to.equal(true);
        });

        it('3) Should consider allowEmptyValue param if passed false', function () {
            const result = validator.check({
                name: [null, validator.number({ allowEmptyValue: false })]
            });

            expect(result.isValid).to.equal(false);
        });

        it('4) Should consider allowEmptyValue param if passed true', function () {
            const result = validator.check({
                name: [null, validator.number({ allowEmptyValue: true })]
            });

            expect(result.isValid).to.equal(true);
        });

        it('5) Should consider allowEmptyValue true if ommitted', function () {
            const result = validator.check({
                name: [null, validator.number()]
            });

            expect(result.isValid).to.equal(true);
        });

    });

    describe('#fail', function () {
        it('1) Should validate invalid number', function () {
            const result = validator.check({
                name: ['aavcee', validator.number]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#email', function () {

    describe('#success', function () {
        it('1) Should validate valid email', function () {
            const result = validator.check({
                name: ['fabioseno@gmail.com', validator.email]
            });

            expect(result.isValid).to.equal(true);
        });

        it('2) Should validate valid email 2', function () {
            const result = validator.check({
                name: ['fabioseno@test.io', validator.email]
            });

            expect(result.isValid).to.equal(true);
        });

    });

    describe('#fail', function () {
        it('1) Should validate invalid email', function () {
            const result = validator.check({
                name: ['fabio@test.com2', validator.email]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});

describe('#multiple validations', function () {

    describe('#success', function () {
        it('1) Should validate all', function () {
            const result = validator.check({
                name: ['fabio akira', validator.required, validator.minlength(5), validator.maxlength(20)]
            });

            expect(result.isValid).to.equal(true);
        });

    });

    describe('#fail', function () {
        it('1) Should fail one validation', function () {
            const result = validator.check({
                name: ['fabio akira', validator.required, validator.minlength(5), validator.maxlength(10)]
            });

            expect(result.isValid).to.equal(false);
        });

    });

});