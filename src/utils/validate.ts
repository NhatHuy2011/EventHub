export class Validate {
    static email(mail: string): boolean {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegex.test(mail);
    }
  
    static password(val: string): boolean {
      return val.length >= 6;
    };
}
  