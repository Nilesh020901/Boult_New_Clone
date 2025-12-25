"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function Provider({ children }) {
  const [message, setMessage] = useState();
  const [userDetail, setUserDetail] = useState(null);

  // ✅ Get email safely from localStorage
  const email =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))?.email
      : null;

  // ✅ Convex query (AUTO runs when email exists)
  const convexUser = useQuery(
    api.users.GetUser,
    email ? { email } : "skip"
  );

  useEffect(() => {
    if (convexUser) {
      setUserDetail(convexUser);
    }
  }, [convexUser]);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessageContext.Provider value={{ message, setMessage }}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </NextThemesProvider>
        </MessageContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default Provider;
