import { EValidatorState } from "./ValidatorState.enum";

export type TValidatorConfirmation = { valid: boolean; message: string, state? : EValidatorState };