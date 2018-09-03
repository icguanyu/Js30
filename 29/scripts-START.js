let countdown;
const timer_btn = document.querySelectorAll('.timer__button')
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

function startTimer(seconds){
  clearInterval(countdown);//關閉正在執行的倒數
  const now =  Date.now() //取得現在的timestamp
  const deadline = now + seconds*1000 //截止時間

  formatTime(seconds) //馬上顯示起始時間
  formatDeadline(deadline)//馬上顯示結束時間

  countdown = setInterval(()=>{
    const remain = Math.round((deadline - Date.now())/1000)
    //小於0就停止計時
    if(remain < 0) {
      clearInterval(countdown);
      return;
    }
    formatTime(remain)//傳remain值去做格式化並顯示
  },1000)
}

function formatTime(remain){
  const min = Math.floor(remain/60)
  const sec = remain%60
  const show = `${min}:${sec < 10 ? '0' : '' }${sec}`
  document.title = show;
  timerDisplay.textContent = show;
}

function formatDeadline(deadline){
  const end = new Date(deadline)//直接把timestamp轉乘時間格式
  const hour = end.getHours()
  const min = end.getMinutes()
  endTime.textContent = `到期時間：${hour}:${min}`
}

function getTime(){
  const getSec = parseInt(this.dataset.time)
  startTimer(getSec)
}

timer_btn.forEach((btn)=>{btn.addEventListener('click',getTime)})
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();//關閉預設送出功能
  const customval = this.minutes.value
  startTimer(customval*60)
  this.reset();//重設表單
})
