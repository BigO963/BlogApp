import OptionsDialog from './OptionsDialog';

import { useState } from "react";
interface Blog {
    id: number
    title: string;
    content: string;
}

interface BlogProps {
    blogs: Blog[];
    setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
    openDialog: (blog?: Blog) => void;
}

function Blog({ blogs, setBlogs, openDialog }: BlogProps) { 

    const [openDialogId, setOpenDialogId] = useState<number | null>(null);

    function manageOptionsDialog(blogId: number) {
        setOpenDialogId((prevId) => (prevId === blogId ? null : blogId));
    }

    function deleteBlog(blogId: number) {
        fetch(`api/blogs/${blogId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== blogId));
        setOpenDialogId(null);
    }

    //If blogs is undefined show loading message otherwise show the blogs
    return (
        <div className="contentWrapper">
            {blogs.length === 0 ? (
                <p><em>Loading...</em></p>
            ) : (
                <div >
                    {blogs.map(blog => (
                        <div className="Blog" key={blog.id}>
                            <img className="moreSettings"
                                src="./public/more.png"
                                onClick={() => manageOptionsDialog(blog.id)}
                                alt="More Options"
                            />
                            {openDialogId === blog.id && (
                                <OptionsDialog
                                    deleteBlog={() => deleteBlog(blog.id)}
                                    editBlog ={() => openDialog(blog)}
                                />
                            )}
                            <h1 className="blogTitle">{blog.title}</h1>
                            <div className="blogContent">{blog.content}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );    
}

export default Blog;