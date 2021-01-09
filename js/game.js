const kas = document.getElementById('kas');
const swoopy = document.getElementById('swoopy');
const dd = document.getElementById('dd');
let score, lives, gameInterval, gameInterval2;
var rngblock, pick;
var isJumping = false;

window.onload = function () {

    setTimeout(function () {
        document.getElementById('loading').style.display = "none";
        document.getElementById('instructions').style.display = "block";
        document.getElementById('game').style.display = "block";
    }, 3500); // CHANGE TO 3500 WHEN DONE <--------------------------------------

    document.getElementById('start').onclick = function () { // start button
        gameInterval = setInterval(endGame, 10)
        gameInterval2 = setInterval(scoreCheck, 10)
        document.getElementById('instructions').style.display = "none";
        playgame();
    }

    document.getElementById('try').onclick = function () { // retry button
        gameInterval = setInterval(endGame, 10)
        document.getElementById('game_over').style.display = "none";
        document.getElementById('game').style.display = "block";
        document.getElementById('gosound').pause();
        document.getElementById('gosound').currentTime = 0;
        playgame();
    }

    document.getElementById('playagain').onclick = function () { // replay button
        gameInterval2 = setInterval(scoreCheck, 10)
        document.getElementById('victory').style.display = "none";
        document.getElementById('game').style.display = "block";
        document.getElementById('winsound').pause();
        document.getElementById('winsound').currentTime = 0;
        playgame();

    }
}

document.getElementById('winsound').loop = false;
document.getElementById('gosound').loop = false;

function aniPicker() {
    rngblock = (Math.floor(Math.random() * 4));
    pick = "block" + rngblock;
} // This picks the animation for the damage down

function playgame() {
    document.getElementById('bgm').volume = 0.03;
    document.getElementById('bgm').play();
    swoopy.classList.add("block");
    aniPicker();
    dd.classList.add(pick);
    document.addEventListener("keydown", function (event) {
        if (event.code === 'Space') {
            jump();
        }
    })
    score = 100;
    lives = 100;
    document.getElementById('lives').innerHTML = "Swoopy's Patience: " + lives + "%";
    document.getElementById('score').innerHTML = "Percentile: " + score + "%";
}

function jump() {
    if (!kas.classList.contains("jump") && !isJumping) {
        kas.classList.add("jump");
        isJumping = true;
        setTimeout(function () {
            kas.classList.remove("jump");
            isJumping = false;
        }, 400)
    }
}

/*function jump() {
    if (!kas.classList.contains("jump")) {
    kas.classList.add("jump");
    }
    setTimeout(function () {
        kas.classList.remove("jump");
    }, 400)
}*/

function game_over() {
    document.getElementById('gosound').loop = false;
    document.getElementById('gosound').volume = 0.03;
    document.getElementById('gosound').play();
    document.getElementById('bgm').pause();
    document.getElementById('bgm').currentTime = 0;
    swoopy.classList.remove('block');
    swoopy.classList.remove('block4');
    swoopy.classList.remove('block5');
    kas.classList.remove('jump');
    dd.classList.length = 0;
    document.getElementById('game').style.display = "none";
    document.getElementById('game_over').style.display = "block";
}

function victory() {
    document.getElementById('winsound').loop = false;
    document.getElementById('winsound').volume = 0.03;
    document.getElementById('winsound').play();
    document.getElementById('bgm').pause();
    document.getElementById('bgm').currentTime = 0;
    swoopy.classList.remove('block');
    swoopy.classList.remove('block4');
    swoopy.classList.remove('block5');
    kas.classList.remove('jump');
    dd.classList.length = 0;
    document.getElementById('game').style.display = "none";
    document.getElementById('victory').style.display = "block";
}

function endGame() {

    let kasTop = parseInt(window.getComputedStyle(kas).getPropertyValue("top")); // Kas vertical position
    let swoopyLeft = parseInt(window.getComputedStyle(swoopy).getPropertyValue('left')); // Swoopy horizontal position

    if (swoopyLeft < 205 && swoopyLeft > 160 && kasTop >= 180) { // collision detection
        lives = lives - 2;
        document.getElementById('lives').innerHTML = "Swoopy's Patience: " + lives + "%";
    }
    if (lives <= 0) {
        game_over();
        clearInterval(gameInterval);
    }
}

function scoreCheck() {

    let kasTop = parseInt(window.getComputedStyle(kas).getPropertyValue("top")); // Kas vertical position
    let ddLeft = parseInt(window.getComputedStyle(dd).getPropertyValue('left')); // Damage Down horizontal position

    if (ddLeft < 245 && ddLeft > 135 && kasTop <= 175) { // collision detection

        dd.classList.remove("block" + rngblock);

        setTimeout(function () {
            aniPicker()
            dd.classList.add(pick);
        }, 30)

        score = score - 5;
        document.getElementById('score').innerHTML = "Percentile: " + score + "%";
    }

    if (score == 50) {
        swoopy.classList.remove("block");

        setTimeout(function () {
            swoopy.classList.add("block4");
        }, 30)

    } else if (score == 25) {
        swoopy.classList.remove("block4");

        setTimeout(function () {
            swoopy.classList.add("block5");
        }, 30)
    }

    if (score <= 0) {
        victory();
        clearInterval(gameInterval2);
    }
}
