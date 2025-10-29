export const authFetch = async (
  url: string,
  options = {},
  isRetry = false
): Promise<Response | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options as any).headers,
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 && !isRetry) {
    console.log("Access token expired, attempting to refresh...");

    const refreshRes = await fetch("http://localhost:5000/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    console.log("authFetch response status:", refreshRes.status);

    if (refreshRes.ok) {
      const refreshData = await refreshRes.json();

      localStorage.setItem("token", refreshData.accessToken);

      console.log("new token acquired:", refreshData.accessToken);

      return await authFetch(url, options, true);
    } else {
      localStorage.removeItem("token");

      window.location.href = "/login";

      return null;
    }
  } else {
    return res;
  }
};
