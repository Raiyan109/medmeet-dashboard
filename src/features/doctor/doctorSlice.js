import { apiSlice } from "../api/apiSlice";

export const extendedDoctorSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: {},
    }),
  }),
});
