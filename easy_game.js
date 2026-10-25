/* Global variables */
const bread_character = document.getElementById("bread_character");
const mouth_enemy = document.getElementById("mouth_enemy");
let gameOver = false;
let isJumping = false;

/* Jump on keypress or mouse click.
   If 'Game over', then 'r' key can be used to restart game. */
addEventListener("keypress", keyListener);
document.addEventListener("pointerdown", keyListener);
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


/* Restart the game when clicking restart button */
document.getElementById("restartButton").addEventListener("click", startGame);
function startGame() {
    window.location.reload();
}

/* Increase score each time the enemy animation starts over. 
   Increase enemy speed each 5 points scored. */
mouth_enemy.addEventListener("animationiteration", updateScore);
function updateScore() {
    const score = document.getElementById("score");

    /* Increase score with 1 point */
    score.textContent = parseInt(score.textContent) + 1;

    /* For each 5 points scored, the speed of the enemy will increase */
    if (parseInt(score.textContent) % 5 == 0) {

        mouth_enemy.style.animationName = "none"; /* Stop animation */

        /* Calculate new speed */
        let duration_int = getComputedStyle(mouth_enemy).animationDuration;
        let duration_ms = parseFloat(duration_int) * (duration_int.endsWith("ms") ? 1 : 1000);
        let new_speed_int = duration_ms-100;
        let new_speed_str = new_speed_int.toString()+"ms";

        console.log("New speed ", new_speed_str)

        mouth_enemy.style.animationDuration = new_speed_str; /* Update to new animation speed */

        mouth_enemy.style.animationName = "move_horizontal"; /* Restart animation with new speed */
    }
}

/* Each 10 ms, check if the bread and mouth have collided.
   If there is a collision -> game over. */
function checkCollision() {
    if (gameOver) return;
    
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
        document.getElementById("game_over").textContent = "GAME OVER";
    }
}
setInterval(checkCollision, 10);