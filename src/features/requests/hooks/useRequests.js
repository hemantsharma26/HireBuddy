import { useState, useEffect, useCallback } from 'react';
import requestApi from '../services/request.api';

/**
 * useRequests Hook
 * Fetches and manages requests list with filters
 * 
 * Returns: { requests, loading, error, refetch, pagination }
 */

export const useRequests = (filters = {}) => {
  const [state, setState] = useState({
    requests: [],
    loading: true,
    error: null,
    pagination: null
  });

  const fetchRequests = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await requestApi.browse(filters);
      setState({
        requests: data.requests || [],
        pagination: data.pagination || null,
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Failed to load requests'
      }));
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    ...state,
    refetch: fetchRequests
  };
};

/**
 * useRequestDetails Hook
 * Fetches single request by ID
 */

export const useRequestDetails = (id) => {
  const [state, setState] = useState({
    request: null,
    loading: true,
    error: null
  });

  const fetchRequest = useCallback(async () => {
    if (!id) return;
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await requestApi.getById(id);
      setState({
        request: data.request,
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        request: null,
        loading: false,
        error: error.response?.data?.message || 'Failed to load request'
      });
    }
  }, [id]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  return {
    ...state,
    refetch: fetchRequest
  };
};

/**
 * useCreateRequest Hook
 * Handles request creation
 */

export const useCreateRequest = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    success: false
  });

  const createRequest = async (data) => {
    setState({ loading: true, error: null, success: false });
    
    try {
      const result = await requestApi.create(data);
      setState({ loading: false, error: null, success: true });
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create request';
      setState({ loading: false, error: errorMessage, success: false });
      throw error;
    }
  };

  return {
    ...state,
    createRequest
  };
};

/**
 * useApplyToRequest Hook
 * Handles application to a request
 */

export const useApplyToRequest = () => {
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  const apply = async (requestId, message) => {
    setState({ loading: true, error: null });
    
    try {
      const result = await requestApi.apply(requestId, message);
      setState({ loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to apply';
      setState({ loading: false, error: errorMessage });
      throw error;
    }
  };

  return {
    ...state,
    apply
  };
};

/**
 * useManageApplicants Hook
 * Handles applicant accept/reject
 */

export const useManageApplicants = () => {
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  const acceptApplicant = async (requestId, applicantId) => {
    setState({ loading: true, error: null });
    
    try {
      const result = await requestApi.acceptApplicant(requestId, applicantId);
      setState({ loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to accept applicant';
      setState({ loading: false, error: errorMessage });
      throw error;
    }
  };

  const rejectApplicant = async (requestId, applicantId) => {
    setState({ loading: true, error: null });
    
    try {
      const result = await requestApi.rejectApplicant(requestId, applicantId);
      setState({ loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reject applicant';
      setState({ loading: false, error: errorMessage });
      throw error;
    }
  };

  return {
    ...state,
    acceptApplicant,
    rejectApplicant
  };
};

/**
 * useMyRequests Hook
 * Fetches user's posted and accepted requests
 */

export const useMyRequests = (type = 'posted') => {
  const [state, setState] = useState({
    requests: [],
    loading: true,
    error: null
  });

  const fetchRequests = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = type === 'posted'
        ? await requestApi.getMyPosted()
        : await requestApi.getMyAccepted();
      
      setState({
        requests: data.requests || [],
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        requests: [],
        loading: false,
        error: error.response?.data?.message || 'Failed to load requests'
      });
    }
  }, [type]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    ...state,
    refetch: fetchRequests
  };
};
