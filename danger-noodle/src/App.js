import './App.css';
import Snake from './Snake';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={mooncake} className="mooncake" alt="mooncake" height="100" width="100" /> */}
        <div className="link-container">
          <a
            className="link"
            href="https://github.com/linda-huang"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <a
            className="link"
            href="https://scholar.google.com/citations?hl=en&user=Wms1BCMAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
          >
            google scholar
          </a>
          <a
            className="link"
            href="https://www.linkedin.com/in/linda-huang-sijia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
        </div>
        <Snake/>
      </header>
    </div>
  );
}

export default App;
