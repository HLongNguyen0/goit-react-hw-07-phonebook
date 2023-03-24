import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://641dbaa70596099ce1530e77.mockapi.io/api/v1",
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: () => `/contacts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Contacts", id })),
              { type: "Contacts", id: "LIST" },
            ]
          : [{ type: "Contacts", id: "LIST" }],
    }),
    addContact: builder.mutation({
      query: (body) => ({
        url: `/contacts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Contacts", id: "LIST" }],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Contacts", id }],
    }),
  }),
});

export const {
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactApi;
