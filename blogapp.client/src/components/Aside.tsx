interface ButtonProps {
    openDialog: () => void;
}
function Aside({openDialog } : ButtonProps) {
    return (
        <button className="add" onClick={openDialog}>Add Blog</button>
    );  
}

export default Aside;