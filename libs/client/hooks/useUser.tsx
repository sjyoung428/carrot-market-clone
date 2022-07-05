import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();
  const fetchUser = useCallback(async () => {
    const data = await (await fetch("/api/users/me")).json();
    if (!data.ok) return router.replace("/enter");
    setUser(data.profile);
  }, [router]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return user;
};

export default useUser;
