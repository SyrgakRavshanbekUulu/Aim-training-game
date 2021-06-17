const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const randomColor = [
  'linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)', 
  'linear-gradient(90deg, #e3ce16 0%, #b2b41e 47%, #f7e546 100%)',
  'linear-gradient(90deg, #38e316 0%, #1eb423 47%, #69f746 100%)',
  'linear-gradient(90deg, #e316b0 0%, #b41ea0 47%, #f746df 100%)']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if(event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
}) 

board.addEventListener('click', (event) => {
  if(event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if(time === 0){
    finishGame()
  } else {
    let current = --time
    if(current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.remove()
  board.innerHTML = `<h1>Счет:<span class="primary">${score}</span></h1>&nbsp&nbsp<a class="home" id="back">|Главная|</a>`
  const back = document.querySelector('#back')
  back.addEventListener('click', () => {
    window.location.reload()
  })
}

function createRandomCircle() {
  const circle = document.createElement('div')
  circle.style.background = randomColor[getRandomNumber(1, 4)]

  circle.classList.add('circle')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  
  circle.style.height = `${size}px`
  circle.style.width = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  board.append(circle)

}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}