import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js'
import { getRandomFoodPosition, update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import { onSnake } from './snake.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
let SNAKE_SPEED = 1 ? 1 : SNAKE_SPEED
const newSpeed = document.getElementById("newSpeed")
const getSpeed = document.getElementById("getSpeed")
let myScore = document.getElementById("score")
// console.log(myScore)

let food = getRandomFoodPosition()
// console.log(onSnake(food))
let score = JSON.parse(myScore.innerHTML)
// console.log(typeof score)

export function getScore(){
    // console.log(score += 1)
    // console.log(getSnakeHead())
    // console.log(onSnake(food))
    // console.log(food)
    // if(food == getSnakeHead()) {
    //     console.log("equal")
        
    // }else{
    //     // console.log("not equall")
    // } 
    // if(onSnake(food)){
    //     score = score + 1
    //     console.log(score)
    //     myScore.innerHTML = score
    // }
    // return onSnake(food) ? console.log("eaten") : console.log("not not")
    // if(onSnake(food) == true){
    //     console.log("eaten")
    //     console.log(score)
    //     myScore.innerHTML += score + 1
    // }else{
    //     // console.log("not on food")
    //     return getScore
    // }
    // console.log(onSnake(food))
    score = score + 1
    // console.log(score)
    myScore.innerHTML = score
}

newSpeed.addEventListener("input", () =>{
    // console.log(newSpeed.value)
    getSpeed.innerHTML = newSpeed.value
    SNAKE_SPEED = newSpeed.value
})
// gameSpeed(speed)


function main(currentTime){
    if(gameOver){
        if(confirm(`Your Score is ${myScore.innerHTML}. Press OK to play again.`)){
            window.location = './index.html'
        }
        return
    }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return

    // console.log('Render')
    lastRenderTime = currentTime
    // console.log(secondsSinceLastRender)

    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
    // getScore()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}