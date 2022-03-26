import React from "react";
import Axios, { AxiosRequestConfig } from "axios";

interface IFetcherProps {
  config: AxiosRequestConfig;
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
}

export const useFetcher = (
  { config, onSuccess, onError }: IFetcherProps,
  fetchAtStart: boolean = true,
  loadingTimeOut: number = 25
) => {
  const [isLoading, setLoading] = React.useState<boolean>();

  const fetch = async (data?: any) => {
    setLoading(true);

    if (data) {
      config = {
        ...config,
        data,
      };
    }

    Axios.request(config)
      .then((response) => onSuccess(response.data))
      .catch((ex) => onError(ex.message))
      .finally(() => setTimeout(() => setLoading(false), loadingTimeOut));
  };

  React.useEffect(() => {
    if (fetchAtStart === true) fetch();
  }, []);

  return {
    fetch,
    isLoading,
  };
};
