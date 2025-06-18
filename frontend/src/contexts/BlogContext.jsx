import { createContext, useEffect, useState } from 'react';
import {
  getAllBlogs
} from '../api/blogApi';
import { createSlug } from '../ultils/slug';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all blogs
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllBlogs();
            
            // Add slug if not present
            const dataWithSlug = response.data.map(blog => ({
                ...blog,
                slug: blog.slug || createSlug(blog.title)
            }));
            
            setBlogs(dataWithSlug);
        } catch (err) {
            setError(err.message || 'Error fetching blogs');
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get blog by slug
    const getBlogBySlug = (slug) => {
        return blogs.find(blog => blog.slug === slug);
    };

    // Create new blog
    const createBlog = async (blogData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await createBlog(blogData);
            setBlogs(prevBlogs => [...prevBlogs, response.data]);
            return response.data;
        } catch (err) {
            setError(err.message || 'Error creating blog');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update blog
    const updateBlog = async (blogId, blogData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateBlog(blogId, blogData);
            setBlogs(prevBlogs => 
                prevBlogs.map(blog => 
                    blog._id === blogId ? response.data : blog
                )
            );
            return response.data;
        } catch (err) {
            setError(err.message || 'Error updating blog');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete blog
    const deleteBlog = async (blogId) => {
        try {
            setLoading(true);
            setError(null);
            await deleteBlog(blogId);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
        } catch (err) {
            setError(err.message || 'Error deleting blog');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Like blog
    const likeBlog = async (blogId) => {
        try {
            setError(null);
            const response = await likeBlog(blogId);
            setBlogs(prevBlogs => 
                prevBlogs.map(blog => 
                    blog._id === blogId ? response.data : blog
                )
            );
            return response.data;
        } catch (err) {
            setError(err.message || 'Error liking blog');
            throw err;
        }
    };

    // Add comment
    const addComment = async (blogId, commentData) => {
        try {
            setError(null);
            const response = await addComment(blogId, commentData);
            setBlogs(prevBlogs => 
                prevBlogs.map(blog => 
                    blog._id === blogId ? response.data : blog
                )
            );
            return response.data;
        } catch (err) {
            setError(err.message || 'Error adding comment');
            throw err;
        }
    };

    // Delete comment
    const deleteComment = async (blogId, commentId) => {
        try {
            setError(null);
            const response = await deleteComment(blogId, commentId);
            setBlogs(prevBlogs => 
                prevBlogs.map(blog => 
                    blog._id === blogId ? response.data : blog
                )
            );
            return response.data;
        } catch (err) {
            setError(err.message || 'Error deleting comment');
            throw err;
        }
    };

    // Get user's blogs
    const getMyBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getMyBlogs();
            return response.data;
        } catch (err) {
            setError(err.message || 'Error fetching your blogs');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Get blogs by author
    const getBlogsByAuthor = async (authorId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await getBlogsByAuthor(authorId);
            return response.data;
        } catch (err) {
            setError(err.message || 'Error fetching author blogs');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const value = {
        blogs,
        loading,
        error,
        getBlogBySlug,
        createBlog,
        updateBlog,
        deleteBlog,
        likeBlog,
        addComment,
        deleteComment,
        getMyBlogs,
        getBlogsByAuthor,
        refreshBlogs: fetchBlogs
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};
