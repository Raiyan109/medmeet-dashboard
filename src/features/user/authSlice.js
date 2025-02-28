import localStorageUtil from "../../utils/localstorageutils";
import { apiSlice } from "../api/apiSlice";

const token = 9;

export const extendedAuthSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUSers: builder.query({
      query: () => ({
        url: "/user",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    logIn: builder.mutation({
      query: (credentials) => {
        return {
          url: "/user/login",
          method: "POST",
          body: credentials,
        };
      },
      transformResponse: (response) => {
        localStorageUtil.setItem("token", response?.data?.accessToken);

        return response;
      },
    }),
  }),
});

export const { useLogInMutation } = extendedAuthSlice;
