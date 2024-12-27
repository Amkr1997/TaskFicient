import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL;

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [
    "getAllTasks",
    "getAllProjects",
    "getAllTeams",
    "getAllUsers",
    "getAllCompletedTasks",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem("workAsanaToken");

      const protectedEndPoints = ["privateRoute"];

      if (token && protectedEndPoints.includes(endpoint)) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      // User Routes
      signup: builder.mutation({
        query: (dataToPost) => {
          console.log(dataToPost);
          return {
            url: "/register",
            method: "POST",
            body: dataToPost,
          };
        },
      }),

      login: builder.mutation({
        query: (dataToPost) => {
          return {
            url: "/login",
            method: "POST",
            body: dataToPost,
          };
        },
      }),

      privateRoute: builder.query({
        query: () => {
          return {
            url: "/verify",
            method: "GET",
          };
        },

        transformResponse: (data) => {
          return data?.loginedUser?.userId;
        },
      }),

      getAllUsers: builder.query({
        query: () => {
          return {
            url: "/getAllUsers",
            method: "GET",
          };
        },

        providesTags: ["getAllUsers"],
      }),

      getSingleUser: builder.query({
        query: (userId) => {
          return {
            url: `/getUser/${userId}`,
            method: "GET",
          };
        },
      }),

      // Task Routes
      getTaskFiltered: builder.query({
        query: (queryString) => {
          return {
            url: `/getTask/populated/filtered?${queryString}`,
            method: "GET",
          };
        },
      }),

      getTask: builder.query({
        query: () => {
          return {
            url: "/getTask/populated",
            method: "GET",
          };
        },

        providesTags: ["getAllTasks"],
      }),

      addTask: builder.mutation({
        query: (dataToAdd) => {
          return {
            url: "/addTask",
            method: "POST",
            body: dataToAdd,
          };
        },

        invalidatesTags: ["getAllTasks"],
      }),

      updateTask: builder.mutation({
        query: (dataToUpdate) => {
          return {
            url: `/updateTaskDetails/${dataToUpdate._id}`,
            method: "POST",
            body: dataToUpdate,
          };
        },

        invalidatesTags: ["getAllTasks"],
      }),

      deleteTask: builder.mutation({
        query: (taskId) => {
          return {
            url: `/deleteTask/${taskId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["getAllTasks"],
      }),

      getProjects: builder.query({
        query: () => {
          return {
            url: "/getAllProjects",
            method: "GET",
          };
        },

        providesTags: ["getAllProjects"],
      }),

      addProjects: builder.mutation({
        query: (dataToAdd) => {
          return {
            url: "/addProject",
            method: "POST",
            body: dataToAdd,
          };
        },

        transformResponse: (data) => {
          return data?.message;
        },

        invalidatesTags: ["getAllProjects"],
      }),

      updateProject: builder.mutation({
        query: (dataToUpdate) => {
          return {
            url: `/updateProject/${dataToUpdate._id}`,
            method: "POST",
            body: dataToUpdate,
          };
        },
      }),

      deleteProject: builder.mutation({
        query: (projectId) => {
          return {
            url: `/deleteProject/${projectId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["getAllProjects"],
      }),

      getTeams: builder.query({
        query: () => {
          return {
            url: "/getAllTeams",
            method: "GET",
          };
        },

        providesTags: ["getAllTeams"],
      }),

      addTeam: builder.mutation({
        query: (dataToPost) => {
          return {
            url: "/addTeam",
            method: "POST",
            body: dataToPost,
          };
        },

        transformResponse: (data) => {
          return data?.message;
        },

        invalidatesTags: ["getAllTeams"],
      }),

      updateTeam: builder.mutation({
        query: (dataToUpdate) => {
          console.log(dataToUpdate._id);
          return {
            url: `/updateTeams/${dataToUpdate._id}`,
            method: "POST",
            body: dataToUpdate,
          };
        },
      }),

      deleteTeam: builder.mutation({
        query: (teamId) => {
          return {
            url: `/deleteTeam/${teamId}`,
            method: "delete",
          };
        },

        invalidatesTags: ["getAllTeams"],
      }),

      getTags: builder.query({
        query: () => {
          return {
            url: `/getAllTags`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useLazyGetTaskFilteredQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useGetProjectsQuery,
  useAddProjectsMutation,
  useGetTeamsQuery,
  useAddTeamMutation,
  useSignupMutation,
  useLoginMutation,
  usePrivateRouteQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTagsQuery,
} = apiSlice;
export default apiSlice;
