const correctPassword = "beijing2025";

const attractionsInfo = {
    "故宮": "故宮博物院是明清皇宮，擁有豐富文物，紫禁城建築宏偉，建議參觀太和殿與御花園，感受皇室輝煌。",
    "長城": "八達嶺長城氣勢磅礴，登高遠眺山河壯麗，建議穿舒適鞋，體驗古代防禦工程的雄偉。",
    "天安門廣場": "天安門廣場是北京心臟，人民英雄紀念碑莊嚴，觀升旗儀式，感受國家歷史的厚重。",
    "頤和園": "頤和園是皇家園林，昆明湖與十七孔橋美不勝收，漫步長廊，享受湖光山色的寧靜。",
    "天壇": "天壇是祭天聖地，圜丘壇與祈年殿建築精美，感受古代帝王祭祀文化，園內古樹參天。",
    "北海公園": "北海公園湖光潋灩，白塔與瓊島相映成趣，划船湖上，體驗老北京的悠閒時光。",
    "王府井": "王府井大街熱鬧非凡，美食小吃琳琅滿目，夜市購物樂趣無窮，體驗北京現代風情。",
    "鳥巢": "鳥巢是奧運地標，國家體育場設計前衛，夜間燈光璀璨，感受現代北京的活力與魅力。"
};

function checkPassword() {
    const input = document.getElementById("password-input").value;
    const errorMessage = document.getElementById("error-message");
    
    if (input === correctPassword) {
        document.getElementById("password-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        errorMessage.textContent = "";
    } else {
        errorMessage.textContent = "密碼錯誤，請重試！";
    }
}

function formatTime(hours, minutes) {
    const period = hours >= 12 ? "下午" : "上午";
    const hour = hours % 12 === 0 ? 12 : hours % 12;
    return `${period} ${hour}:${minutes.toString().padStart(2, '0')}`;
}

function generateItinerary() {
    const checkboxes = document.querySelectorAll(".attractions input[type='checkbox']:checked");
    const warningMessage = document.getElementById("warning-message");
    const itineraryList = document.getElementById("itinerary-list").querySelector("tbody");
    const itineraryResult = document.getElementById("itinerary-result");
    
    warningMessage.textContent = "";
    itineraryList.innerHTML = "";
    
    if (checkboxes.length === 0) {
        warningMessage.textContent = "請至少選擇一個景點！";
        itineraryResult.classList.add("hidden");
        return;
    }
    
    if (checkboxes.length > 4) {
        warningMessage.textContent = "最多只能選擇4個景點！";
        itineraryResult.classList.add("hidden");
        return;
    }
    
    itineraryResult.classList.remove("hidden");
    
    let currentHour = 9;
    let currentMinute = 0;
    
    checkboxes.forEach((checkbox, index) => {
        // Add attraction
        const tr = document.createElement("tr");
        const timeTd = document.createElement("td");
        const activityTd = document.createElement("td");
        const descTd = document.createElement("td");
        
        const startTime = formatTime(currentHour, currentMinute);
        currentHour += 2;
        const endTime = formatTime(currentHour, currentMinute);
        
        timeTd.textContent = `${startTime} - ${endTime}`;
        activityTd.textContent = `參觀：${checkbox.value}`;
        descTd.textContent = attractionsInfo[checkbox.value];
        
        tr.appendChild(timeTd);
        tr.appendChild(activityTd);
        tr.appendChild(descTd);
        itineraryList.appendChild(tr);
        
        // Add lunch after the second attraction
        if (index === 1) {
            const lunchTr = document.createElement("tr");
            const lunchTimeTd = document.createElement("td");
            const lunchActivityTd = document.createElement("td");
            const lunchDescTd = document.createElement("td");
            
            lunchTimeTd.textContent = "下午 12:00 - 下午 1:00";
            lunchActivityTd.textContent = "午餐";
            lunchDescTd.textContent = "在附近餐廳享用北京特色美食，如烤鴨或炸醬麵。";
            
            lunchTr.appendChild(lunchTimeTd);
            lunchTr.appendChild(lunchActivityTd);
            lunchTr.appendChild(lunchDescTd);
            itineraryList.appendChild(lunchTr);
            currentHour = 13;
            currentMinute = 0;
        }
        
        // Add dinner after the third attraction (only for 4 attractions)
        if (index === 2 && checkboxes.length === 4) {
            const dinnerTr = document.createElement("tr");
            const dinnerTimeTd = document.createElement("td");
            const dinnerActivityTd = document.createElement("td");
            const dinnerDescTd = document.createElement("td");
            
            dinnerTimeTd.textContent = "下午 6:00 - 下午 7:00";
            dinnerActivityTd.textContent = "晚餐";
            dinnerDescTd.textContent = "品嚐北京地道小吃或高級中餐，享受美食之夜。";
            
            dinnerTr.appendChild(dinnerTimeTd);
            dinnerTr.appendChild(dinnerActivityTd);
            dinnerTr.appendChild(dinnerDescTd);
            itineraryList.appendChild(dinnerTr);
            currentHour = 19;
            currentMinute = 0;
        }
    });
}

function clearItinerary() {
    const itineraryList = document.getElementById("itinerary-list").querySelector("tbody");
    const itineraryResult = document.getElementById("itinerary-result");
    itineraryList.innerHTML = "";
    itineraryResult.classList.add("hidden");
}