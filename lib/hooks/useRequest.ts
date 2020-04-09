import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useSWR, { ConfigInterface, responseInterface } from "swr";

export type GetRequest = AxiosRequestConfig | null;

interface IReturn<Data, Error>
  extends Pick<
    responseInterface<AxiosResponse<Data>, Error>,
    "isValidating" | "revalidate" | "error"
  > {
  data?: Data;
  response?: AxiosResponse<Data>;
}

export interface IConfig<Data = unknown, Error = unknown>
  extends Omit<ConfigInterface<AxiosResponse<Data>, Error>, "initialData"> {
  initialData?: Data;
}

const useRequest = <Data = unknown, Error = unknown>(
  request: GetRequest,
  { initialData, ...config }: IConfig<Data, Error> = {}
): IReturn<Data, Error> => {
  const { data: response, error, isValidating, revalidate } = useSWR<
    AxiosResponse<Data>,
    Error
  >(request && JSON.stringify(request), () => axios(request!), {
    ...config,
    initialData: initialData && {
      status: 200,
      statusText: "InitialData",
      config: request!,
      headers: {},
      data: initialData,
    },
  });

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
  };
};

export default useRequest;
