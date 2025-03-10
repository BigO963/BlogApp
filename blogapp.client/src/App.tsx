import './css/App.css';
import Blog from './components/Blog';
import Aside from './components/Aside';


function App() {
    //THe whole page made up of components
    return (
        <div className="blogWrapper">
            <Aside />
            <Blog />
        </div>
    )   
}

export default App;