const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const chuckImgStill = new Image();
const chuckImgKick = new Image();
const dogeImgStill = new Image();
const dogeImgKick = new Image();

chuckImgStill.src = 'chuck still.png';
chuckImgKick.src = 'chuck kick.png';
dogeImgStill.src = 'doge still.png';
dogeImgKick.src = 'doge kick.png';

chuckImgStill.onload = chuckImgKick.onload = dogeImgStill.onload = dogeImgKick.onload = function() {
    console.log('Images loaded');
};

const paddleWidth = 10;
const paddleHeight = 80;

const dogePaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: 80, // Increased size
    height: 80,
    dy: 0,
    img: dogeImgStill
};

const chuckPaddle = {
    x: canvas.width - 90,
    y: canvas.height / 2 - paddleHeight / 2,
    width: 90, // Increased size
    height: 90,
    dy: 0,
    img: chuckImgStill,
    speed: 4
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 15,
    dx: 4,
    dy: 4,
    speedIncrement: 0.5,
    hitCount: 0
};

let dogeScore = 0;
let chuckScore = 0;
let isGameStarted = false;
let isSinglePlayer = true;

function drawPaddle(paddle, isDoge = false) {
    if (isDoge) {
        ctx.drawImage(paddle.img, paddle.x, paddle.y, paddle.width, paddle.height);
    } else {
        ctx.drawImage(paddle.img, paddle.x, paddle.y, paddle.width, paddle.height);
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '32px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(dogeScore, canvas.width / 4, 50);
    ctx.fillText(chuckScore, (canvas.width / 4) * 3, 50);
}

function update() {
    dogePaddle.y += dogePaddle.dy;

    if (isSinglePlayer) {
        if (ball.y < chuckPaddle.y + chuckPaddle.height / 2) {
            chuckPaddle.dy = -chuckPaddle.speed;
        } else if (ball.y > chuckPaddle.y + chuckPaddle.height / 2) {
            chuckPaddle.dy = chuckPaddle.speed;
        } else {
            chuckPaddle.dy = 0;
        }
        chuckPaddle.y += chuckPaddle.dy;
    } else {
        chuckPaddle.y += chuckPaddle.dy;
    }

    if (dogePaddle.y < 0) dogePaddle.y = 0;
    if (dogePaddle.y + dogePaddle.height > canvas.height) dogePaddle.y = canvas.height - dogePaddle.height;
    if (chuckPaddle.y < 0) chuckPaddle.y = 0;
    if (chuckPaddle.y + chuckPaddle.height > canvas.height) chuckPaddle.y = canvas.height - chuckPaddle.height;

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < 0 || ball.y + ball.size > canvas.height) {
        ball.dy *= -1;
    }

    if (ball.x < dogePaddle.x + dogePaddle.width &&
        ball.y > dogePaddle.y &&
        ball.y < dogePaddle.y + dogePaddle.height) {
        ball.dx *= -1;
        ball.hitCount++;
        dogePaddle.img = dogeImgKick;
        setTimeout(() => dogePaddle.img = dogeImgStill, 100);
    }

    if (ball.x + ball.size > chuckPaddle.x &&
        ball.y > chuckPaddle.y &&
        ball.y < chuckPaddle.y + chuckPaddle.height) {
        ball.dx *= -1;
        ball.hitCount++;
        chuckPaddle.img = chuckImgKick;
        setTimeout(() => chuckPaddle.img = chuckImgStill, 100);
    }

    if (ball.hitCount >= 2) {
        ball.dx += ball.speedIncrement * Math.sign(ball.dx);
        ball.dy += ball.speedIncrement * Math.sign(ball.dy);
        ball.hitCount = 0;
    }

    if (ball.x < 0) {
        chuckScore++;
        resetBall();
    } else if (ball.x + ball.size > canvas.width) {
        dogeScore++;
        resetBall();
    }

    if (dogeScore === 6 || chuckScore === 6) {
        alert('Game Over!');
        dogeScore = 0;
        chuckScore = 0;
        isGameStarted = false;
        showStartScreen();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4 * Math.sign(ball.dx);
    ball.dy = 4 * Math.sign(ball.dy);
    ball.hitCount = 0;
}

function draw() {
    ctx.fillStyle = '#000';  // Black court
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPaddle(dogePaddle, true);
    drawPaddle(chuckPaddle);
    drawBall();
    drawScore();
}

function gameLoop() {
    if (isGameStarted) {
        update();
        draw();
    }
    requestAnimationFrame(gameLoop);
}

function showStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '48px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText('Pong Game', canvas.width / 2, canvas.height / 3);

    ctx.font = '32px Arial';
    ctx.fillText('Press 1 for Single Player', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Press 2 for Multiplayer', canvas.width / 2, canvas.height / 2 + 50);
}

function startGame(singlePlayerMode) {
    isSinglePlayer = singlePlayerMode;
    isGameStarted = true;
}

document.addEventListener('keydown', function(e) {
    if (!isGameStarted) {
        if (e.key === '1') {
            startGame(true);
        } else if (e.key === '2') {
            startGame(false);
        }
    } else {
        if (e.key === 'w') dogePaddle.dy = -6;
        if (e.key === 's') dogePaddle.dy = 6;

        if (!isSinglePlayer) {
            if (e.key === 'ArrowUp') chuckPaddle.dy = -6;
            if (e.key === 'ArrowDown') chuckPaddle.dy = 6;
        }
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'w' || e.key === 's') dogePaddle.dy = 0;

    if (!isSinglePlayer) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') chuckPaddle.dy = 0;
    }
});

// Show start screen initially
showStartScreen();

// Start the game loop
gameLoop();
