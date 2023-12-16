import { JSX, useState, useEffect , useCallback } from "react";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { Options , Quotes , Response , Config } from "./model/model"
import Content from "./components/Card";

// const { env: { URL, X_RapidAPI_Key, X_RapidAPI_Host }}: NodeJS.Process = process;

const options: Options = {
  method: "GET",
  url: "https://quotes15.p.rapidapi.com/quotes/random/",
  headers: {
    "X-RapidAPI-Key": "033424c2e0msh75b7c318f2705bbp1e00b1jsne4c89a49621a",
    "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
  },
};

const App = (): JSX.Element => {
  const [quotes, setQuotes] = useState<Quotes>({
    id: 0,
    originator: {
      id: 0,
      language_code: "",
      description: "",
      master_id: 0,
      name: "",
      url: "",
    },
    language_code: "",
    content: "",
    url: "",
    tags: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);

  const controller: AbortController = new AbortController();
  const fetchData = async (): Promise<void> => {
    try {
      setLoading((l: boolean): boolean => !l);
      const response: AxiosResponse<Response, Config> = await axios.request(
        options
      );
      const { data, status }: AxiosResponse<Response, Config> = response;
      if (status === HttpStatusCode.Ok) {
        setQuotes(data);
      } else {
        throw new Error("something went wrong!");
      }
    } catch (err: any) {
      throw new Error(err);
    } finally {
      setLoading((l: boolean): boolean => !l);
      setClick(false);
      console.log(quotes);
    }
  };

  const callback:() => Promise<void> = useCallback(fetchData , [click]);

  useEffect(() => {
    callback();

    return (): void => {
      controller.abort();
    };
  }, [click]);

  return (
    <>
      <Content content={quotes} loading={loading} setClick={setClick} />
    </>
  );
};

export default App;
