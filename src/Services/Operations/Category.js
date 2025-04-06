import React from 'react'
import { apiConnector } from '../apiConnector'
import {categoryEndpoint, quizEndPoint} from '../apis'

import { useDispatch } from 'react-redux';
import { setLoading } from '../../Reducer/Slices/authSlice';


const {
  CREATE_CATEGORY_API,
  GET_CATEGORY_COURSE_DETAILS,
  ADD_CATEGORY_REQUEST_API,
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
