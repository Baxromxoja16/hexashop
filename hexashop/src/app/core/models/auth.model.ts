// export class Login {
//   // number!: null | string;
//   // password!: null | string;
//   // check!: boolean;
//   constructor(public number: string, public password: string, public check: boolean) { }
// }
export interface Login {
  number: string;
  password: string;
  check: boolean;
}
export interface TokenRes {
  refToken: string;
  token: string;
}
export class Register {
  // number!: string;
  // password!: string
  // name!: string
  constructor(public number: string, public password: string, public name: string) { }

}
