import { createContext, useEffect, useState } from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { getCookie } from "cookies-next";
import { getUserById } from "../util/ServerCalls";
import { UserType } from "../util/types";

export const UserContext = createContext<UserType|null>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserType|null>(null);

  useEffect(() => {
    async function fetchData() {
      const cUser = await getUserById(getCookie("user")!.toString());
      return { cUser };
    }
    fetchData().then((data) => {
      if (data.cUser) {
        setUser(data.cUser);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
