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

const moveChildBlock = (position = 0) => {
    const step = 1 
    const maxPosition = parentBlock.clientWidth - childBlock.offsetWidth 

    if (position >= maxPosition) {
        childBlock.style.left = `${maxPosition}px`
        return
    }

    childBlock.style.left = `${position}px`

    requestAnimationFrame(() => moveChildBlock(position + step))
}

window.addEventListener('load', () => moveChildBlock())