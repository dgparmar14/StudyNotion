import React from 'react'
import { apiConnector } from '../apiConnector'
import { categoryEndpoint, quizEndPoint } from '../apis'

import { useDispatch } from 'react-redux';
import { setLoading } from '../../Reducer/Slices/authSlice';
import { toast } from 'react-toastify';


const {
  CREATE_CATEGORY_API,
  GET_CATEGORY_COURSE_DETAILS,
  CREATE_CATEGORY_REQUEST_API,
  UPDATE_CATEGORY_REQUEST_API,
  GET_CATEGORY_REQUEST_API,
  DELETE_CATEGORY_REQUEST_API,
  GET_CATEGORY_CREATED_BY_USER_API,
  REQUEST_FOR_ADMIN,

} = categoryEndpoint;

const { GET_QUIZ_API } = quizEndPoint;

export const createCategory = async (categoryName, token) => {
  try {
    const response = await apiConnector(
      "POST",
      CREATE_CATEGORY_API,
      { categoryName },
      { Authorization: `Bearer ${token}` }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Error occurred while creating category:", error.message);
    return null;
  } finally {
  }
};

export const getCategoryCourseDetails = async (categoryId, token) => {
  try {
    const response = await apiConnector(
      "GET",
      GET_CATEGORY_COURSE_DETAILS,
      { categoryId },
      { Authorization: `Bearer ${token}` }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching category details:", error.message);
    return null;
  } finally {
  }
};

export const getQuiz = async (quizId, token) => {
  try {
    const response = await apiConnector(
      "POST",
      GET_QUIZ_API,
      { quizId },
      { Authorization: `Bearer${token}` }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching quiz:", error.message);
    return null;
  } finally {
  }
};

export const getCategoryRequestForUser = async (token) => {
  const toastId = toast.loading("Loading...");

  try {
    const responce = await apiConnector("GET", GET_CATEGORY_CREATED_BY_USER_API, null, { Authorization: `Bearer${token}` });
    console.log("After fetching categtory request by user");
    console.log(responce.data);

    if (!responce.data.success) {
      throw new Error("Could not get category request created by user");
    }
    toast.dismiss(toastId);
    return responce.data;

  } catch (error) {
    console.error(error);
    toast.error("Could not get category request created by user");
  }
}

export const createCategoryRequest = async (categoryName, token) => {
  try {
    const response = await apiConnector(
      "POST",
      CREATE_CATEGORY_REQUEST_API,
      { categoryName },
      { Authorization: `Bearer${token}` }
    );
    console.log("Create category request api response : ", response)
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Error occurred while creating category:", error.message);
    return null;
  } finally {
  }
};

export const getCategoryRequestsForAdmin = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      REQUEST_FOR_ADMIN,
      null,
      { Authorization: `Bearer${token}` }
    )
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching category requests for admin:", error.message);
    return null;
  }
}

export const updateCategoryRequestStatus = async (requestId, status, token) => {
  try {
    const response = await apiConnector(
      "POST",
      UPDATE_CATEGORY_REQUEST_API,
      { requestId, status },
      { Authorization: `Bearer${token}` }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Error occurred while updating category request status:", error.message);
    return null;
  } finally {
  }
}