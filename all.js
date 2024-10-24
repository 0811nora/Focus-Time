const newDate = document.querySelector(".new-date");
const time = document.querySelector(".time");
const timeZone = document.querySelector(".utc");
const countDown = document.querySelector(".count-down");
const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");
const timeTitle= document.querySelector(".time-title");
const setFocus= document.querySelector(".set-focus");
const setRest= document.querySelector(".set-rest");



let startTimer;
let restTimer;
let defaulStartTime = 1500; //這邊單位為秒
let defaulRestTime = 300;
let startNum = defaulStartTime;
let restNum = defaulRestTime;
let setFocusTime;
let setRestTime;
let formattedTime;
let minutes;
let seconds;


const restSound = new Audio("material/rest.mp3"); // 加入音頻
restSound.volume = 0.7; // 設定音量大小0.0 ~ 1.0

const startSound = new Audio("material/Start.mp3");
startSound.volume = 0.7;

let defaulcountDownTime = countDown.innerHTML = `${Math.floor(startNum / 60)}:${startNum % 60 < 10 ? '0' : ''}${startNum % 60}`; 
//使用 Math.floor 取得 startNum 轉換成的分鐘數
//使用 %（取餘運算）取得 startNum 轉換成的秒數，如75秒取15秒





//-------取得背景套件-------------
particlesJS.load('particles-js', 'particlesjs-config.json', function() {
    console.log('callback - particles.js config loaded');
});

// 把效果載入到 id="particles-js" 的元素中。
// 使用 particlesjs-config.json 的配置來決定粒子的行為和樣式。



//-------設定時區、日期、時間-------
function updateTime(){
    let today = new Date();  //回傳當前的 timestamp（毫秒），這個毫秒是從 1970 年 1 月 1 日累積至當下的毫秒數
    let utc = today.getTimezoneOffset();
    let year = today.getFullYear();
    let month = today.getMonth(); //取得當前月份，月份是從0開始，所以顯示結果要記得+1
    let date = today.getDate(); //取得該月份的幾號
    let week = today.getDay(); //取得該日為星期幾，它的計算方式是從禮拜天＝0開始計算
    let hour = today.getHours().toString().padStart(2, '0'); //取得小時資訊
    let min = today.getMinutes().toString().padStart(2, '0'); //取得分鐘資訊
    let second = today.getSeconds().toString().padStart(2, '0'); //取得秒資訊
    //使用 toString().padStart(2, '0') 來將分鐘和秒數格式化為兩位數。這樣當分鐘或秒數小於 10 時，自動在前面補上一個 0。
    

    const allWeek = [
        "SUN","MON","TUE","WED","THU","FRI","SAT"
    ]; //透過數字索引輕鬆取得相應的字串(0~6)
    
    const allMonth = [
        "JAN","FEB","MAR","APR","MAY","JUN",
        "JUL","AUG","SEP","OCT","NOV","DEC"
    ];//透過數字索引輕鬆取得相應的字串(0~11)
    
    let weekName = allWeek[week]; 
    let monthName = allMonth[month];
    // allWeek[week] 表示用變數 week 的值來動態決定要取得陣列中的哪個元素。
    // 假設 week 的值是 3，weekName 會變成 allWeek[3]，也就是 "WED"。
    
    let allDay = `${weekName} - ${monthName} . ${date} . ${year}`;  // 日期顯示的值
    let allTime = `${hour}:${min}:${second}`; //時間顯示的值
    
    let uctHour = - utc / 60 ; //uctHour = - (-480) / 60; 計算出來是 8。
    let utcString = `GMT${uctHour >=0 ? '+' : ''}${uctHour}`;
    //?:三元運算符
    //條件 ? 表達式1 : 表達式2

    newDate.innerHTML = allDay;
    time.innerHTML = allTime;
    timeZone.innerHTML = utcString;
    
}

setInterval(updateTime, 1000);
//setInterval:用來設定一個週期性執行的動作
//updateTime：表示每隔一段時間執行 updateTime 函式。
//1000：表示每隔 1000 毫秒（1 秒）執行一次 updateTime。

updateTime();


//------倒數計時器------

//定義主要轉碼成一般顯示的分鐘與秒數
function updateCountDown (timeInSeconds){
    minutes = Math.floor(timeInSeconds / 60);
    seconds = timeInSeconds % 60;
    
    formattedTime = `${minutes}:${seconds < 10 ? '0':''}${seconds}`;
    //使用 Math.floor 取得 startNum 轉換成的分鐘數
    //使用 %（取餘運算）取得 startNum 轉換成的秒數，如75秒取15秒

    countDown.innerHTML = formattedTime;
}

