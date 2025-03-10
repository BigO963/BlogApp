import { useEffect, useState } from 'react';

interface Blog {
    title: string;
    content: string;
}


function Blog() {

    //Tracking the state of the blogs
    const [blogs, setBlogs] = useState<Blog[]>();

    //On mount execute function
    useEffect(() => {
        populateBlogs();
    }, []);

    //If blogs is undefined show loading message otherwise show the blogs
    const contents = blogs === undefined
        ? <p><em>Loading...</em></p>
        : <div >
            {blogs.map(blog => 
                <div className="Blog">
                    <h1 className="blogTitle">{blog.title}</h1>
                    <div className="blogContent">{blog.content}</div>
                </div>
            )}
          </div>;

    return (
        <div className="contentWrapper">
            {contents}
        </div>
    );

    //Call the ASP webAPI which gets blog data from a MS SQL database
    async function populateBlogs() {
        const response = await fetch('api/blogs');
        if (response.ok) {
            const data = await response.json();
            setBlogs(data);
        }
    }
}

export default Blog;