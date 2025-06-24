import axiosClient from './axiosClient';

export const getAllBlogs = async () => {
    try {
        const response = await axiosClient.get('/blogs');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching blogs' };
    }
};

export const getBlogById = async (id) => {
    try {
        const response = await axiosClient.get(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching blog' };
    }
};

export const getBlogBySlug = async (slug) => {
    try {
        const response = await axiosClient.get(`/blogs/${slug}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching blog' };
    }
};

export const createBlog = async (blogData) => {
    try {
        const response = await axiosClient.post('/blogs', blogData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error creating blog' };
    }
};

export const updateBlog = async (blogId, blogData) => {
    try {
        const response = await axiosClient.put(`/blogs/${blogId}`, blogData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error updating blog' };
    }
};

export const deleteBlog = async (blogId) => {
    try {
        const response = await axiosClient.delete(`/blogs/${blogId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error deleting blog' };
    }
};

export const likeBlog = async (blogId) => {
    try {
        const response = await axiosClient.post(`/blogs/${blogId}/like`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error liking blog' };
    }
};

export const addComment = async (blogId, commentData) => {
    try {
        const response = await axiosClient.post(`/blogs/${blogId}/comment`, commentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error adding comment' };
    }
};

export const deleteComment = async (blogId, commentId) => {
    try {
        const response = await axiosClient.delete(`/blogs/${blogId}/comment/${commentId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error deleting comment' };
    }
};

export const getMyBlogs = async () => {
    try {
        const response = await axiosClient.get('/blogs/author/me');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching your blogs' };
    }
};

export const getBlogsByAuthor = async (authorId) => {
    try {
        const response = await axiosClient.get(`/blogs/author/${authorId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching author blogs' };
    }
}; 