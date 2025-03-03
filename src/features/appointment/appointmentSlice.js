import { apiSlice } from "../api/apiSlice";

export const extendedAppointmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointments: builder.query({
      query: (searchTerm) =>
        `/appointment?userName=${searchTerm.userName || ""}&doctorName=${
          searchTerm.doctorName || ""
        }&date=${searchTerm.date || ""}`,
      providesTags: (result) => {
        if (result?.data) {
          const appos = result.data;

          const apposTags = appos.map(({ _id }) => ({
            type: "APPOINTMENTS",
            id: _id,
          }));

          return [...apposTags, { type: "APPOINTMENTS", id: "LIST" }];
        }
        return [{ type: "APPOINTMENTS", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetAllAppointmentsQuery } = extendedAppointmentSlice;
