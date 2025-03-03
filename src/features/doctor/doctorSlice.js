import { apiSlice } from "../api/apiSlice";

export const extendedDoctorSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: ({ searchTerm, status }) =>
        `/doctor?searchTerm=${searchTerm || ""}&approvedStatus=${status || ""}`,
      providesTags: (result) => {
        if (result?.data) {
          const doctors = result?.data;

          const doctorsTag = doctors.map(({ _id }) => ({
            type: "DOCTOR",
            id: _id,
          }));

          return [...doctorsTag, { type: "DOCTOR", id: "LIST" }];
        }
        return [{ type: "DOCTOR", id: "LIST" }];
      },
    }),
    updateDoctorStats: builder.mutation({
      query: ({ stats, doctorId }) => ({
        url: `/doctor/approve-doctor/${doctorId}`,
        method: "POST",
        body: stats,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "DOCTOR", id: arg.doctorId },
        { type: "DOCTOR", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetAllDoctorsQuery, useUpdateDoctorStatsMutation } =
  extendedDoctorSlice;
