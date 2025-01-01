let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newgame = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-cont");
let msg = document.querySelector(".msg");

let turnO = true;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");

}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#0ACDFF";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
            box.style.color = "#FF9FB2";
        }
        box.disabled = true;
        checkWiner();
    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congractulations, Winner is ${winner}`
    msgcontainer.classList.remove("hide");
    disableBoxes();
};
const draw = () => {
    msg.innerText = `Draw!`
    msgcontainer.classList.remove("hide");
    disableBoxes();
};
let turns = 0;
const checkWiner = () => {
    turns++;

    for (const pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText
        let pos2val = boxes[pattern[1]].innerText
        let pos3val = boxes[pattern[2]].innerText

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                turns = 0;
            }
        }
        if (turns === 9) {
            turns = 0;
            draw();
        }
    }
};

newgame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);