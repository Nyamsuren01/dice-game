//          ***** Товч төлөвлөгөө *****
// одоо идэвхитэй байгаа тоглогчийг хадгалах 1-р тоглогчийг 1, 2-р тоглогчийг 2 гэе.
var activePlayer  ; 
// тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isGameOver;
// тоглогчийн цуглуулсан оноог хадгалах хувьсагч 
var scores ;
// тоглогчийн ээлжиндээ цуглуулж буй оноог хадгалах хувьсагч 
var roundScore ; 
  
// Тоглоомыг эхлүүлнэ.
initGame();

  function initGame(){
    //тоглоом эхэллээ гэдэг төлөвт оруулна.
isNewGame = true;

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    // тоглогчидын нэрийг буцааж гаргах
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    // Тоглоом эхлэхэд тоглогчидийн оноо 0 байхыг хийе
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    //diceDom.style.display = "none";
    
    document.querySelector(".btn-roll").style.display="block";
    document.querySelector(".btn-hold").style.display="block";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
      
  }
  
  var diceDom = document.querySelector(".dice");
  diceDom.style.display = "none";

  // Шоог хаяж санамсаргүй үр дүн буулгаж байгаа хэсэг
  document.querySelector(".btn-roll").addEventListener("click", function (){
    // шоонд 1-6 доторхи санамсаргүй утгаас оноож байгаа хэсэг
    var diceNumber = Math.floor((Math.random() * 6 + 1));
    // шооны зургыг веб дээр гаргаж харуулна
    diceDom.style.display = "block";
    // тухайн шооны буусан тоонд тохирох зургыг гаргаж байгаа хэсэг
    diceDom.src = "dice-" + diceNumber + ".png";
    
    // Буусан тоо 1 ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ. 
    if(diceNumber !==1){
      roundScore = roundScore + diceNumber; // 1 ээс ялгаатай тоо буулаа
      document.getElementById("current-" + activePlayer).textContent = roundScore;
    } else {
      switchToNextPlayer();
    }

  });

  // Hold товчны эвэнт листнер 
  document.querySelector(".btn-hold").addEventListener("click", function(){
    scores[activePlayer] = scores[activePlayer] + roundScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    
    // тухайн тоглогч хожсон эсэхийг шалгах (оноо 100 гаас их эсэх )
    if(scores[activePlayer] >= 50) {
      // тоглоомыг дууссан төлөвт шилжүүлж байна. 
      isGameOver = true;
      document.getElementById("name-"+ activePlayer).textContent = "WINNER !!!";
      document.querySelector(".player-"+ activePlayer + "-panel").classList.add("winner" );
      document.querySelector(".player-"+ activePlayer + "-panel").classList.remove("active" );
      document.querySelector(".btn-roll").style.display="none";
      document.querySelector(".btn-hold").style.display="none";
      //alert("Тоглоом дууслаа шинээр эхлүүлнэ үү!");
            
    } else {
      switchToNextPlayer();
    }
        
  })
// Тоглох эрх шилжүүлдэг функц
  function switchToNextPlayer(){
    // идэвхитэй тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгох
    roundScore = 0;
    
    document.getElementById("current-" + activePlayer).textContent = 0;
    
    activePlayer ===0 ? (activePlayer = 1) : (activePlayer = 0);
      // улаан цэгийг шилжүүлэх toggle нь тухайн газар асtive байвал сольдог үүрэгтэй.
      document.querySelector(".player-0-panel").classList.toggle("active");
      document.querySelector(".player-1-panel").classList.toggle("active");
      // Шоог түр алга болгоно.
      diceDom.style.display = "none";
  }

// Тоглоомыг шинээр эхлүүлэх
document.querySelector('.btn-new').addEventListener("click", initGame)
