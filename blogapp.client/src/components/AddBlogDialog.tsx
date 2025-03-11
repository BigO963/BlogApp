import { useState, useEffect } from 'react';

interface Blog {
    id?: number;
    title: string;
    content: string;
}

interface DialogProps {
    isOpen: boolean;
    closeDialog: () => void;
    refreshBlogs: () => void;
    blogToEdit?: Blog | null;
}

function AddBlogDialog({ isOpen, closeDialog, refreshBlogs, blogToEdit }: DialogProps) {

    const [blog, setBlog] = useState<Blog>({ title: "", content: "" });

    useEffect(() => {
        if (blogToEdit) {
            setBlog(blogToEdit);  // Pre-fill form if editing
        } else {
            setBlog({ title: "", content: "" });  // Empty form for new blog
        }
    }, [blogToEdit]);

    if (!isOpen) return null;

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setBlog({ ...blog, [event.target.name]: event.target.value });
    }

    async function saveBlog() {
        if (!blog.title || !blog.content) {
            alert("Title and content cannot be empty!");
            return;
        }

        try {
            let response: Response;

            // If the blog has an id, it means we're editing an existing blog (PUT request)
            if (blog.id) {
                response = await fetch(`/api/blogs/${blog.id}`, {
                    method: "PUT",
                    body: JSON.stringify(blog),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                });
            } else {
                // If no id, it's a new blog (POST request)
                response = await fetch("/api/blogs", {
                    method: "POST",
                    body: JSON.stringify(blog),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                });
            }

            // Check if the response was successful
            if (response.ok) {
                refreshBlogs();  // Refresh the list of blogs
                closeDialog();    // Close the dialog
            } else {
                alert("Failed to save the blog");
            }
        } catch (error) {
            alert("An error occurred while saving the blog");
            console.error("Error saving blog:", error);
        }
    }

    return (
        <div className="overlay">
            <div className="addDialog">
                <h1>{blog.id ? 'Edit' : 'Add'} a Blog</h1>
                <button className="closeButton" onClick={closeDialog}>Close</button>
                <div className="dialog-wrapper">
                    <input
                        className="dialogTitle"
                        placeholder="Blog title:"
                        required
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                    />
                    <textarea
                        className="dialogText"
                        required
                        placeholder="Write your blog..."
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                    />
                </div>
                <button className="addButton" onClick={saveBlog}>{ blog.id ? 'Save' : 'Add'} Blog</button>
            </div>
        </div>
    );

}

export default AddBlogDialog;