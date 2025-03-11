import './css/App.css';
import Blog from './components/Blog';
import Aside from './components/Aside';
import AddBlogDialog from './components/AddBlogDialog';

import { useEffect, useState } from 'react';

interface Blog {
    id: number;
    title: string;
    content: string
}

function App() {
    //THe whole page made up of components

    const [isOpen, setIsOpen] = useState<boolean>(false);
    //Tracking the state of the blogs
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);

    useEffect(() => {
        populateBlogs();
    }, []);

    //Call the ASP webAPI which gets blog data from a MS SQL database
    async function populateBlogs() {
        const response = await fetch('api/blogs');
        if (response.ok) {
            const data = await response.json();
            setBlogs(data);
        }
    }

    function openDialog(blog?: Blog) {
        setBlogToEdit(blog || null);
        setIsOpen(true);
    }

    return (
        <div className="blogWrapper">
            <AddBlogDialog
                isOpen={isOpen}
                closeDialog={() => setIsOpen(false)}
                refreshBlogs={populateBlogs}
                blogToEdit={blogToEdit}
            />
            <Aside openDialog={() => openDialog()} />
            <Blog blogs={blogs} setBlogs={setBlogs} openDialog={openDialog} />
        </div>
    );   
}

export default App;