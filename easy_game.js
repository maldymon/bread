var bread_character = document.getElementById("bread_character");
var mouth_enemy = document.getElementById("mouth_enemy");
var gameOver = false;

addEventListener("keypress", keyListener);
document.addEventListener("pointerdown", keyListener);
document.getElementById("startButton").addEventListener("click", startGame);
mouth_enemy.addEventListener("animationiteration", updateScore);

function updateScore() {
    var score = document.getElementById("score");
    score.textContent = parseInt(score.textContent) + 1;
}

function startGame() {
    window.location.reload();
}

function keyListener(event) {
    if (gameOver) {
        if (event.key === "r") {
            startGame();
        }
        else {
            return;
        }
    }

    jump();
}

var isJumping = false;
function jump() {
    if (isJumping) return;
    
    isJumping = true;
    bread_character.classList.add("jump-animation");
    setTimeout(() => {
        bread_character.classList.remove("jump-animation");
        isJumping = false;
    }, 700);
    
}
//bread_character.addEventListener("animationend", () => {
//    bread_character.classList.remove("jump-animation");
//    console.log("Animation ended");
//    isJumping = false;
//});

function checkCollision() {
    if (!gameOver) 
    {
        const a = bread_character.getBoundingClientRect();
        const b = mouth_enemy.getBoundingClientRect();

        const isColliding =
            a.left < b.right-5 &&
            a.right > b.left+5 &&
            a.top < b.bottom-5 &&
            a.bottom > b.top+5;

        // Fire only when they first touch, not on every animation frame.
        if (isColliding) {
            gameOver = true;
            bread_character.style.backgroundImage = "url('images/bread_crumbs.png')";
            mouth_enemy.style.animationPlayState = "paused";
            document.querySelector(".middle").textContent = "GAME OVER";
        }
    }
}

setInterval(checkCollision, 10);