# Entry validators

## Typage

### EValidatorState

new ```src/Utilities/Validators/ValidatorState.enum.ts```

```ts
export enum EValidatorState {
  good = "good",
  care = "care",
  bad = "bad",
}
```

### TValidatorConfirmation

new ```src/Utilities/Validators/ValidatorConfirmation.type.ts```

```ts
import { EValidatorState } from "./ValidatorState.enum";

export type TValidatorConfirmation = { valid: boolean; message: string, state? : EValidatorState };
```

### TValidatorCallback

new ```src/Utilities/Validators/ValidatorCallback.type.ts```

```ts
import { TValidatorConfirmation } from "./ValidatorConfirmation.type";

export type TValidatorCallback<TVal> = (val: TVal) => TValidatorConfirmation;
```

## StringValidator

new ```src/Utilities/Validators/StringValidators.ts```

```ts
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
```


## Validator

new ```src/Utilities/Validators/Validators.ts```

```ts
import { StringValidator } from "./StringValidators";

export class Validator {
  static String = StringValidator
}
```