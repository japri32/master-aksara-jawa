// Data Wilangan Jawa
const wilanganData = {
    dasar: [
        { angka: 0, simbol: '꦳꧐꧇', latin: 'NOL', audio: 'nol' },
        { angka: 1, simbol: '꦳꧑꧇', latin: 'SIJI', audio: 'siji' },
        { angka: 2, simbol: '꦳꧒꧇', latin: 'LORO', audio: 'loro' },
        { angka: 3, simbol: '꦳꧓꧇', latin: 'TELU', audio: 'telu' },
        { angka: 4, simbol: '꦳꧔꧇', latin: 'PAPAT', audio: 'papat' },
        { angka: 5, simbol: '꦳꧕꧇', latin: 'LIMA', audio: 'lima' },
        { angka: 6, simbol: '꦳꧖꧇', latin: 'ENEM', audio: 'enem' },
        { angka: 7, simbol: '꦳꧗꧇', latin: 'PITU', audio: 'pitu' },
        { angka: 8, simbol: '꦳꧘꧇', latin: 'WOLU', audio: 'wolu' },
        { angka: 9, simbol: '꦳꧙꧇', latin: 'SANGA', audio: 'sanga' }
    ],
    puluhan: [
        { angka: 10, simbol: '꦳꧑꧐꧇', latin: 'SEDASA', special: false },
        { angka: 11, simbol: '꦳꧑꧑꧇', latin: 'SEWELAS', special: false },
        { angka: 12, simbol: '꦳꧑꧒꧇', latin: 'ROLAS', special: false },
        { angka: 13, simbol: '꦳꧑꧓꧇', latin: 'TELULAS', special: false },
        { angka: 14, simbol: '꦳꧑꧔꧇', latin: 'PATBELAS', special: false },
        { angka: 15, simbol: '꦳꧑꧕꧇', latin: 'LIMALAS', special: false },
        { angka: 16, simbol: '꦳꧑꧖꧇', latin: 'NEMBELAS', special: false },
        { angka: 17, simbol: '꦳꧑꧗꧇', latin: 'PITULAS', special: false },
        { angka: 18, simbol: '꦳꧑꧘꧇', latin: 'WOLULAS', special: false },
        { angka: 19, simbol: '꦳꧑꧙꧇', latin: 'SANGALAS', special: false },
        { angka: 20, simbol: '꦳꧒꧐꧇', latin: 'RONGPULUH', special: false },
        { angka: 21, simbol: '꦳꧒꧑꧇', latin: 'SELIKUR', special: true },
        { angka: 25, simbol: '꦳꧒꧕꧇', latin: 'SELAWE', special: true },
        { angka: 30, simbol: '꦳꧓꧐꧇', latin: 'TELUNG PULUH', special: false },
        { angka: 50, simbol: '꦳꧕꧐꧇', latin: 'SEKET', special: true }
    ]
};

// Quiz Questions
const quizQuestions = [
    {
        type: 'image',
        question: 'Pira cacahing pitik ing ngisor iki?',
        image: '🐔🐔🐔',
        correctAnswer: 2, // Index in options
        options: ['꦳꧑꧇', '꦳꧒꧇', '꦳꧓꧇', '꦳꧔꧇']
    },
    {
        type: 'text',
        question: 'Wilangan 17 ditulis ngopo?',
        correctAnswer: 2,
        options: ['꦳꧑꧕꧇', '꦳꧑꧖꧇', '꦳꧑꧗꧇', '꦳꧑꧘꧇']
    },
    {
        type: 'translation',
        question: 'Terjemahna wilangan iki: ꦳꧔꧇',
        correctAnswer: 3,
        options: ['3', '5', '6', '4']
    },
    {
        type: 'image',
        question: 'Pira cacahing wit ing ngisor iki?',
        image: '🌳🌳🌳🌳🌳',
        correctAnswer: 4,
        options: ['꦳꧓꧇', '꦳꧔꧇', '꦳꧕꧇', '꦳꧖꧇']
    },
    {
        type: 'text',
        question: 'Wilangan 25 diarani...',
        correctAnswer: 2,
        options: ['SELIKUR', 'SELAWE', 'SEKET', 'RONGPULUH']
    }
];

