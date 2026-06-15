import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/users/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    updatePassword: builder.mutation({
      query: (passInfo) => ({
        url: "/users/change-password",
        method: "POST",
        body: passInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
} = authApi;
