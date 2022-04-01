import Install from './pages/Install';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

    if (window.ethereum) {
        return <Home />;
    } else {
        return <Install />
    }
}

export default App;