// Chatbot
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');

const botResponses = {
    'salom': 'Assalomu alaykum! 👋 AI Life ga xush kelibsiz!',
    'ai nima': 'Sun\'iy intellekt (AI) - bu kompyuter tizimlarining inson kabi fikrlash qobiliyati. 🤖',
    'ai qayerda ishlatiladi': 'AI tibbiyot, ta\'lim, transport, moliya va kundalik hayotda ishlatiladi.',
    'ai turlari': '1️⃣ Zaif AI 2️⃣ Kuchli AI 3️⃣ Super AI',
    'kelajak': 'Kelajakda AI kasalliklarni aniqlaydi, ta\'limni shaxsiylashtiradi. 🚀',
    'rahmat': 'Arzimaydi! 😊 Yana savol bormi?',
    'hayr': 'Xayr! 👋 Yana qaytishingizni kutaman!'
};

function sendChat() {
    const message = chatInput.value.trim();
    if (message === '') return;
    addMessage(message, 'user');
    chatInput.value = '';
    let response = 'Qiziqarli savol! 🤔 Boshqa bo\'limlarni ko\'rib chiqing.';
    const lowerMessage = message.toLowerCase();
    for (let key in botResponses) {
        if (lowerMessage.includes(key)) {
            response = botResponses[key];
            break;
        }
    }
    setTimeout(() => {
        addMessage(response, 'bot');
    }, 600);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    avatar.innerHTML = sender === 'bot' ? '<i class="fa-solid fa-robot"></i>' : '<i class="fa-solid fa-user"></i>';
    const content = document.createElement('div');
    content.classList.add('message-content');
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    const time = document.createElement('div');
    time.classList.add('message-time');
    time.textContent = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    content.appendChild(bubble);
    content.appendChild(time);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function quickAsk(question) {
    chatInput.value = question;
    sendChat();
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChat();
    });
}

// Test
const quizQuestions = [
    { question: "Sun'iy intellekt (AI) nima?", options: ["Kompyuter o'yini", "Inson kabi fikrlash qobiliyati", "Internet tarmog'i", "Telefon modeli"], correct: 1 },
    { question: "AI qayerlarda ishlatiladi?", options: ["Faqat kinoda", "Faqat o'yinda", "Tibbiyot, ta'lim, transport", "Faqat tadqiqotda"], correct: 2 },
    { question: "Machine Learning nima?", options: ["Kompyuter o'rganish", "Yangi til", "AI ning o'rganish qobiliyati", "Robot yasash"], correct: 2 },
    { question: "Qaysi biri AI yordamchisi?", options: ["Microsoft Word", "Siri, Alexa", "Paint", "Kalkulyator"], correct: 1 },
    { question: "AI kelajagi qanday?", options: ["Rivojlanmaydi", "Faqat o'yinda", "Insoniyatni o'zgartiradi", "Faqat kinoda"], correct: 2 }
];

let currentQuestion = 0;
let score = 0;

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showResult();
        return;
    }
    const q = quizQuestions[currentQuestion];
    document.getElementById('questionCounter').textContent = `${currentQuestion + 1}/${quizQuestions.length}`;
    document.getElementById('quizProgress').style.width = `${(currentQuestion / quizQuestions.length) * 100}%`;
    document.getElementById('questionText').textContent = q.question;
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    q.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.classList.add('option-item');
        div.textContent = opt;
        div.onclick = () => selectOption(i, div);
        container.appendChild(div);
    });
}

function selectOption(index, el) {
    if (el.classList.contains('selected')) return;
    document.querySelectorAll('.option-item').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    const q = quizQuestions[currentQuestion];
    if (index === q.correct) {
        score++;
        el.classList.add('correct');
    } else {
        el.classList.add('wrong');
        document.querySelectorAll('.option-item')[q.correct].classList.add('correct');
    }
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1000);
}

function showResult() {
    document.getElementById('quizQuestion').classList.add('hidden');
    document.getElementById('quizResult').classList.remove('hidden');
    document.getElementById('quizProgress').style.width = '100%';
    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('correctCount').textContent = score;
    document.getElementById('wrongCount').textContent = total - score;
    document.getElementById('percentageValue').textContent = `${percentage}%`;
    let msg = percentage === 100 ? 'A\'lo! 🎉' : percentage >= 60 ? 'Yaxshi! 👍' : 'Oqish kerak 📚';
    document.getElementById('resultMessage').textContent = msg;
}

function restartQuiz() {
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('quizQuestion').classList.remove('hidden');
    initQuiz();
}

// Gallery Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Notifications
function clearNotifications() {
    const badge = document.querySelector('.notification-btn .badge');
    if (badge) badge.style.display = 'none';
}

// Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.content-card, .feature-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quizQuestion')) initQuiz();
    document.querySelectorAll('.btn, .nav-item, .quick-card, .feature-item').forEach(el => {
        el.addEventListener('click', function() {
            if (navigator.vibrate) navigator.vibrate(10);
        });
    });
});
