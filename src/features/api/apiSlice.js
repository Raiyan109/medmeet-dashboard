import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import localStorageUtil from "../../utils/localstorageutils";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorageUtil.getItem("token");

      if (
        !token &&
        !["logIn", "forgotPassword", "verifyEmail", "resetPass"].includes(
          endpoint
        )
      ) {
        console.log(endpoint);
        throw new Error("Authorization token is missing");
      }

      if (
        token &&
        !["logIn", "forgotPassword", "verifyEmail", "resetPass"].includes(
          endpoint
        )
      ) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "DOCTOR",
    "USER",
    "DOCTOR_REQ",
    "APPOINTMENTS",
    "CATEGORIES",
    "SETTINGS",
    "MEDICINES",
  ],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => "/setting",
      providesTags: ["SETTINGS"],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/setting/update-setting",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SETTINGS"],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = apiSlice;
