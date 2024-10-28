const newDate = document.querySelector(".new-date");
const time = document.querySelector(".time");
const timeZone = document.querySelector(".utc");
const countDown = document.querySelector(".count-down");
const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");
const timeTitle = document.querySelector(".time-title");
const setFocus = document.querySelector(".set-focus");
const setRest = document.querySelector(".set-rest");
const setFocusArea = document.querySelector(".set-focus-area");
const setRestArea = document.querySelector(".set-rest-area");
const setFocusInput = document.querySelector(".set-focus-input");
const setFocusBtn = document.querySelector(".set-focus-btn");
const setRestInput = document.querySelector(".set-rest-input");
const setRestBtn = document.querySelector(".set-rest-btn");
const closeFocusBtn = document.querySelector(".close-focus-btn");
const closeRestBtn = document.querySelector(".close-rest-btn");
const setFocusMessage = document.querySelector(".set-focus-message");
const setRestMessage = document.querySelector(".set-rest-message");



let startTimer;
let restTimer;
let defaulFocusTime = 1500; //這邊單位為秒
let defaulRestTime = 300;
let focusNum = defaulFocusTime;
let restNum = defaulRestTime;
let setFocusTime;
let setRestTime;
let formattedTime;
let hours;
let minutes;
let seconds;
// let newFocusTime;
let newRestTime;


const restSound = new Audio("material/rest.mp3"); // 加入音頻
restSound.volume = 0.7; // 設定音量大小0.0 ~ 1.0

const startSound = new Audio("material/Start.mp3");
startSound.volume = 0.7;

let defaulcountDownTime = countDown.innerHTML = `${Math.floor(focusNum / 60)}:${focusNum % 60 < 10 ? '0' : ''}${focusNum % 60}`; 
//使用 Math.floor 取得 focusNum 轉換成的分鐘數
//使用 %（取餘運算）取得 focusNum 轉換成的秒數，如75秒取15秒





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

//定義主要轉碼成一般顯示的小時/分鐘/秒數
function updateCountDown (timeInSeconds){
    hours = Math.floor(timeInSeconds / 3600);  //1小時 = 60*60(秒) 
    minutes = Math.floor(timeInSeconds % 3600 / 60);
    seconds = timeInSeconds % 60;
    //使用 Math.floor 取得"變數"轉換成的分鐘數
    //使用 %（取餘運算）取得"變數"轉換成的秒數，如75秒取15秒
    
    formattedTime = `${hours > 0 ? hours + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    // hours = 1
    // 1 > 0 成立，那 1 +: = 會顯示 [ 1: ]，如果 >0 就是空字串。
 
    countDown.innerHTML = formattedTime;
}

// 按下[開始計時鍵]執行
function start(){

    focusNum = setFocusTime ? parseInt(setFocusTime) * 60 : defaulFocusTime;
    updateCountDown(focusNum); 
    // 函式的變數focusNum所設定的時間，可能是預設也可能是使用者設定後的值

    if(setFocusTime){ 
        timeTitle.textContent = `Focus Time ${setFocusTime} Mins`;
    }else{
        timeTitle.textContent = `Focus Time ${minutes} Mins`;
    } //如果有設定[Focus Time]，就顯示設定的時間，沒有就顯示預設的時間。


    startTimer = setInterval(function(){ //setInterval(function(){}1000);
        focusNum --; 
        //使用 setInterval 設定每隔 1000 毫秒重複執行函式
            //每次 setInterval 執行時，讓 focusNum減少 1 秒。
            //focusNum-- 表達式會讓 focusNum 的值減少 1
            
            
        if(focusNum <= 0){ //如果focusNum <= 0才會執行
            clearInterval(startTimer); // 停止計時器
            focusNum = 0; //clearInterval 的作用只是停止計時器的執行，不會把focusNum =0，所以需要加這一行
            restNum = defaulRestTime; //設定休息時間
            
            restSound.play(); //播放休息的音樂
            restTiming();  //執行休息時間的計時
            Swal.fire(" Rest Time !");  //使用套件的談窗

            
        }
        updateCountDown(focusNum);  //更新倒數時間
    },1000); 
 }
       

 // start()執行完以後，接著執行[休息時間的計時]
function restTiming(){

    restNum = setRestTime ? parseInt(setRestTime) * 60 : defaulRestTime;
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
            focusNum = defaulFocusTime; 

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
    setFocusArea.classList.remove("area");
    setRestArea.classList.remove("area");
    start(); // 開始工作時間計時
    btnStart.disabled = true; // play按鈕禁能
    setFocus.disabled = true; // 設定紐禁能
    setRest.disabled = true;

});

// Stop按鈕
btnStop.addEventListener("click", function(){
    clearInterval(startTimer);
    clearInterval(restTimer);
    focusNum = defaulFocusTime; //focus time等於預設時間
    restNum = defaulRestTime; // rest time等於預設時間
    
    btnStart.disabled = false; //play按鈕取消禁能
    setFocus.disabled = false; //設定紐取消禁能
    setRest.disabled = false;
    timeTitle.textContent = "Pomodoro Click";

    if(setFocusTime){ 

        let totalsecond = parseInt(setFocusTime) * 60; 
        // 因為setFocusTime是分鐘為單位，需要先轉成秒數

        hours = Math.floor(totalsecond / 3600);  
        minutes = Math.floor(totalsecond % 3600 / 60);
        seconds = totalsecond % 60;
       
        formattedTime = `${hours > 0 ? hours + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        countDown.innerHTML = formattedTime;

    }else{
        countDown.innerHTML = defaulcountDownTime;
    } //按下停止鍵時，如果有設定過時間，那就顯示設定的時間，如果沒有設定過，就是顯示預設的時間。

    
        
})



