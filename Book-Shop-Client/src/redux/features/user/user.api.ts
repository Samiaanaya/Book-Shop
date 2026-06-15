import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/admin/users`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: `/users/update-profile`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useGetSingleUserQuery,
} = userApi;
