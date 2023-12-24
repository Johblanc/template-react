import { TValidatorCallback } from "./ValidatorCallback.type";
import { TValidatorConfirmation } from "./ValidatorConfirmation.type";
import { EValidatorState } from "./ValidatorState.enum";

export class StringValidator {
  /** Le champ doit être un mail */
  static mail(state?: EValidatorState): TValidatorCallback<string> {
    return (val: string): TValidatorConfirmation => {
      const test = Boolean(
        val.match(
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
        )
      );
      return {
        valid: test,
        message: test ? "_" : `Le champ doit être un mail valide`,
        state: test ? undefined : state,
      };
    };
  }

  /** Le champ doit avoir au moins ? charactères */
  static minLenght(
    min: number,
    state?: EValidatorState
  ): TValidatorCallback<string> {
    return (val: string): TValidatorConfirmation => {
      const test = val.length >= min;
      return {
        valid: test,
        message: test
          ? "_"
          : `Il faut au moins ${min} charactère${min > 1 ? "s" : ""}`,
        state: test ? undefined : state,
      };
    };
  }

  /** Le champ doit avoir au maximum ? charactères */
  static maxLenght(
    max: number,
    state?: EValidatorState
  ): TValidatorCallback<string> {
    return (val: string): TValidatorConfirmation => {
      const test = val.length <= max;

      return {
        valid: test,
        message: test
          ? "_"
          : `Il faut au maximun ${max} charactère${max > 1 ? "s" : ""}`,
        state: test ? undefined : state,
      };
    };
  }

  /** Les deux champs mot de passe doivent être identiques */
  static samePasswords(
    otherPassword: string,
    state?: EValidatorState
  ): TValidatorCallback<string> {
    return (val: string): TValidatorConfirmation => {
      const test = val === otherPassword;

      return {
        valid: test,
        message: test ? "_" : `Les deux Mots des passe de sont pas concordants`,
        state: test ? undefined : state,
      };
    };
  }

  /** Vérification du Mot de Passe */
  static passwords(state?: EValidatorState): TValidatorCallback<string> {
    return (val: string): TValidatorConfirmation => {
      const test = Boolean(
        val.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      );

      return {
        valid: test,
        message: test ? "_" : `Le Mot de passe doit contenir au moins 8 caractères dont une minuscule,` +
        ` une majuscule, un chiffre et un symbole parmi : @ $ ! % * ? &.`,
        state: test ? undefined : state,
      };
    };
  }
}