// Global Variables
let currentScreen = 'splashScreen';
let currentQuestionIndex = 0;
let score = 0;
let userStats = {
    totalPlayed: 0,
    totalCorrect: 0,
    completedLevels: 0
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Show splash screen first
    setTimeout(() => {
        showScreen('mainMenu');
        initializePustaka();
        initializeWritingCanvas();
        loadUserStats();
    }, 3000);
});

// Screen Navigation
function showScreen(screenName) {
    // Hide current screen
    document.getElementById(currentScreen).classList.add('hidden');
    
    // Show new screen
    document.getElementById(screenName).classList.remove('hidden');
    currentScreen = screenName;
    
    // Initialize specific screens
    if (screenName === 'gladhenDasarScreen') {
        startQuiz();
    }
}

// Tab Navigation
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Initialize Pustaka Section
function initializePustaka() {
    const dasarGrid = document.querySelector('.wilangan-grid');
    const puluhanGrid = document.querySelector('.puluhan-grid');
    
    // Populate dasar numbers
    wilanganData.dasar.forEach(wilangan => {
        const card = createWilanganCard(wilangan);
        dasarGrid.appendChild(card);
    });
    
    // Populate puluhan numbers
    wilanganData.puluhan.forEach(wilangan => {
        const card = createWilanganCard(wilangan, true);
        puluhanGrid.appendChild(card);
    });
}

function createWilanganCard(wilangan, isPuluhan = false) {
    const card = document.createElement('div');
    card.className = 'wilangan-card';
    
    let specialClass = '';
    if (isPuluhan && wilangan.special) {
        specialClass = 'special-wilangan';
    }
    
    card.innerHTML = `
        <div class="wilangan-symbol ${specialClass}">${wilangan.simbol}</div>
        <div class="wilangan-latin">${wilangan.latin}</div>
        <div class="wilangan-arab">${wilangan.angka}</div>
        ${wilangan.audio ? <button class="audio-btn" onclick="playAudio('${wilangan.audio}')">🔊 Krungokna</button> : ''}
    `;
    
    return card;
}

// Audio Functions
function playAudio(audioName) {
    // In real implementation, you would have audio files
    const audioMap = {
        'siji': 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3',
        'loro': 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3',
        'telu': 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3'
    };
    
    const audio = new Audio(audioMap[audioName] || 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3');
    audio.play();
}

// Quiz Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    const quizContent = document.getElementById('quizContent');
    
    // Update progress
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    
    let questionHTML = `
        <div class="quiz-container">
            <div class="quiz-question">${question.question}</div>
    `;
    
    if (question.type === 'image') {
        questionHTML += <div class="quiz-image">${question.image}</div>;
    }
    
    questionHTML += `
        <div class="quiz-options">
    `;
    
    question.options.forEach((option, index) => {
        questionHTML += `
            <div class="quiz-option" onclick="checkAnswer(${index})">
                ${option}
            </div>
        `;
    });
    
    questionHTML += `
        </div>
        <div id="quizFeedback"></div>
    </div>
    `;
    
    quizContent.innerHTML = questionHTML;
}

function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    if (selectedIndex === question.correctAnswer) {
        // Correct answer
        options[selectedIndex].classList.add('correct');
        feedback.innerHTML = <div class="feedback correct">✅ BENER! Jawaban panjenengan pas!</div>;
        document.getElementById('correctSound').play();
        score++;
        
        // Add confetti effect
        createConfetti();
    } else {
        // Wrong answer
        options[selectedIndex].classList.add('wrong');
        options[question.correctAnswer].classList.add('correct');
        feedback.innerHTML = <div class="feedback wrong">❌ OOPS! Jawaban bener: ${question.options[question.correctAnswer]}</div>;
        document.getElementById('wrongSound').play();
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 2000);
}

