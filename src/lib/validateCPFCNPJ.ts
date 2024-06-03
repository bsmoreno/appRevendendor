import validateCPF from "./validadeCPF";
import validateCNPJ from "./validateCNPJ";

export default class Validator {
    public static isCPF(cpf: unknown): boolean {
        return validateCPF(cpf);
    }


    public static isCNPJ(cnpj: unknown): boolean {
        return validateCNPJ(cnpj);
    }
}