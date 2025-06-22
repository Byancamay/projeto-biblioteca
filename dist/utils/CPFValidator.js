"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPFValidator = void 0;
class CPFValidator {
    static isValid(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        const calculateDigit = (slice, factor) => {
            let sum = 0;
            for (let i = 0; i < slice.length; i++) {
                sum += parseInt(slice[i]) * (factor - i);
            }
            const remainder = (sum * 10) % 11;
            return (remainder === 10 || remainder === 11) ? 0 : remainder;
        };
        const digit1 = calculateDigit(cpf.substring(0, 9), 10);
        if (digit1 !== parseInt(cpf[9])) {
            return false;
        }
        const digit2 = calculateDigit(cpf.substring(0, 10), 11);
        if (digit2 !== parseInt(cpf[10])) {
            return false;
        }
        return true;
    }
}
exports.CPFValidator = CPFValidator;
