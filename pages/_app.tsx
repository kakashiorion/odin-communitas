import { createContext, useEffect, useState } from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { getCookie, getCookies } from "cookies-next";
import { getUserById } from "../util/ServerCalls";
import { UserType } from "../util/types";

export const UserContext = createContext<UserType|null>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserType|null>(null);

  const currentUser = getCookie("user");

  useEffect(() => {
    async function fetchData() {
      const cUser = await getUserById(getCookie("user")!.toString());
      return { cUser };
    }
    if( currentUser){
      fetchData().then((data) => {
        if (data.cUser) {
          setUser(data.cUser);
        }
      });
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
