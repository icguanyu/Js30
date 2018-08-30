const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then(function(localMediaStream) {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
      console.log(video.src);
    })
    .catch(err => {
      console.log(err);
      alert("請開啟相機");
    });
}

function normalPaint() {
  ctx.drawImage(video, 0, 0, ww, wh);
  requestAnimationFrame(normalPaint);
}

function takePhoto() {
  //拍照聲音
  snap.currentTime = 0;
  snap.play();
  //產出一張圖片的url
  const dataURL = canvas.toDataURL();
  //console.log(dataURL)
  const link = document.createElement("a");
  link.href = dataURL;
  link.setAttribute("download", "下載的檔案名稱");
  link.innerHTML = `<img src="${dataURL}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
  //strip.appendChild(link)
}

getVideo();

video.addEventListener("canplay", function() {
  ww = canvas.width = video.videoWidth;
  wh = canvas.height = video.videoHeight;
  //主要用來取得正確比例
  requestAnimationFrame(normalPaint);
});
