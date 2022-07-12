import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import LoginCheck from "@components/LoginCheck";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => await (await fetch(url)).json(),
      }}
    >
      <div className="mx-auto w-full max-w-lg">
        <LoginCheck />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
