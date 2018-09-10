// tslint:disable-next-line
declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }

  interface Global {
    fetch?: any;
  }
}
