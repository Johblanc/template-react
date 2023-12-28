import { TValidatorCallback } from "./ValidatorCallback.type";
import { TValidatorConfirmation } from "./ValidatorConfirmation.type";
import { EValidatorState } from "./ValidatorState.enum";

export class FilesValidator {

  /** Le champ ne doit pas être vide */
  static notEmpty(state?: EValidatorState): TValidatorCallback<FileList | null> {
    return (val: FileList | null): TValidatorConfirmation => {
      let test =  val !== null && val.length !== 0
      return {
        valid: test,
        message: test ? "_" : `Le champ ne doit pas être vide`,
        state: test ? undefined : state,
      };
    };
  }
  
  /** Le champ doit être une image */
  static images(state?: EValidatorState): TValidatorCallback<FileList | null> {
    return (val: FileList | null): TValidatorConfirmation => {
      let test = true;
      if (val !== null){
        for (let i = 0; i < val.length; i += 1) {
          const item = val.item(i);
          test = test && (item === null || item.type.split("/")[0] === "image");
        }
      }
      return {
        valid: test,
        message: test ? "_" : `Le champ doit être une image`,
        state: test ? undefined : state,
      };
    };
  }
}
