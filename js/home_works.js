const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const gmailRegex = /^[a-zA-Z0-9][a-zA-Z0-9.]{4,28}[a-zA-Z0-9]@gmail\.com$/
 
gmailButton.onclick = (event) => {
    event.preventDefault()
 
    const value = gmailInput.value.trim()
 
    if (gmailRegex.test(value)) {
        gmailResult.textContent = 'Почта валидна'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.textContent = 'Почта невалидна'
        gmailResult.style.color = 'red'
    }
}

const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')
 
const moveChildBlock = (positionX = 0, positionY = 0) => {
    const step = 1
    const maxRight = parentBlock.clientWidth - childBlock.offsetWidth
    const maxDown = parentBlock.clientHeight - childBlock.offsetHeight

    if (positionX >= maxRight && positionY >= maxDown) {
        childBlock.style.left = `${maxRight}px`
        childBlock.style.top = `${maxDown}px`
        return
    }
 
    childBlock.style.left = `${positionX}px`
    childBlock.style.top = `${positionY}px`

    if (positionX < maxRight) {
        positionX += step
    } else if (positionY < maxDown) {
        positionY += step
    }
 
    requestAnimationFrame(() => moveChildBlock(positionX, positionY))
}
 
window.addEventListener('load', () => moveChildBlock())





const secondsBlock = document.querySelector('#seconds')
const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')
const resetBtn = document.querySelector('#reset')
 
let seconds = 0
let timerId = null 

startBtn.addEventListener('click', () => {
    if (timerId !== null) return
 
    timerId = setInterval(() => {
        seconds++
        secondsBlock.textContent = seconds
    }, 1000)
})
 
stopBtn.addEventListener('click', () => {
    clearInterval(timerId)
    timerId = null
})

resetBtn.addEventListener('click', () => {
    clearInterval(timerId) 
    timerId = null
    seconds = 0
    secondsBlock.textContent = seconds
})





const firstPromise = new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.5

    if (isSuccess) {
        resolve({name: 'John', description: 'killer'})
    } else {
        reject('Не удалось получить пользователя')
    }
})
 
firstPromise
    .then(
        (user) => {
            console.log('Первый промис исполнился', user)
 
            return new Promise((resolve, reject) => {
                const isSuccess = Math.random() > 0.5

                if (isSuccess) {
                    resolve('Данные пользователя успешно обработаны')
                } else {
                    reject('Ошибка при обработке данных пользователя')
                }
            })
        },
        (error) => {
            console.log('Первый промис провалился', error)

            return new Promise((resolve, reject) => {
                reject('Второй промис не запущен, так как первый провалился')
            })
        }
    )
    .then(
        (result) => {
            console.log('Второй промис исполнился', result)
        },
        (error) => {
            console.log('Второй промис провалился', error)
        }
    )