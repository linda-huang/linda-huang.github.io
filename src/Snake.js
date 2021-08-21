import React from 'react'
import './Game.css'
import mooncake from './mooncake.svg'
import fish from './fish.png';

const Direction = Object.freeze({
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
})

const appleHue = '#ED2939'

const snakeHue = '#13364b'

const initialGameLoopTimeout = 75;

class Snake extends React.Component {
  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.state = {
      width: 0,
      height: 0,
      blockWidth: 0,
      blockHeight: 0,
      gameLoopTimeout: initialGameLoopTimeout,
      timeoutId: 0,
      startSnakeSize: 0,
      snake: [],
      apple: {},
      fish: {},
      direction: Direction.Right,
      directionChanged: false,
      isGameOver: false,
      snakeColor: snakeHue,
      appleColor: appleHue,
      score: 0,
      highScore: Number(localStorage.getItem('snakeHighScore')) || 0,
      newHighScore: false,
    }
  }

  componentDidMount() {
    this.initGame()
    window.addEventListener('keydown', this.handleKeyDown)
    this.gameLoop()
  }

  initGame() {
    let percentageWidth = 50
    let width =
      document.getElementById('GameBoard').parentElement.offsetWidth *
      (percentageWidth / 100)
    width -= width % 30
    if (width < 30) width = 30
    let height = (width / 3) * 2
    let blockWidth = width / 60
    let blockHeight = height / 40

    let startSnakeSize = 10
    let snake = []
    let Xpos = width / 2
    let Ypos = height / 2
    let snakeHead = { Xpos, Ypos }
    snake.push(snakeHead)
    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth
      let snakePart = { Xpos, Ypos }
      snake.push(snakePart)
    }

    let appleXpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth
    let appleYpos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight
    while (appleYpos === snake[0].Ypos) {
      appleYpos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
    }

    let fishXpos =
      Math.floor(Math.random() * ((width - 3*blockWidth) / blockWidth + 1)) *
      blockWidth
    let fishYpos =
      Math.floor(Math.random() * ((height - 3*blockHeight) / blockHeight + 1)) *
      blockHeight
    while (!(snake[0].Ypos > fishYpos + 3*this.state.blockHeight || snake[0].Ypos < fishYpos - 3*this.state.blockHeight)) {
      fishYpos =
        Math.floor(Math.random() * ((height - 3*blockHeight) / blockHeight + 1)) *
        blockHeight
    }

    this.setState({
      width,
      height,
      blockWidth,
      blockHeight,
      startSnakeSize,
      snake,
      fish: { Xpos: fishXpos, Ypos: fishYpos },
      apple: { Xpos: appleXpos, Ypos: appleYpos },
    })
  }

  gameLoop() {
    let timeoutId = setTimeout(() => {
      if (!this.state.isGameOver) {
        this.moveSnake()
        this.tryToEatSnake()
        this.tryToEatApple()
        this.tryToEatFish()
        this.setState({ directionChanged: false })
      }

      this.gameLoop()
    }, this.state.gameLoopTimeout)

    this.setState({ timeoutId })
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  resetGame() {
    let width = this.state.width
    let height = this.state.height
    let blockWidth = this.state.blockWidth
    let blockHeight = this.state.blockHeight
    let apple = this.state.apple

    let snake = []
    let Xpos = width / 2
    let Ypos = height / 2
    let snakeHead = { Xpos, Ypos }
    snake.push(snakeHead)
    for (let i = 1; i < this.state.startSnakeSize; i++) {
      Xpos -= blockWidth
      let snakePart = { Xpos, Ypos }
      snake.push(snakePart)
    }

    // apple position reset
    apple.Xpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth
    apple.Ypos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight
    while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
    }

    this.setState({
      snake,
      apple,
      direction: Direction.Right,
      directionChanged: false,
      isGameOver: false,
      gameLoopTimeout: initialGameLoopTimeout,
      snakeColor: snakeHue,
      appleColor: appleHue,
      score: 0,
      newHighScore: false,
    })
    this.props.setIsGameOver(false)
  }

  getRandomColor() {
    let hexa = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) color += hexa[Math.floor(Math.random() * 16)]
    return color
  }

  moveSnake() {
    let snake = this.state.snake
    let previousPartX = this.state.snake[0].Xpos
    let previousPartY = this.state.snake[0].Ypos
    let tmpPartX = previousPartX
    let tmpPartY = previousPartY
    this.moveHead()
    for (let i = 1; i < snake.length; i++) {
      tmpPartX = snake[i].Xpos
      tmpPartY = snake[i].Ypos
      snake[i].Xpos = previousPartX
      snake[i].Ypos = previousPartY
      previousPartX = tmpPartX
      previousPartY = tmpPartY
    }
    this.setState({ snake })
  }

  tryToEatFish() {
    let snake = this.state.snake
    let fish = this.state.fish

    if ((snake[0].Xpos >= fish.Xpos && snake[0].Xpos <= fish.Xpos + 3*this.state.blockWidth) 
      && (snake[0].Ypos >= fish.Ypos && snake[0].Ypos <= fish.Ypos + 3*this.state.blockHeight)) {
        window.location.href = "https://linda-huang.github.io/resume.pdf";
    }
  }

  tryToEatApple() {
    let snake = this.state.snake
    let apple = this.state.apple

    // if the snake's head is on an apple
    if (snake[0].Xpos === apple.Xpos && snake[0].Ypos === apple.Ypos) {
      let width = this.state.width
      let height = this.state.height
      let blockWidth = this.state.blockWidth
      let blockHeight = this.state.blockHeight
      let newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos }
      let highScore = this.state.highScore
      let newHighScore = this.state.newHighScore
      let gameLoopTimeout = this.state.gameLoopTimeout

      // increase snake size
      snake.push(newTail)

      // create another apple
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
      while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
        apple.Xpos =
          Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
          blockWidth
        apple.Ypos =
          Math.floor(
            Math.random() * ((height - blockHeight) / blockHeight + 1)
          ) * blockHeight
      }

      // increment high score if needed
      if (this.state.score === highScore) {
        highScore++
        localStorage.setItem('snakeHighScore', highScore)
        newHighScore = true
      }

      // decrease the game loop timeout
      if (gameLoopTimeout > 25) gameLoopTimeout -= 0.5

      this.setState({
        snake,
        apple,
        score: this.state.score + 1,
        highScore,
        newHighScore,
        gameLoopTimeout,
      })
    }
  }

  tryToEatSnake() {
    let snake = this.state.snake

    for (let i = 1; i < snake.length; i++) {
      if (snake[0].Xpos === snake[i].Xpos && snake[0].Ypos === snake[i].Ypos) {
        this.setState({ isGameOver: true })
        this.props.setIsGameOver(true)
      }
    }
  }

  isAppleOnSnake(appleXpos, appleYpos) {
    let snake = this.state.snake
    for (let i = 0; i < snake.length; i++) {
      if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos)
        return true
    }
    return false
  }

  moveHead() {
    switch (this.state.direction) {
      case Direction.Left:
        this.moveHeadLeft()
        break
      case Direction.Up:
        this.moveHeadUp()
        break
      case Direction.Right:
        this.moveHeadRight()
        break
      default:
        this.moveHeadDown()
    }
  }

  moveHeadLeft() {
    let width = this.state.width
    let blockWidth = this.state.blockWidth
    let snake = this.state.snake
    snake[0].Xpos =
      snake[0].Xpos <= 0 ? width - blockWidth : snake[0].Xpos - blockWidth
    this.setState({ snake })
  }

  moveHeadUp() {
    let height = this.state.height
    let blockHeight = this.state.blockHeight
    let snake = this.state.snake
    snake[0].Ypos =
      snake[0].Ypos <= 0 ? height - blockHeight : snake[0].Ypos - blockHeight
    this.setState({ snake })
  }

  moveHeadRight() {
    let width = this.state.width
    let blockWidth = this.state.blockWidth
    let snake = this.state.snake
    snake[0].Xpos =
      snake[0].Xpos >= width - blockWidth ? 0 : snake[0].Xpos + blockWidth
    this.setState({ snake })
  }

  moveHeadDown() {
    let height = this.state.height
    let blockHeight = this.state.blockHeight
    let snake = this.state.snake
    snake[0].Ypos =
      snake[0].Ypos >= height - blockHeight ? 0 : snake[0].Ypos + blockHeight
    this.setState({ snake })
  }

  handleKeyDown(event) {
    if (this.state.isGameOver && event.keyCode === 32) {
      this.resetGame()
      return
    }

    if (this.state.directionChanged) return

    switch (event.keyCode) {
      case 37:
      case 65:
        this.goLeft()
        break
      case 38:
      case 87:
        this.goUp()
        break
      case 39:
      case 68:
        this.goRight()
        break
      case 40:
      case 83:
        this.goDown()
        break
      default:
    }
    this.setState({ directionChanged: true })
  }

  goLeft() {
    let newDirection = this.state.direction === Direction.Right ? Direction.Right : Direction.Left
    this.setState({ direction: newDirection })
  }

  goUp() {
    let newDirection = this.state.direction === Direction.Down ? Direction.Down : Direction.Up
    this.setState({ direction: newDirection })
  }

  goRight() {
    let newDirection = this.state.direction === Direction.Left ? Direction.Left : Direction.Right
    this.setState({ direction: newDirection })
  }

  goDown() {
    let newDirection = this.state.direction === Direction.Up ? Direction.Up : Direction.Down
    this.setState({ direction: newDirection })
  }
  
  render() {
    if (this.state.isGameOver) {
      return (
        <div>
          <a href="https://linda-huang.github.io/resume.pdf"
              target="_blank"
              rel="noopener noreferrer">
            <div>
              <img src={mooncake} className="mooncake" alt="mooncake" height="200" width="200"/>
            </div>
          </a>
          <div className="game-over">game over!</div>
        </div>
      )
    }

    return (
      <div
        id='GameBoard'
        style={{
          width: this.state.width,
          height: this.state.height,
          borderWidth: this.state.width / 400,
        }}>
        {this.state.snake.map((snakePart, index) => {
          return (
            <div
              key={index}
              className='Block'
              style={{
                width: this.state.blockWidth,
                height: this.state.blockHeight,
                left: snakePart.Xpos,
                top: snakePart.Ypos,
                background: this.state.snakeColor,
              }}
            />
          )
        })}
        <div
          className='Block'
          style={{
            width: this.state.blockWidth,
            height: this.state.blockHeight,
            left: this.state.apple.Xpos,
            top: this.state.apple.Ypos,
            background: this.state.appleColor,
          }}
        />
          <a href="https://linda-huang.github.io/resume.pdf"
              target="_blank"
              rel="noopener noreferrer">
            <img src={fish} alt="fish" height={3*this.state.blockHeight} width={3*this.state.blockWidth}  style={{
                left: this.state.fish.Xpos,
                top: this.state.fish.Ypos,
                position: "absolute"
              }}/>
          </a>
        <div id='Score' style={{ fontSize: this.state.width / 50 }}>
          high score: {this.state.highScore}&ensp;&ensp;&ensp;&ensp;score:{' '}
          {this.state.score}
        </div>
      </div>
    )
  }
}

export default Snake