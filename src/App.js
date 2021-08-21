import './App.css';
import Snake from './Snake';
import {useState} from 'react';

function UserText(props) {
  console.log(props.isGameOver)
  if (props.isGameOver) {
    return (
      <div className="instructions">
        that's okay. click on giant spinning mooncake for a one-page resume
        <br/>
        (or hit the spacebar to restart)
      </div>
    )
  }
  return (
    <div>
      <div className="instructions">
        eat (or just click on) the fish for a one-page resume
      </div>
      <div className="game-instructions">
        use arrow keys to navigate your Snake
        <br/>
        snack on the red apple to grow (the game ends when you munch on yourself!)
      </div>
    </div>
  )
}

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <UserText isGameOver={isGameOver}/>
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
        <Snake setIsGameOver={(input) => setIsGameOver(input)}/>
      </header>
    </div>
  );
}

export default App;
