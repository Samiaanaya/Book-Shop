import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/create-order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    allOrders: builder.query({
      query: () => ({
        url: `/orders/all-order`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    myOrders: builder.query({
      query: () => ({
        url: `/orders/user-order`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    verifyOrder: builder.query({
      query: (id) => ({
        url: `/orders/verify?order_id=${id}`,
        method: "GET",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    calculateRevenue: builder.query({
      query: () => ({
        url: `/orders/revenue`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useAllOrdersQuery,
  useMyOrdersQuery,
  useVerifyOrderQuery,
  useDeleteOrderMutation,
  useCalculateRevenueQuery,
} = orderApi;
