import useSWR from "swr";
import fetcher from "./fetcher";
import React, { useEffect, useState } from "react";

function useProfile() {
  const { data, error, mutate, isLoading, isValidating } = useSWR(
    "/api/customers/profile",
    fetcher
  );
  return { isLoading, mutate, data, error };
}

export default useProfile;
