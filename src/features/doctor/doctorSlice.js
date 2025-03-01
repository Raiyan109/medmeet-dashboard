import { apiSlice } from "../api/apiSlice";

export const extendedDoctorSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: ({ searchTerm, status }) =>
        `/doctor?searchTerm=${searchTerm || ""}&approvedStatus=${status || ""}`,
      providesTags: ["DOCTOR"],
    }),
  }),
});

export const { useGetAllDoctorsQuery } = extendedDoctorSlice;
