const myVideo = document.querySelector('video');
const playBtn = document.querySelector('.toggle')
const inputBtn = document.querySelectorAll('input')
const processbar_out = document.querySelector('.progress') 
const processbar = document.querySelector('.progress__filled')  
const skipbtn = document.querySelectorAll('.player__button[data-skip]')

//影片播放
function playToggle(e){
  //播放時要暫停，暫停時要播放
  //console.log(e)
  playBtn.innerHTML = myVideo.paused ? '❚❚' : '►'
  if(myVideo.paused){
    myVideo.play()
  }else{
    myVideo.pause()
  }
}
myVideo.addEventListener('click',playToggle)
playBtn.addEventListener('click',playToggle)

//控制聲音或播放速度
//這邊就可以解釋為什麼要一次選那麼多input
//透過input不同的name做不同的操作
function setHandler(e){
  const inputName = this.name
  const inputValue = this.value
  console.log(myVideo.volume)

  //myVideo[inputName] = inputValue
}
inputBtn.forEach((input)=>{
  input.addEventListener('input',setHandler)
})

//快進快退
function skipHandler(){
  console.log(this.dataset.skip)
  myVideo.currentTime += parseInt(this.dataset.skip) //轉化成數字 或直接*1
}
skipbtn.forEach((btn)=>{
  btn.addEventListener('click',skipHandler)
})

//進度條
processbar.style.flexBasis = 0 //先歸零
myVideo.addEventListener('timeupdate',function(){
  let allTime = this.duration
  let progress = this.currentTime
  percent = (progress/allTime)*100
  processbar.style.flexBasis = percent +'%' 
})

//滑鼠位置直接控制時間
function gotoTime(e){
  let getPercent = (e.offsetX/this.offsetWidth)*100//將百分比轉換回該影片實際時間位置
  let currentTime = (getPercent*myVideo.duration)/100
  processbar.style.flexBasis = getPercent +'%'
  myVideo.currentTime = currentTime
}

processbar_out.addEventListener('mousedown', addListener);
//當有mousedown時,從重新偵聽事件(加入mousemove)
function addListener (e) {
  processbar_out.addEventListener('mousedown', gotoTime);
  processbar_out.addEventListener('mousemove', gotoTime);
};

document.addEventListener('mouseup', function(){
  processbar_out.removeEventListener('mousemove', gotoTime);
});
