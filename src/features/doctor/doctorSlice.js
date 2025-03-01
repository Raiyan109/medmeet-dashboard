import { apiSlice } from "../api/apiSlice";

export const extendedDoctorSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: () => {},
    }),
  }),
});

export const { useGetAllDoctorsQuery } = extendedDoctorSlice;
