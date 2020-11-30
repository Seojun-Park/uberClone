export const typeDefs = ["type Query {\n  sayHello: String!\n  sayBye: Greeting!\n}\n\ntype Greeting {\n  text: String!\n  error: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  sayHello: string;
  sayBye: Greeting;
}

export interface Greeting {
  text: string;
  error: boolean;
}