//---- 設定Focus時間以後要做的事情的函式 ----
function setNewFocusTime(){
    setFocusTime = setFocusInput.value;
    console.log(setFocusTime);

    if(setFocusTime && !isNaN(setFocusTime) && parseFloat(setFocusTime) > 0){
        timeTitle.textContent = `Focus Time ${setFocusTime} Mins`;
        setFocusMessage.innerHTML = "Set successfully !";
        setFocusMessage.style.color = "#31ea37";
        setFocusInput.value = "";

        // 如果設定的時間是數字的話就，Title顯示變成設定時間。
        //isNaN:如果填入的資料是數字會返回false，加了[!]表示反運算，所以會返回true。(is not a number)

        focusNum = parseInt(setFocusTime) * 60;
        // 專注時間等於新設定的時間，轉為"數值"，因prompt輸入的值為字串。
        // 將設定的數字 * 60，轉換為秒數

        defaulFocusTime = focusNum; 
        //將預設時間改為新的設定值

        updateCountDown(focusNum);

    }else if( parseFloat(setFocusTime) <= 0 ){
        setFocusMessage.innerHTML = "The number must be greater than 0.";
        setFocusMessage.style.color = "yellow";
        setFocusInput.value = "";

    }else{
        setFocusMessage.innerHTML = "Please enter a valid number.";
        setFocusMessage.style.color = "yellow";
        setFocusInput.value = "";
        //輸入不是數字就按確認，會跳提示。
    };

};

//---- 設定rest時間以後要做的事情的函式 ----
function setNewRestTime(){
    setRestTime = setRestInput.value;
    console.log(setRestTime);

    if(setRestTime && !isNaN(setRestTime) && parseFloat(setRestTime) > 0){
        timeTitle.textContent = `Focus Time ${setRestTime} Mins`;
        setRestMessage.innerHTML = "Set successfully !";
        setRestMessage.style.color = "#31ea37";
        setRestInput.value = "";

        restNum = parseInt(setRestTime) * 60;
        defaulRestTime = restNum; 
        updateCountDown(restNum);

    }else if( parseFloat(setRestTime) <= 0 ){
        setRestMessage.innerHTML = "The number must be greater than 0.";
        setRestMessage.style.color = "yellow";
        setRestInput.value = "";
    }else{
        setRestMessage.innerHTML = "Please enter a valid number.";
        setRestMessage.style.color = "yellow";
        setRestInput.value = "";
  
    };
};

//---- 使用Enter 送出的函式 ----
function foucsEnter(event){
    if (event.keyCode === 13) { 
        event.preventDefault();
        setNewFocusTime();
    }
}

function restEnter(event){
    if (event.keyCode === 13) { 
        event.preventDefault();
        setNewRestTime();
    }
}



// 設定foucs Time(專注時間)
setFocus.addEventListener("click",function(){
    setFocusArea.classList.add("area");
    setFocusMessage.innerHTML = "(Enter minutes)";
    setFocusMessage.style.color = "#dddddd";

    // 先移除任何現有的事件監聽器，以防止重複綁定
    setFocusBtn.removeEventListener("click", setNewFocusTime);
    setFocusInput.removeEventListener("keydown", foucsEnter);

    // 添加新的事件監聽器
    setFocusBtn.addEventListener("click", setNewFocusTime);
    setFocusInput.addEventListener("keydown", foucsEnter);


    closeFocusBtn.addEventListener("click", function(){
        setFocusInput.value = "";
        setFocusMessage.innerHTML = "";
        setFocusArea.classList.remove("area");
    })
});




// 設定Rest Time(休息時間)
setRest.addEventListener("click",function(){
    setRestArea.classList.add("area");
    setRestMessage.innerHTML = "(Enter minutes)";
    setRestMessage.style.color = "#dddddd";

    setRestBtn.removeEventListener("click", setNewRestTime);
    setRestInput.removeEventListener("keydown", restEnter);

    // 添加新的事件監聽器
    setRestBtn.addEventListener("click", setNewRestTime);
    setRestInput.addEventListener("keydown", restEnter);

    closeRestBtn.addEventListener("click", function(){
        setRestInput.value = "";
        setRestMessage.innerHTML = "";
        setRestArea.classList.remove("area");
    })
});

    


// TO DO
// V  1. 設定框改到中間 
// V  2. 設定時間以後，按在play 再次設定會跑版
// V  3. input 為什麼沒辦法輸入英文?
// V. 4. 設定小時的時間以後，按下停止，他會變成分鐘的時間計算
// V  5. rest的設定時間還沒有寫
// V  6. 設定時間十，會出現紅字
// 7. 按 enter會出現紅字
// 8. 手機使用沒有音效