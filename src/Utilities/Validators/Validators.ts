import { FilesValidator } from "./FileValidators";
import { StringValidator } from "./StringValidators";

export class Validator {
  static String = StringValidator;
  static Files = FilesValidator;
}
