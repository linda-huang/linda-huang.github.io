import React, { useState, useEffect } from "react";
import "./Game.css";

const Direction = Object.freeze({
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
})

function SnakeFunctional() {

  const [initLoop, setInitLoop] = useState(false)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [blockWidth, setBlockWidth] = useState(0)
  const [blockHeight, setBlockHeight] = useState(0)
  const [gameLoopTimeout, setGameLoopTimeout] = useState(50)
  const [timeoutId, setTimeoutId] = useState(0)
  const [startSnakeSize, setStartSnakeSize] = useState(0)
  const [snake, setSnake] = useState([])
  const [apple, setApple] = useState({})
  const [direction, setDirection] = useState(Direction.Right)
  const [directionChanged, setDirectionChanged] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [snakeColor, setSnakeColor] = useState(getRandomColor())
  const [appleColor, setAppleColor] = useState(getRandomColor())
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('snakeHighScore')) || 0)
  const [newHighScore, setNewHighScore] = useState(false)
  // const [gameState, setGameState] = useState({
  //   width: 0,
  //   height: 0,
  //   blockWidth: 0,
  //   blockHeight: 0,
  //   gameLoopTimeout: 50,
  //   timeoutId: 0,
  //   startSnakeSize: 0,
  //   snake: [],
  //   apple: {},
  //   direction: Direction.Right,
  //   directionChanged: false,
  //   isGameOver: false,
  //   snakeColor: snakeColor || getRandomColor(),
  //   appleColor: appleColor || getRandomColor(),
  //   score: 0,
  //   highScore: Number(localStorage.getItem('snakeHighScore')) || 0,
  //   newHighScore: false,
  // })

  useEffect(() => {
    console.log('init game useeffect')
    initGame()
    window.addEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (initLoop) {
      console.log('init loop')
      setInitLoop(false)
      gameLoop()
    }
  }, [snake, initLoop])

  useEffect(() => {
    console.log('unmount')
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, []);

  function tryToEatSnake() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].xPos === snake[i].xPos && snake[0].yPos === snake[i].yPos)
      setIsGameOver(true)
    }
  }

  function isAppleOnSnake(appleXPos, appleYPos) {
    for (let i = 0; i < snake.length; i++) {
      if (appleXPos === snake[i].xPos && appleYPos === snake[i].yPos)
        return true
    }
    return false
  }

  function moveHead() {
    switch (direction) {
      case Direction.Left:
        moveHeadLeft()
        break
      case Direction.Up:
        moveHeadUp()
        break
      case Direction.Right:
        moveHeadRight()
        break
      default:
        moveHeadDown()
    }
  }

  function moveHeadLeft() {
    snake[0].xPos = snake[0].xPos <= 0 ? width - blockWidth : snake[0].xPos - blockWidth
    setSnake(snake)
  }

  function moveHeadUp() {
    snake[0].yPos = snake[0].yPos <= 0 ? height - blockHeight : snake[0].yPos - blockHeight
    setSnake(snake)
  }

  function moveHeadRight() {
    snake[0].xPos = snake[0].xPos >= width - blockWidth ? 0 : snake[0].xPos + blockWidth
    setSnake(snake)
  }

  function moveHeadDown() {
    snake[0].yPos = snake[0].yPos >= height - blockHeight ? 0 : snake[0].yPos + blockHeight
    setSnake(snake)
  }

  function handleKeyDown(event) {
    // if spacebar is pressed to run a new game
    console.log(direction)
    if (isGameOver && event.keyCode === 32) {
      resetGame()
      return
    }

    if (directionChanged) return

    switch (event.keyCode) {
      case 37:
      case 65:
        goLeft()
        break
      case 38:
      case 87:
        goUp()
        break
      case 39:
      case 68:
        goRight()
        break
      case 40:
      case 83:
        goDown()
        break
      default:
    }
    setDirectionChanged(true)
  }

  function goLeft() {
    let newDirection = direction === Direction.Right ? Direction.Right : Direction.Left
    setDirection(newDirection)
  }

  function goUp() {
    let newDirection = direction === Direction.Down ? Direction.Down : Direction.Up
    setDirection(newDirection)
  }

  function goRight() {
    let newDirection = direction === Direction.Left ? Direction.Left : Direction.Right
    setDirection(newDirection)
  }

  function goDown() {
    let newDirection = direction === Direction.Up ? Direction.Up : Direction.Down
    setDirection(newDirection)
  }
  function getRandomColor() {
    let hexa = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) color += hexa[Math.floor(Math.random() * 16)]
    return color
  }

  function moveSnake() {
    let previousPartX = snake[0].xPos
    let previousPartY = snake[0].yPos
    let tmpPartX = previousPartX
    let tmpPartY = previousPartY
    moveHead()
    for (let i = 1; i < snake.length; i++) {
      tmpPartX = snake[i].xPos
      tmpPartY = snake[i].yPos
      snake[i].xPos = previousPartX
      snake[i].yPos = previousPartY
      previousPartX = tmpPartX
      previousPartY = tmpPartY
    }
    setSnake(snake)
  }

  function tryToEatApple() {
    let newSnake = [...snake]
    let newApple = {}

    // if the snake's head is on an apple
    if (snake[0].xPos === apple.xPos && snake[0].yPos === apple.yPos) {
      let newTail = { xPos: apple.xPos, yPos: apple.yPos }

      // increase snake size
      newSnake.push(newTail)

      // create another apple
      newApple.xPos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth
      newApple.yPos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
      while (isAppleOnSnake(newApple.xPos, newApple.yPos)) {
        newApple.xPos =
          Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
          blockWidth
        newApple.yPos =
          Math.floor(
            Math.random() * ((height - blockHeight) / blockHeight + 1)
          ) * blockHeight
      }

      // increment high score if needed
      if (score === highScore) {
        setHighScore(highScore + 1)
        localStorage.setItem('snakeHighScore', highScore)
        setNewHighScore(true)
      }

      // decrease the game loop timeout
      if (gameLoopTimeout > 25) {
        setGameLoopTimeout(gameLoopTimeout - 0.5)
      }

      setScore(score + 1)
      setApple(newApple)
      setSnake(newSnake)
    }
  }

  function resetGame() {

    // snake reset
    let newSnake = []
    let xPos = width / 2
    let yPos = height / 2
    let snakeHead = { xPos, yPos }
    snake.push(snakeHead)
    for (let i = 1; i < startSnakeSize; i++) {
      xPos -= blockWidth
      let snakePart = { xPos, yPos }
      newSnake.push(snakePart)
    }

    // apple position reset
    let newApple = {}
    newApple.xPos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth
      newApple.yPos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight
    while (isAppleOnSnake(newApple.xPos, newApple.yPos)) {
      newApple.xPos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth
      newApple.yPos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
    }

    setSnake(newSnake)
    setApple(newApple)
    setDirection(Direction.Right)
    setDirectionChanged(false)
    setIsGameOver(false)
    setGameLoopTimeout(50)
    setSnakeColor(getRandomColor())
    setAppleColor(getRandomColor())
    setScore(0)
    setNewHighScore(false)
  }

  function initGame() {
    let percentageWidth = 40
    let newWidth =
      document.getElementById('GameBoard').parentElement.offsetWidth *
      (percentageWidth / 100)
    newWidth -= newWidth % 30
    if (newWidth < 30) newWidth = 30
    let newHeight = (newWidth / 3) * 2
    let newBlockWidth = newWidth / 30
    let newBlockHeight = newHeight / 20

    let newStartSnakeSize = 6
    let newSnake = []
    let xPos = newHeight / 2
    let yPos = newHeight / 2
    let snakeHead = { xPos, yPos }
    newSnake.push(snakeHead)
    for (let i = 1; i < newStartSnakeSize; i++) {
      xPos -= blockWidth
      let snakePart = { xPos, yPos }
      newSnake.push(snakePart)
    }

    let appleXPos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth
    let appleYPos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight
    while (appleYPos === newSnake[0].yPos) {
      appleYPos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
    }

    setWidth(newWidth)
    setHeight(newHeight)
    setBlockWidth(newBlockWidth)
    setBlockHeight(newBlockHeight)
    setSnake(newSnake)
    setApple({ xPos: appleXPos, yPos: appleYPos })
    setStartSnakeSize(newStartSnakeSize)
    
    setInitLoop(true)
  }

  function gameLoop() {
    let timeoutId = setTimeout(() => {
      if (!isGameOver) {
        moveSnake()
        tryToEatSnake()
        tryToEatApple()
        setDirectionChanged(false)
      }

      gameLoop()
    }, gameLoopTimeout)

    setTimeoutId(timeoutId)
  }

  return (
    <div
        id='GameBoard'
        style={{
          width: width,
          height: height,
          borderWidth: width / 50,
        }}>
        {snake.map((snakePart, index) => {
          return (
            <div
              key={index}
              className='Block'
              style={{
                width: blockWidth,
                height: blockHeight,
                left: snakePart.xPos,
                top: snakePart.yPos,
                background: snakeColor,
              }}
            />
          )
        })}
        <div
          className='Block'
          style={{
            width: blockWidth,
            height: blockHeight,
            left: apple.xPos,
            top: apple.yPos,
            background: appleColor,
          }}
        />
        <div id='Score' style={{ fontSize: width / 20 }}>
          HIGH-SCORE: {highScore}&ensp;&ensp;&ensp;&ensp;SCORE:{' '}
          {score}
        </div>
      </div>
  )
}

export default SnakeFunctional