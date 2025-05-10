import axios from "../../axios";
import React, { useEffect, useState } from "react";

function Trash() {
    const [trashedBlogs, setTrashedBlogs] = useState([]);

    async function fetchTrashedBlogs() {
        try {
            const response = await axios.get('/blog/trash-blogs');
            setTrashedBlogs(response.data.trashedBlogs);
        } catch (error) {
            console.log("Error fetching trashed blogs: ", error);
        }
    }

    const restoreBlog = async (blogID) => {
        try {
            await axios.post('/blog/restore-blogs', { blogID });
            setTrashedBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogID));
        } catch (error) {
            console.log("Error in restoring blog: ", error.toString());
        }
    };

    const confirmRestore = (blogID) => {
        if (window.confirm("Restore voice?")) {
            restoreBlog(blogID);
        }
    };

    useEffect(() => {
        fetchTrashedBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 pt-20 px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
                What you didn't like?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {trashedBlogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                            <div className="text-sm text-gray-500 mb-2">
                                By: {blog.userID.username}
                            </div>
                            <hr className="mb-2" />
                            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{blog.textBody}</p>
                        </div>
                        <button
                            onClick={() => confirmRestore(blog._id)}
                            className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Restore
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trash;
