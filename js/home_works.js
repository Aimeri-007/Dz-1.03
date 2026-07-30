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




// ========================================
// Дз номер 3.
// ========================================
// №1

    function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldFail ? reject(new Error(`Ошибка при обработке: ${value}`)) : resolve(value)
        }, ms)
    })
}
 
console.log('--- Задание 1')
 
delay(1, 500)
    .then((value) => {
        console.log('Шаг 1 выполнен, значение:', value)
        return delay(value + 1, 500, true)
    })
    .then((value) => {
        console.log('Шаг 2 выполнен, значение:', value)
        return delay(value + 1, 500)
    })
    .catch((error) => {
        console.log('Поймали ошибку в .catch:', error.message)
    })
    .finally(() => {
        console.log('Задание 1 завершено (.finally сработал в любом случае)')
    })
 
 
// №2
 
async function runChainWithAwait() {
    console.log('--- Задание 2')
 
    try {
        const firstValue = await delay(1, 500)
        console.log('Шаг 1 выполнен, значение:', firstValue)
 
        const secondValue = await delay(firstValue + 1, 500, true) 
        console.log('Шаг 2 выполнен, значение:', secondValue)
 
        const thirdValue = await delay(secondValue + 1, 500) 
        console.log('Шаг 3 выполнен, значение:', thirdValue)
    } catch (error) {
        console.log('Поймали ошибку в try/catch:', error.message)
    } finally {
        console.log('Задание 2 завершено (finally сработал в любом случае)')
    }
}
 
runChainWithAwait()
 

// Усложнённая часть задания 2
 
async function processValuesSequentially(values) {
    console.log('--- Задание 2 (усложнение)')
 
    const results = []
 
    for (const value of values) {
        try {
            const shouldFail = Math.random() > 0.7
            const processedValue = await delay(value, 500, shouldFail)
 
            results.push({value: processedValue, error: null})
        } catch (error) {
            results.push({value, error: error.message})
        }
    }
 
    console.log('Результат обработки массива:', results)
    return results
}
 
processValuesSequentially([1, 2, 3, 4])
 
 
// №3

const getParallelDelays = () => [
    delay(1, 1000),
    delay(2, 1500, true), 
    delay(3, 800),
    delay(4, 1200)
]
 
async function runWithPromiseAll() {
    console.log('--- Задание 3')
 
    try {
        const results = await Promise.all(getParallelDelays())
        console.log('Все промисы выполнены успешно:', results)
    } catch (error) {
        console.log('Promise.all упал при первой же ошибке:', error.message)
    }
}
 
runWithPromiseAll()

async function runWithPromiseAllSettled() {
    console.log('--- Задание 3: Promise.allSettled ---')
 
    const results = await Promise.allSettled(getParallelDelays())
 
    const succeeded = results
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value)
 
    const failed = results
        .filter((result) => result.status === 'rejected')
        .map((result) => result.reason.message)
 
    console.log('Успешные:', succeeded)
    console.log('Проваленные:', failed)
}
 
runWithPromiseAllSettled()
 

async function runWithPromiseRace() {
    console.log('--- Задание 3: Promise.race ---')
 
    try {
        const result = await Promise.race([
            delay('полезные данные', 2000),
            delay('таймаут', 500, true)
        ])
        console.log('Успел раньше:', result)
    } catch (error) {
        console.log('Гонку выиграл таймаут (ошибка):', error.message)
    }
}
 
runWithPromiseRace()
 



// Дз номер 4.

const defaultImage = 'https://api.dicebear.com/7.x/adventurer/svg?seed=Default'
 
const charactersList = document.querySelector('.characters-list')
 
fetch('../data/characters.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Ошибка загрузки characters.json: ${response.status}`)
        }
        return response.json()
    })
    .then((characters) => {
        characters.forEach((character) => {
            const card = document.createElement('div')
            card.classList.add('character-card')
 
            card.innerHTML = `
                <div class="character-photo">
                    <img src="${character.person_photo || defaultImage}" alt="${character.name}">
                </div>
                <h4>${character.name}</h4>
                <p>Возраст: ${character.age}</p>
            `
 
            charactersList.appendChild(card)
        })
    })
    .catch((error) => {
        console.log('Не удалось загрузить персонажей:', error.message)
    })
 
 
 
