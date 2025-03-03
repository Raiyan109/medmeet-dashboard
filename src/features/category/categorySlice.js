import { apiSlice } from "../api/apiSlice";

export const extendedCategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (searchTerm) => `/category?searchTerm=${searchTerm}`,
      providesTags: (result) => {
        if (result?.data) {
          const categories = result?.data;

          const categoryTags = categories.map(({ _id }) => ({
            type: "CATEGORIES",
            id: _id,
          }));

          return [...categoryTags, { type: "CATEGORIES", id: "LIST" }];
        }

        return [{ type: "CATEGORIES", id: "LIST" }];
      },
    }),
    createACategory: builder.mutation({
      query: (catData) => ({
        url: `/category`,
        method: "POST",
        body: catData,
      }),
      invalidatesTags: (result) => {
        return [{ type: "CATEGORIES", id: "LIST" }];
      },
    }),
    deleteACategory: builder.mutation({
      query: (catId) => ({
        url: `/category/${catId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [
          { type: "CATEGORIES", id: arg },
          { type: "CATEGORIES", id: "LIST" },
        ];
      },
    }),
    updateACategory: builder.mutation({
      query: (catData) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ name: catData.name }));
        formData.append("image", catData.image); // Assuming it's a File object

        return {
          url: `/category/update-category/${catData._id}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "CATEGORIES", id: arg._id },
        { type: "CATEGORIES", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateACategoryMutation,
  useUpdateACategoryMutation,
  useDeleteACategoryMutation,
} = extendedCategorySlice;
