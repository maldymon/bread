var character = document.getElementById("character");
var block = document.getElementById("block");
var gameOver = false;

addEventListener("keypress", keyListener);
document.addEventListener("pointerdown", keyListener);

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    window.location.reload();
}

function keyListener(event) {
    if (gameOver) return;
    
    console.log(event.key);
    jump();
}

var isJumping = false;
function jump() {
    if(!isJumping) {
        character.classList.add("jump-animation");
        isJumping = true;
        setTimeout(() => {
            character.classList.remove("jump-animation");
            isJumping = false;
        }, 700);
    }
}

function checkCollision() {
    if (!gameOver) 
    {
        const a = character.getBoundingClientRect();
        const b = block.getBoundingClientRect();

        const isColliding =
            a.left < b.right-5 &&
            a.right > b.left+5 &&
            a.top < b.bottom-5 &&
            a.bottom > b.top+5;

        // Fire only when they first touch, not on every animation frame.
        if (isColliding) {
            gameOver = true;
            character.style.backgroundImage = "url('images/bread_crumbs.png')";
            block.style.animationPlayState = "paused";
            setTimeout(() => {
                alert("Game Over!");
            }, 200);
        }
    }
}

setInterval(checkCollision, 10);