// 按下[開始計時鍵]執行
function start(){

    updateCountDown(startNum); 
    // 函式的變數startNum所設定的時間，可能是預設也可能是使用者設定後的值

    if(setFocusTime){ 
        timeTitle.textContent = `Focus Time ${setFocusTime} Mins`;
    }else{
        timeTitle.textContent = `Focus Time ${minutes} Mins`;
    } //如果有設定[Focus Time]，就顯示設定的時間，沒有就顯示預設的時間。


    startTimer = setInterval(function(){ //setInterval(function(){}1000);
        startNum --; 
        //使用 setInterval 設定每隔 1000 毫秒重複執行函式
            //每次 setInterval 執行時，讓 startNum減少 1 秒。
            //startNum-- 表達式會讓 startNum 的值減少 1
            
            
        if(startNum <= 0){ //如果startNum <= 0才會執行
            clearInterval(startTimer); // 停止計時器
            startNum = 0; //clearInterval 的作用只是停止計時器的執行，不會把startNum =0，所以需要加這一行
            restNum = defaulRestTime; //設定休息時間
            
            restSound.play(); //播放休息的音樂
            restTiming();  //執行休息時間的計時
            Swal.fire(" Rest Time !");  //使用套件的談窗

            
        }
        updateCountDown(startNum);  //更新倒數時間
    },1000); 
 }
       

 // start()執行完以後，接著執行[休息時間的計時]
function restTiming(){
    updateCountDown(restNum); //更新時間為:"休息時間"的設定時間或預設時間

    if(setRestTime){ //
        timeTitle.textContent = `Rest Time ${setRestTime} Mins`;;
    }else{
        timeTitle.textContent = `Rest Time ${minutes} Mins`;
    }//如果有設定[Rest Time]，就顯示設定的時間，沒有就顯示預設的時間。

    restTimer = setInterval(function(){ 
        restNum -- ;
            
        if(restNum <= 0){
            clearInterval(restTimer);
            restNum  = 0;
            startNum = defaulStartTime; 

            startSound.play();

            start();// 回到focus時間計時

            Swal.fire(" Focus Time !");

        }

        updateCountDown(restNum);
    }, 1000);
}


//-------按鈕們-------

// Play按鈕(start)
btnStart.addEventListener("click", function(){
    clearInterval(startTimer); // 停止計時focus Time ，確保計時器不重複啟動
    clearInterval(restTimer); // 停止計時Rest Time，確保計時器不重複啟動
    start(); // 開始工作時間計時
    btnStart.disabled = true; // play按鈕禁能
    setFocus.disabled = true; // 設定紐禁能
    setRest.disabled = true;

});

// Stop按鈕
btnStop.addEventListener("click", function(){
    clearInterval(startTimer);
    clearInterval(restTimer);
    startNum = defaulStartTime; //focus time等於預設時間
    restNum = defaulRestTime; // rest time等於預設時間
    
    btnStart.disabled = false; //play按鈕取消禁能
    setFocus.disabled = false; //設定紐取消禁能
    setRest.disabled = false;
    timeTitle.textContent = "Pomodoro Click";

    if(setFocusTime){ 
        const minutes = Math.floor(setFocusTime);
        countDown.innerHTML = `${minutes}:${(0).toString().padStart(2, '0')}`;
    }else{
        countDown.innerHTML = defaulcountDownTime;
    } //按下停止鍵時，如果有設定過時間，那就顯示設定的時間，如果沒有設定過，就是顯示預設的時間。

})


// 設定foucs Time(專注時間)
setFocus.addEventListener("click",function(){
    setFocusTime = prompt("Please enter focus time in minutes.");
    // 使用prompt()方法進行設定

    if(setFocusTime && !isNaN(setFocusTime)){
        timeTitle.textContent = `Focus Time ${setFocusTime} Mins`;
        // 如果設定的時間是數字的話就，Title顯示變成設定時間。
        //isNaN:如果填入的資料是數字會返回false，加了[!]表示反運算，所以會返回true。(is not a number)

        startNum = parseInt(setFocusTime) * 60;
        // 專注時間等於新設定的時間，轉為"數值"，因prompt輸入的值為字串。
        // 將設定的數字 * 60，轉換為秒數

        defaulStartTime = startNum; 
        //將預設時間改為新的設定值

        updateCountDown(startNum);
    }else if(setFocusTime === null){ //點取消會回傳null
        return; //函數將執行 return;，這會使事件處理器提前結束，避免顯示警告。
    }else{
        alert("Please enter a valid number.");
        //輸入不是數字就按確認，會跳提示。
    }
});

// 設定Rest Time(休息時間)
setRest.addEventListener("click",function(){
    setRestTime = prompt("Please enter rest time in minutes.");

    if(setRestTime && !isNaN(setRestTime)){
        timeTitle.textContent = `Rest Time ${setRestTime} Mins`;
        restNum = parseInt(setRestTime) * 60;
        defaulRestTime = restNum; 
        updateCountDown(restNum);
    }else if(setRestTime === null){
        return;
    }else{
        alert("Please enter a valid number.");
    }
});


