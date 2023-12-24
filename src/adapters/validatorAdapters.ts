import validator from 'validator';

export abstract class ValidatorAdapters {
  public static isEmail(email: string): boolean {
    return validator.isEmail(email);
  }

  public static isURL(url: string): boolean {
    return validator.isURL(url);
  }
}
