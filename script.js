const correctPassword = 'gugong2025';

const attractionsInfo = {
    '午門': '午門是故宮的正門，氣勢恢宏，是皇帝舉行重大儀式的入口，展現明清建築的威嚴。',
    '太和殿': '太和殿是故宮的核心，皇帝舉行登基、婚禮等大典的場所，金碧輝煌，象徵皇權至高無上。',
    '乾清宮': '乾清宮是皇帝的寢宮與辦公場所，內部陳設精美，見證清代多位皇帝的治國理政。',
    '御花園': '御花園是故宮後苑，種植奇花異草，亭台樓閣錯落有致，是皇室休憩的雅致場所。',
    '神武門': '神武門是故宮北門，遊客出口，門外景山公園可俯瞰故宮全景，氣勢磅礴。',
    '養心殿': '養心殿是清代皇帝的日常居所，三希堂珍藏書法名帖，展現帝王的文化品味。',
    '九龍壁': '九龍壁位於皇極殿前，雕刻九條栩栩如生的彩色琉璃龍，象徵皇權與祥瑞。',
    '鐘粹宮': '鐘粹宮是後宮之一，曾為妃嬪居所，現展出珍貴文物，展現清代宮廷生活。'
};

function checkPassword() {
    const input = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');
    
    if (input === correctPassword) {
        document.getElementById('password-section').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        errorMessage.textContent = '';
    } else {
        errorMessage.textContent = '密碼錯誤，請重新輸入！';
    }
}

document.querySelectorAll('.attraction-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.attraction-checkbox:checked').length;
        if (checkedCount > 4) {
            checkbox.checked = false;
            alert('最多只能選擇4個景點！');
        }
    });
});

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function generateItinerary() {
    const selectedAttractions = Array.from(document.querySelectorAll('.attraction-checkbox:checked'))
        .map(checkbox => checkbox.value);
    
    const resultDiv = document.getElementById('result-text');
    const itineraryResult = document.getElementById('itinerary-result');
    
    if (selectedAttractions.length === 0) {
        alert('請至少選擇1個景點！');
        return;
    }
    
    let itineraryContent = `<p><strong>行程概覽：</strong><br>從午門進入故宮，依序參觀：${selectedAttractions.join(' → ')}，最後從神武門離開。</p>`;
    
    // 計算時間表
    let currentTime = new Date('2025-06-11T09:00:00'); // 假設從上午9:00開始
    let timeline = '<div class="timeline"><h3>時間表</h3>';
    
    selectedAttractions.forEach((attraction, index) => {
        const startTime = formatTime(currentTime);
        currentTime = addMinutes(currentTime, 45); // 每個景點45分鐘
        const endTime = formatTime(currentTime);
        timeline += `<p class="timeline-item">${startTime} - ${endTime}: 參觀${attraction}</p>`;
        
        // 加入用餐時間（2個景點後，若選擇2個以上）
        if (index === (selectedAttractions.length === 2 ? 0 : 1) && selectedAttractions.length >= 2) {
            const mealStart = formatTime(currentTime);
            currentTime = addMinutes(currentTime, 60); // 用餐1小時
            const mealEnd = formatTime(currentTime);
            timeline += `<p class="timeline-item">${mealStart} - ${mealEnd}: 用餐時間（建議在故宮附近餐廳）</p>`;
        }
    });
    
    timeline += '</div>';
    
    // 總時間
    const totalHours = selectedAttractions.length * 0.75 + (selectedAttractions.length >= 2 ? 1 : 0);
    itineraryContent += `<p><strong>總遊覽時間：</strong>約${totalHours}小時</p>`;
    
    // 景點介紹
    itineraryContent += '<h3>景點介紹</h3>';
    selectedAttractions.forEach(attraction => {
        itineraryContent += `<h3>${attraction}</h3><p>${attractionsInfo[attraction]}</p>`;
    });
    
    resultDiv.innerHTML = itineraryContent + timeline;
    itineraryResult.classList.remove('hidden');
}

function clearItinerary() {
    const resultDiv = document.getElementById('result-text');
    const itineraryResult = document.getElementById('itinerary-result');
    
    // 清除行程內容
    resultDiv.innerHTML = '';
    itineraryResult.classList.add('hidden');
    
    // 重置所有勾選框
    document.querySelectorAll('.attraction-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
}