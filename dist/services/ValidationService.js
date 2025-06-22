"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const CPFValidator_1 = require("../utils/CPFValidator");
class ValidationService {
    static validateCpf(cpf) {
        return CPFValidator_1.CPFValidator.isValid(cpf);
    }
}
exports.ValidationService = ValidationService;
