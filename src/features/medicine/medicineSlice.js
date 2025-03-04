import { apiSlice } from "../api/apiSlice";

export const extendedMedicineSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMedicines: builder.query({
      query: () => "/medicine",
      providesTags: (result) => {
        if (result?.data) {
          const medicines = result.data;

          const medicineTags = medicines.map(({ _id }) => ({
            type: "MEDICINES",
            id: _id,
          }));

          return [
            ...medicineTags,
            {
              type: "MEDICINES",
              id: "LIST",
            },
          ];
        }

        return [
          {
            type: "MEDICINES",
            id: "LIST",
          },
        ];
      },
    }),
    createMedicine: builder.mutation({
      query: (data) => ({
        url: "/medicine",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => [{ type: "MEDICINES", id: "LIST" }],
    }),
    deleteMedicine: builder.mutation({
      query: (mediId) => ({
        url: `/medicine/${mediId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        if (result?.data) {
          return [
            { type: "MEDICINES", id: arg },
            { type: "MEDICINES", id: "LIST" },
          ];
        }

        return [{ type: "MEDICINES", id: "LIST" }];
      },
    }),
  }),
});

export const {
  useGetAllMedicinesQuery,
  useCreateMedicineMutation,
  useDeleteMedicineMutation,
} = extendedMedicineSlice;
