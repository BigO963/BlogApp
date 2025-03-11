interface OptionsDialogProps {
    deleteBlog: () => void;
    editBlog: () => void;
}

function OptionsDialog({ deleteBlog, editBlog }: OptionsDialogProps) {
    return (    
        <div className="optionsDialog">
            <button className="editBlog" onClick={editBlog}>Edit</button>
            <button className="deleteBlog" onClick={deleteBlog}>Delete</button>
        </div>             
    );
}

export default OptionsDialog;