fetch('../data/bio.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Ошибка загрузки bio.json: ${response.status}`)
        }
        return response.json()
    })
    .then((bio) => {
        console.log('Информация обо мне:', bio)
    })
    .catch((error) => {
        console.log('Не удалось загрузить bio.json:', error.message)
    })
 




 
const registrationForm = document.querySelector('#registration_form')
const agreementCheckbox = document.querySelector('#reg_agreement')
const submitJsonBtn = document.querySelector('#submit_json')
const submitFormDataBtn = document.querySelector('#submit_formdata')
const registrationResult = document.querySelector('#registration_result')
 
const API_URL = 'https://jsonplaceholder.typicode.com/posts'
 
agreementCheckbox.addEventListener('change', () => {
    submitJsonBtn.disabled = !agreementCheckbox.checked
    submitFormDataBtn.disabled = !agreementCheckbox.checked
})
 
const showResult = (message, isError = false) => {
    registrationResult.textContent = message
    registrationResult.style.color = isError ? 'red' : 'green'
}
 
// ---- Вариант 1
 
submitJsonBtn.addEventListener('click', async () => {

    if (!agreementCheckbox.checked) {
        showResult('Сначала нужно согласиться на обработку данных', true)
        return
    }
 

    if (!registrationForm.checkValidity()) {
        registrationForm.reportValidity()
        return
    }
 
    const formData = new FormData(registrationForm)
 
    const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        age: formData.get('age'),
        bio: formData.get('bio'),
        gender: formData.get('gender')
    }
 
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
 
        if (!response.ok) {
            throw new Error(`Сервер ответил с ошибкой: ${response.status}`)
        }
 
        const result = await response.json()
        console.log('Ответ сервера (JSON):', result)
        showResult('Данные успешно отправлены как JSON')
    } catch (error) {
        
        console.log('Ошибка при отправке JSON:', error.message)
        showResult(`Ошибка при отправке: ${error.message}`, true)
    }
})
 
// ---- Вариант 2
 
submitFormDataBtn.addEventListener('click', async () => {
    if (!agreementCheckbox.checked) {
        showResult('Сначала нужно согласиться на обработку данных', true)
        return
    }
 
    if (!registrationForm.checkValidity()) {
        registrationForm.reportValidity()
        return
    }
 
    
    const formData = new FormData(registrationForm)
 
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
          
            body: formData
        })
 
        if (!response.ok) {
            throw new Error(`Сервер ответил с ошибкой: ${response.status}`)
        }
 
        const result = await response.json()
        console.log('Ответ сервера (FormData):', result)
        showResult('Данные успешно отправлены как FormData')
    } catch (error) {
        console.log('Ошибка при отправке FormData:', error.message)
        showResult(`Ошибка при отправке: ${error.message}`, true)
    }
})
 




 
const btnNextTodo = document.querySelector('#btn-next-todo')
const btnPrevTodo = document.querySelector('#btn-prev-todo')
const todoCard = document.querySelector('.todo_card')
 
const MIN_TODO_ID = 1
const MAX_TODO_ID = 200
 
let currentTodoId = 1
 
const BASE_URL_TODOS = 'https://jsonplaceholder.typicode.com/todos/'
 
const fetchTodo = async (id = 1) => {
    try {
        const response = await fetch(BASE_URL_TODOS + id)
        if (!response.ok) throw new Error('Error network')
 
        const data = await response.json()
        const {id: idCard, completed, title} = data
        const color = completed ? 'green' : 'red'
 
        todoCard.style.borderColor = color
        todoCard.innerHTML = `
            <p>ID - ${idCard}</p>
            <p>${title}</p>
            <p style="color:${color}">${completed ? 'Completed' : 'Not completed'}</p>
        `
    } catch (error) {
        todoCard.style.borderColor = 'red'
        todoCard.innerHTML = `
            <p style="color:red">${error.message}</p>
        `
    }
}
 

const goToTodoId = (step) => {
    let newId = currentTodoId + step

    if (newId > MAX_TODO_ID) {
        newId = MIN_TODO_ID
    }
 
    if (newId < MIN_TODO_ID) {
        newId = MAX_TODO_ID
    }
 
    currentTodoId = newId
    fetchTodo(currentTodoId)
}
 
fetchTodo(currentTodoId)
 
btnNextTodo.onclick = () => goToTodoId(1)
btnPrevTodo.onclick = () => goToTodoId(-1)