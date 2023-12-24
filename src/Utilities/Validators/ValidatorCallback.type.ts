import { TValidatorConfirmation } from "./ValidatorConfirmation.type";

export type TValidatorCallback<TVal> = (val: TVal) => TValidatorConfirmation;

