import localStorageUtil from "../../utils/localstorageutils";
import { apiSlice } from "../api/apiSlice";

const token = localStorageUtil.getItem("token");

export const extendedAuthSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (searchTerms) => ({
        url: `/user?searchTerm=${searchTerms || ""}`,
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
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "user/verify-email",
        body: data,
        method: "POST",
      }),
    }),
    resetPass: builder.mutation({
      query: ({ values, resetToken }) => ({
        url: "/user/reset-password",
        body: values,
        method: "POST",
        headers: {
          Authorization: resetToken,
        },
      }),
    }),
  }),
});

export const {
  useLogInMutation,
  useGetAllUsersQuery,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPassMutation,
} = extendedAuthSlice;