function endQuiz() {
    const quizContent = document.getElementById('quizContent');
    const finalScore = Math.round((score / quizQuestions.length) * 100);
    
    // Update statistics
    userStats.totalPlayed++;
    userStats.totalCorrect += score;
    userStats.completedLevels = Math.max(userStats.completedLevels, 1);
    saveUserStats();
    updateStatistics();
    
    quizContent.innerHTML = `
        <div class="quiz-container" style="text-align: center;">
            <h2>🎉 SELAMAT! 🎉</h2>
            <div class="final-score" style="font-size: 4em; color: #667eea; margin: 20px 0;">${finalScore}%</div>
            <p>Panjenengan ngewahi ${score} saka ${quizQuestions.length} soal kanthi bener!</p>
            
            ${finalScore >= 80 ? `
                <div style="background: #d4edda; padding: 20px; border-radius: 15px; margin: 20px 0;">
                    <h3>⭐ JAGO WILANGAN! ⭐</h3>
                    <p>Panjenengan wis menguasi dasar-dasar wilangan Jawa!</p>
                </div>
            ` : `
                <div style="background: #fff3cd; padding: 20px; border-radius: 15px; margin: 20px 0;">
                    <h3>💪 Ayo Sinau Maneh!</h3>
                    <p>Coba gladhen maneh kanggo niliki kemampuan!</p>
                </div>
            `}
            
            <button onclick="startQuiz()" style="background: #667eea; color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.2em; cursor: pointer; margin: 10px;">
                🔄 Coba Maneh
            </button>
            <button onclick="showScreen('mainMenu')" style="background: #6c757d; color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.2em; cursor: pointer; margin: 10px;">
                🏠 Menu Utama
            </button>
        </div>
    `;
    
    if (finalScore >= 80) {
        document.getElementById('winSound').play();
    }
}

// Writing Canvas Functions
function initializeWritingCanvas() {
    const canvas = document.getElementById('writingCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
}

function clearCanvas() {
    const canvas = document.getElementById('writingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkWriting() {
    const feedback = document.getElementById('writingFeedback');
    // In real implementation, you would use AI/ML to check the drawing
    // For demo, we'll just give random feedback
    const isCorrect = Math.random() > 0.5;
    
    if (isCorrect) {
        feedback.innerHTML = <div class="feedback correct">✅ BENER! Tulisane panjenengan pas!</div>;
        document.getElementById('correctSound').play();
    } else {
        feedback.innerHTML = <div class="feedback wrong">❌ OOPS! Coba maneh. Perhatikna bentuk lan arah nulis!</div>;
        document.getElementById('wrongSound').play();
    }
}

function showAnswer() {
    const feedback = document.getElementById('writingFeedback');
    feedback.innerHTML = <div class="feedback correct">꦳꧑꧕꧇ - Jawaban bener: Tulisen saka kiwa nengen</div>;
}

// Statistics Functions
function loadUserStats() {
    const savedStats = localStorage.getItem('wilanganStats');
    if (savedStats) {
        userStats = JSON.parse(savedStats);
    }
    updateStatistics();
}

function saveUserStats() {
    localStorage.setItem('wilanganStats', JSON.stringify(userStats));
}

function updateStatistics() {
    document.getElementById('totalPlayed').textContent = userStats.totalPlayed;
    
    const average = userStats.totalPlayed > 0 
        ? Math.round((userStats.totalCorrect / (userStats.totalPlayed * quizQuestions.length)) * 100)
        : 0;
    document.getElementById('averageScore').textContent = average + '%';
    
    document.getElementById('completedLevels').textContent = userStats.completedLevels;
    
    // Update achievements
    updateAchievements();
}

function updateAchievements() {
    const achievements = document.querySelectorAll('.achievement');
    
    if (userStats.totalPlayed >= 1) {
        achievements[0].setAttribute('data-achieved', 'true');
    }
    
    if (userStats.completedLevels >= 1) {
        achievements[1].setAttribute('data-achieved', 'true');
    }
    
    if (userStats.totalPlayed >= 5 && userStats.completedLevels >= 3) {
        achievements[2].setAttribute('data-achieved', 'true');
    }
}

// Special Effects
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 5 + 's';
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Export functionality (for future enhancement)
function exportCertificate() {
    alert("Fitur ekspor sertifikat bakal direncanakake ing versi salajengipun!");
}

// Initialize writing questions
const writingQuestions = [
    { number: 15, answer: '꦳꧑꧕꧇' },
    { number: 23, answer: '꦳꧒꧓꧇' },
    { number: 7, answer: '꦳꧗꧇' },
    { number: 30, answer: '꦳꧓꧐꧇' },
    { number: 12, answer: '꦳꧑꧒꧇' }
];

let currentWritingQuestion = 0;

function nextWritingQuestion() {
    currentWritingQuestion = (currentWritingQuestion + 1) % writingQuestions.length;
    const question = writingQuestions[currentWritingQuestion];
    document.getElementById('writingQuestion').textContent = Tulisna-wilangan {question.number};
    document.querySelector('.reference').textContent = question.answer;
    clearCanvas();
    document.getElementById('writingFeedback').innerHTML = '';
}