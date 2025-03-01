import localStorageUtil from "../../utils/localstorageutils";
import { apiSlice } from "../api/apiSlice";

const token = localStorageUtil.getItem("token");

export const extendedAuthSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUSers: builder.query({
      query: (searchTerms) => ({
        url: `/user?searchTerm=${searchTerms || ""}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["USER"],
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
    forgotPassword: builder.mutation({
      query: (uniqueId) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: uniqueId,
      }),
    }),
  }),
});

export const {
  useLogInMutation,
  useGetAllUSersQuery,
  useForgotPasswordMutation,
} = extendedAuthSlice;
