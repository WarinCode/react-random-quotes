export interface Options {
    readonly method: "GET" | "POST";
    readonly url: string;
    readonly headers: {
      "X-RapidAPI-Key": string;
      "X-RapidAPI-Host": string;
    };
  }
  
export interface Response {
    id: number;
    originator: {
      id: number;
      language_code: string;
      description: string;
      master_id: number;
      name: string;
      url: string;
    };
    language_code: string;
    content: string;
    url: string;
    tags: string[];
  }
  
export type Config = Options;
export type Quotes = Response;