const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');


timerEl.innerText = '00:00:00'
inputEl.focus()

if (inputEl.value === '') {
  buttonEl.disabled = true
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    setTimer(seconds)

    buttonEl.disabled = true;
    inputEl.disabled = true;

      let nIntervId = setInterval( ()=>{
            seconds = (seconds) - 1
            setTimer(seconds)
            if (seconds === 0) {
              clearInterval(nIntervId)
              buttonEl.disabled = false;
              inputEl.disabled = false;
              inputEl.focus()
              timerEl.innerText = 'Время вышло!'

              setTimeout(()=>{
                timerEl.innerText = 'Введите новое значение'
              },1500)
              setTimeout(()=>{
                timerEl.innerText = '00:00:00'
              },4500)
            } 
      },1000)
  }
};

const animateTimer = createTimerAnimator();

//Функция добавления нуля
function getZero(num){
  if (num >= 0 && num < 10) {
    return `0${num}`
  } else {
    return num;
  }
}
//Делаем кнопку start не активной если input пуст
inputEl.addEventListener('input', () => {
  if (inputEl.value !== '') {
    buttonEl.disabled = false
  } else {
    buttonEl.disabled = true
  }
});

// Отображаем числовое значение таймера в DOM элементе
function setTimer(total) {
  const hours = getZero(Math.floor(total / 60 / 60))
  const minutes = getZero(Math.floor(total / 60) - (hours * 60))
  const seconds = getZero(total % 60)

  timerEl.innerText = `${hours}:${minutes}:${seconds}`

  if (total > 86399) {
    timerEl.innerText = 'Слишком большое значение!'
  }
}

// Назначаем слушатель событий на кнопку "start" и по "клику" запускаем наш таймер
buttonEl.addEventListener('click', () => {
  startTimer()
});
// Назначаем слушатель событий по нажатию на клавишу клавиатуры Enter и запускаем таймер
window.addEventListener('keypress', (e)=>{
  if (e.key === "Enter") {
    startTimer()
  }
})
// Функция запуска таймера (инициализация)
function startTimer() {
  const seconds = Number(inputEl.value);
  if (seconds !== 0 && (Number.isInteger(seconds) == true)) {
    animateTimer(seconds);
    inputEl.value = '';
  } 

}