import React, { useState , useEffect } from "react";
import firebase from "./firebase.js"
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import styles from "../css/Main.module.css";


function Game() {
  const [showFinalResults, setFinalResults] = useState(false); //게임 종료 or 게임 중 
  const [score, setScore] = useState(0); // 현재 점수
  const [currentQuestion, setCurrentQuestion] = useState(0) //현재 질문

  /*
  useEffect(()=>{
    console.log("test");
    let ins = document.createElement('ins');
    let scr = document.createElement('script');
    ins.className = 'kakao_ad_area';
    ins.style = `display:none; width:200px; display: table; margin-left: auto; margin-right: auto;`;
    scr.async = 'true';
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute('data-ad-width','300');
    ins.setAttribute('data-ad-height','250');
    ins.setAttribute('data-ad-unit','DAN-7dJHxFxvKOiJ72N5');
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  }, []) 
*/
//정답 저장 배열
  const[info, setInfo] = useState([
    { id: 0, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0},
    { id: 1, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0},
    { id: 2, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0},
    { id: 3, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0},
    { id: 4, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0}
  ])
  const tempInfo = [
    { id: 0, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0},
    { id: 1, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0},
    { id: 2, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0},
    { id: 3, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0},
    { id: 4, link : "", rank : "", uploader : "", success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0}
   ]
//질문, 정답 저장 배열
  let questions = [
    {
      vid : '',
      options : [
      { id: 0, text: "브론즈.png", isCorrect: false },
      { id: 1, text: "실버.png", isCorrect: false },
      { id: 2, text: "골드.png", isCorrect: false },
      { id: 3, text: "플레티넘.png", isCorrect: false },
      { id: 4, text: "다이아몬드.png", isCorrect: false },
      { id: 5, text: "마스터.png", isCorrect: false },
      { id: 6, text: "그랜드마스터.png", isCorrect: false },
      { id: 7, text: "랭커.png", isCorrect: false },
      ],
    },

    {
      vid : '',
      options : [
      { id: 0, text: "브론즈.png", isCorrect: false },
      { id: 1, text: "실버.png", isCorrect: false },
      { id: 2, text: "골드.png", isCorrect: false },
      { id: 3, text: "플레티넘.png", isCorrect: false },
      { id: 4, text: "다이아몬드.png", isCorrect: false },
      { id: 5, text: "마스터.png", isCorrect: false },
      { id: 6, text: "그랜드마스터.png", isCorrect: false },
      { id: 7, text: "랭커.png", isCorrect: false },
      ],
    },

    {
      vid : '',
      options : [
      { id: 0, text: "브론즈.png", isCorrect: false },
      { id: 1, text: "실버.png", isCorrect: false },
      { id: 2, text: "골드.png", isCorrect: false },
      { id: 3, text: "플레티넘.png", isCorrect: false },
      { id: 4, text: "다이아몬드.png", isCorrect: false },
      { id: 5, text: "마스터.png", isCorrect: false },
      { id: 6, text: "그랜드마스터.png", isCorrect: false },
      { id: 7, text: "랭커.png", isCorrect: false },
      ],
    },

    {
      vid : '',
      options : [
      { id: 0, text: "브론즈.png", isCorrect: false },
      { id: 1, text: "실버.png", isCorrect: false },
      { id: 2, text: "골드.png", isCorrect: false },
      { id: 3, text: "플레티넘.png", isCorrect: false },
      { id: 4, text: "다이아몬드.png", isCorrect: false },
      { id: 5, text: "마스터.png", isCorrect: false },
      { id: 6, text: "그랜드마스터.png", isCorrect: false },
      { id: 7, text: "랭커.png", isCorrect: false },
      ],
    },

    {
      vid : '',
      options : [
      { id: 0, text: "브론즈.png", isCorrect: false },
      { id: 1, text: "실버.png", isCorrect: false },
      { id: 2, text: "골드.png", isCorrect: false },
      { id: 3, text: "플레티넘.png", isCorrect: false },
      { id: 4, text: "다이아몬드.png", isCorrect: false },
      { id: 5, text: "마스터.png", isCorrect: false },
      { id: 6, text: "그랜드마스터.png", isCorrect: false },
      { id: 7, text: "랭커.png", isCorrect: false },
      ],
    },
  ]
  let num=0
   //파이어 베이스 db 가져오기
  const db = firebase.firestore();
  useEffect(() => {
    db.collection('vids').get().then((result) => {
      let j = 0
      result.forEach((doc) => {
        tempInfo[j] = doc.data()//유튜브 링크를 vid에 저장
        j++
         })

        let indexes = [];
        console.log("문제선택")
      while(num<5) {
        let index = Math.floor(Math.random() * (j))
        console.log(index)
          if(!indexes.includes(index)) {
              info[num] = tempInfo[index]
              setInfo([ ...info, tempInfo[index] ])
              num++
              indexes.push(index)
            }
        }
        console.log(info)
        })
    },[])
  /*quetions 배열 options에 text와 info 배열 rank 값이 같으면 
  questions.options.isCorrect를 true로 전환*/ 
  for(let i = 0 ; i<5 ; i++) {  
    for(let ii = 0 ; ii < 8 ; ii++) {
      if(info[i].rank === questions[i].options[ii].text) {
          questions[i].options[ii].isCorrect = true;
      }
  }
}
  //문제 선택 실행
  //다음 문제로 넘어가는 함수
  const optionClicked = (option) => {
    console.log(option)
    const db = firebase.firestore();
    var infoUpdate = db.collection("vids").doc(info[currentQuestion].uploader);
    //정답시 점수 +1
    if( option.isCorrect ) {
      Swal.fire({
        icon: 'success',
        title: '정답입니다!',
        text: `정답률 : ${(info[currentQuestion].success / (info[currentQuestion].success + info[currentQuestion].fail) * 100) }%`,
      })
      
      infoUpdate.update({
        success: (info[currentQuestion].success)+1
      })
    
      if(option.text === "브론즈.png"){
        infoUpdate.update({
          브론즈: (info[currentQuestion].브론즈)+1
        })
      }
      else if(option.text === "실버.png"){
        infoUpdate.update({
          실버: (info[currentQuestion].실버)+1
        })
      }
      else if(option.text ==="골드.png"){
        infoUpdate.update({
          골드: (info[currentQuestion].골드)+1
        })
      }
      else if(option.text === "플레티넘.png"){
        infoUpdate.update({
          플레티넘: (info[currentQuestion].플레티넘)+1
        })
      }
      else if(option.text === "다이아몬드.png"){
        infoUpdate.update({
          다이아몬드: (info[currentQuestion].다이아몬드)+1
        })
      }
      else if(option.text === "마스터.png"){
        infoUpdate.update({
          마스터: (info[currentQuestion].마스터)+1
        })
      }
      else if(option.text === "그랜드마스터.png"){
        infoUpdate.update({
          그랜드마스터: (info[currentQuestion].그랜드마스터)+1
        })
      }
      else if(option.text === "랭커.png"){
        infoUpdate.update({
          랭커: (info[currentQuestion].랭커)+1
        })
      }
      setScore(score + 1);
    } else {
      infoUpdate.update({
        fail: (info[currentQuestion].fail)+1
      })
      if(option.text === "브론즈.png"){
        infoUpdate.update({
          브론즈: (info[currentQuestion].브론즈)+1
        })
      }
      else if(option.text === "실버.png"){
        infoUpdate.update({
          실버: (info[currentQuestion].실버)+1
        })
      }
      else if(option.text === "골드.png"){
        infoUpdate.update({
          골드: (info[currentQuestion].골드)+1
        })
      }
      else if(option.text === "플레티넘.png"){
        infoUpdate.update({
          플레티넘: (info[currentQuestion].플레티넘)+1
        })
      }
      else if(option.text === "다이아몬드.png"){
        infoUpdate.update({
          다이아몬드: (info[currentQuestion].다이아몬드)+1
        })
      }
      else if(option.text === "마스터.png"){
        infoUpdate.update({
          마스터: (info[currentQuestion].마스터)+1
        })
      }
      else if(option.text === "그랜드마스터.png"){
        infoUpdate.update({
          그랜드마스터: (info[currentQuestion].그랜드마스터)+1
        })
      }
      else if(option.text === "랭커.png"){
        infoUpdate.update({
          랭커: (info[currentQuestion].랭커)+1
        })
      }
      Swal.fire({
        icon: 'error',
        title: `정답 : ${info[currentQuestion].rank.slice(0,-4)}`,
        text: `정답률 : ${(info[currentQuestion].success / (info[currentQuestion].success + info[currentQuestion].fail) * 100) }%`,
      })
      
    }
    
    //배열 끝에 도달시 게임 종료 true
    {
    if( currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  }
    
  }
  //영상 신고
  function report() {
    const db = firebase.firestore();
    var infoUpdate = db.collection("vids").doc(info[currentQuestion].uploader);
    infoUpdate.update({
      report: (info[currentQuestion].report)+1
    })
    Swal.fire({
      icon: 'success',
      title: `신고 완료`,
      
    })
    if( currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }

  }
  //게임 재시작
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
    window.location.reload();
  }
  //게임 종료 대사
  function showScore() {
    if(score === 0){
      return "오우 노우\n빵점입니다 ㅠ"
    }
    else if(score ===1){
      return "그래도~\n0점은 아니네요!"
    }
    else if(score === 2){
      return "평타!"
    }
    else if(score === 3){
      return "평타 이상입니다.\n좀 하시는데요?"
    }
    else if(score === 4){
      return "와우 거의 만점!\n만점을 향해 고고"
    }
    else if(score === 5){
      return "그저\nG.O.A.T"
    }
  }
  function setLength() {
    info.length = 5
  }

  function replaceLink() {
    if(info[currentQuestion].link.includes("https://youtu.be/")){
      return info[currentQuestion].link.replace( "https://youtu.be/", "https://www.youtube.com/embed/" )
    }
    else if(info[currentQuestion].link.includes("https://www.youtube.com/watch?v="))
    {
      return info[currentQuestion].link.replace( "https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/" )
    }
    //option.link.replace( "https://youtu.be/", "https://www.youtube.com/embed/")
  }
  function replaceLink2(arg) {
    if(arg.link.includes("https://youtu.be/")){
      return arg.link.replace( "https://youtu.be/", "https://www.youtube.com/embed/" )
    }
    else if(arg.link.includes("https://www.youtube.com/watch?v="))
    {
      return arg.link.replace( "https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/" )
    }
    //option.link.replace( "https://youtu.be/", "https://www.youtube.com/embed/")
  }




  return (
    <div className={styles.App}>
    { showFinalResults ? (
      //게임 종료시 
      <div className={styles.restartbtn}>
        <h2 className={styles.nowscore}>점수 : {score}</h2> 
        <h1 className={styles.nowscore}>{showScore()}</h1>
      <Button margin="normal" 
      style={{backgroundColor: "#91D8E4" }} 
      sx = {{ fontSize: 30, ml: -2, border: 1, mt: 3}} 
      fullWidth variant="contained"onClick={() => restartGame()}
      >
        다시 해보기
      </Button>
      <Link style={{width: '100%'}} to="/upload">
        <Button style={{backgroundColor: "#FFC288"}} sx = {{ fontSize: 30, ml: -2, border: 1, mt: 3, mb: 5 }} fullWidth  variant="contained">나도 영상 올리기</Button>
      </Link>
      <div>
      <h2 className={styles.nowscore}>다시 보기</h2> 
      { setLength() }
      {
      info.map((option) => {
              return (
                <>        
                  <iframe 
                  src={replaceLink2(option)} title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                  </iframe>
                  <img key={option.id} src={`img/${option.rank}`} className="tier" alt={option.text} />
                  
                </>
                    );
                } ) 
      }   
      </div>
    </div>
     ) : (
      //게임 진행시
      <div>
        <h2 className={styles.nowscore}>점수 : {score}</h2> 
        <p className={styles.nowquestion}>{currentQuestion + 1}/5</p>
          <a>
            <div>
              { /*유튜브 영상 출력*/ }
              <iframe 
                  src={replaceLink()} title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
              </iframe>
            </div> 
            <div className={styles.tierimg}>
              { /*정답 목록 출력*/ }
              {questions[currentQuestion].options.map((option) => {
              return (           
                    <img onClick={() => optionClicked(option)} key={option.id}
                    src={`/img/${option.text}`} className="tier" alt={option.text} />
                    );
                } ) 
              }    
            </div>    
            <Button style={{backgroundColor: "#FFC288"}} sx = {{ fontSize: 30 , border: 1 , mr : 2 , mb : 5 , mt : 3 }} variant="contained" onClick={ ()=> { report() } }>영상 신고</Button>  
            <Link style={{width: '100%'}} to="/main">
            <Button  sx = {{ fontSize: 30 , border: 1  , ml : 2 , mb : 5 , mt : 3 }} variant="contained" > 메인화면</Button>
            </Link>                                                     
          </a>         
      </div>
  )}
  <div className="adfit"></div>
  </div>
  
  );
}

export default Game;
