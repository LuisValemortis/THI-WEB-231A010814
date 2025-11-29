document.addEventListener('DOMContentLoaded', () => {

    const mainImage = document.getElementById('main-product-display');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const newImageSrc = this.getAttribute('data-full-src');
            mainImage.src = newImageSrc;
            mainImage.alt = this.alt;

            thumbnails.forEach(t => t.classList.remove('active'));

            this.classList.add('active');
        });
    });

    const header = document.querySelector('.product-header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    const featureItems = document.querySelectorAll('.feature-item');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const featureObserver = new IntersectionObserver(observerCallback, observerOptions);

    featureItems.forEach(item => {
        featureObserver.observe(item);
    });
});


function initializeGuessingGame() {
    const min = 50;
    const max = 150;
    let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let attempts = 0;
    let isGameOver = false;

    const guessInput = document.getElementById('guessInput');
    const checkButton = document.getElementById('checkButton');
    const resultMessage = document.getElementById('resultMessage');
    const attemptCount = document.getElementById('attemptCount');
    const resetButton = document.getElementById('resetButton');
    const confettiContainer = document.getElementById('confetti-container');

    function checkGuess() {
        if (isGameOver) return;

        const guess = parseInt(guessInput.value.trim());

        if (isNaN(guess) || guess < min || guess > max) {
            resultMessage.textContent = `❌ Vui lòng nhập một số hợp lệ trong khoảng ${min} đến ${max}.`;
            resultMessage.className = 'message error';
            return;
        }

        attempts++;
        attemptCount.textContent = attempts;

        if (guess === secretNumber) {
            resultMessage.textContent = `🎉 CHÍNH XÁC! Số bí mật là ${secretNumber}. Bạn đã đoán đúng trong ${attempts} lần!`;
            resultMessage.className = 'message success';
            isGameOver = true;
            checkButton.disabled = true;
            resetButton.style.display = 'block';
            
            confettiContainer.classList.add('active');
        } else if (guess < secretNumber) {
            resultMessage.textContent = '🔽 Quá thấp! Thử lại.';
            resultMessage.className = 'message warning';
        } else { 
            resultMessage.textContent = '🔼 Quá cao! Thử lại.';
            resultMessage.className = 'message warning';
        }
    }

    function resetGame() {
        secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        attempts = 0;
        isGameOver = false;

        attemptCount.textContent = 0;
        resultMessage.textContent = '';
        resultMessage.className = 'message';
        guessInput.value = '';
        checkButton.disabled = false;
        resetButton.style.display = 'none';

        confettiContainer.classList.remove('active');
        console.log("Game đã reset. Số mới: " + secretNumber);
    }
    
    checkButton.addEventListener('click', checkGuess);
    resetButton.addEventListener('click', resetGame);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });

    console.log("Game đã khởi tạo. Số bí mật đầu tiên: " + secretNumber);
}
