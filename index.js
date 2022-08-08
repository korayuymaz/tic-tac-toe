const gameBoard = (function(){
  let scoreO = document.querySelector(".o-score")
  let scoreX = document.querySelector(".x-score")
  let array = new Array(9)

  let rounds = 0;

  const winCombos = [
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [0,4,8]
];

  const playerFactory = (sign, score, turn) => {
    return { sign, score, turn};
  };

  let player1 = playerFactory("O", 0, true)
  let player2 = playerFactory("X", 0, false)

  let playArea = document.querySelectorAll("button");
  playArea.forEach( playArea => {
    playArea.addEventListener("click", e => {
      if(!playArea.innerHTML){
        if(player1.turn){
          playArea.innerHTML = player1.sign
          player1.turn = false
          player2.turn = true
          gameBoard.rounds++
          gameBoard.array[playArea.id] = "o"
          checkWinner()
        }else{
          playArea.innerHTML = player2.sign
          player2.turn = false
          player1.turn = true
          gameBoard.rounds++
          gameBoard.array[playArea.id] = "x"
          checkWinner()
        }
      } else {
        alert("You cant choose same box")
      }
    })
  })

  newRound = () => {
    player1.turn = true
    player2.turn = false
    gameBoard.array = new Array(9)
    gameBoard.rounds = 0
    playArea.forEach(playArea => {
      playArea.innerHTML = ""
    })
  };

  checkWinner = () => {
    let x = []
    let o = []
    for(let i=0; i<9; i++){
      if(gameBoard.array[i] === "o"){
        o.push(i)
        winCombos.forEach(combo => {
          let win = 0
          for(let j=0; j<3; j++){
            if(o.includes(combo[j])){
              win++
            }
          }
          if(win === 3){
            player1.score++
            scoreO.innerHTML = player1.score
            newRound()
            alert("Winner is player 1")
          }
        })
      } else if(gameBoard.array[i] === "x"){
        x.push(i)
        winCombos.forEach(combo => {
          let win = 0
          for(let j=0; j<3; j++){
            if(x.includes(combo[j])){
              win++
            }
          }
          if(win === 3){
            player2.score++
            scoreX.innerHTML = player2.score
            newRound()
            alert("Winner is player 2")
          }
        })
      } 
      if(gameBoard.rounds === 9){
        newRound()
        alert("Draw")
      }
    }
  };

  return{
    player1, player2, playArea, rounds, array
  }
})();