import React from "react";
import { NextRouter, useRouter } from "next/router";

export const logout = async (router: NextRouter) => {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  } catch (error) {
    console.error(error);
  }
};

export const useUnauthorized = (status: number) => {
  const router = useRouter();

  React.useEffect(() => {
    if (status === 403) {
      logout(router);
    }
  }, [status, router]);
};
