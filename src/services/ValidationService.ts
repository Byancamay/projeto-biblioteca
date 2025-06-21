import { CPFValidator } from "../utils/CPFValidator";

export class ValidationService {
    public static validateCpf(cpf: string): boolean {
        return CPFValidator.isValid(cpf);
    }
    
}