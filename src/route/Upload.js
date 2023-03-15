import React, { useEffect, useState } from "react";
import firebase from "./firebase.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import Button from '@mui/material/Button'
import { MenuItem, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import styles from "../css/Main.module.css";


import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
  } from "recharts";

  

function Upload() {
    const [value, setValue] = useState("")
    const [typeId, setTypeId] = useState("")
    const [typePassWord, setTypePassword] = useState("")
    const [tier, setTier] = useState("Bronze.png")
    const [isLogIned, setisLogIned] = useState(false)
    const [checked, setisChecked] = useState(false)
    const [searchMyStat, setCheckmystat] = useState(false)
    const [myStat, setMystat] = useState([])
    const [data, setData] = useState([])
    const isChecked = () => {
        setisChecked(1)
        Swal.fire({
            icon: 'success',
            text: `동의 완료`,
            })
    }

    useEffect(()=>{
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

    let users = null
    //영상 링크 전송
    function send() {
        if(value.includes("https://youtu.be/") || value.includes("https://www.youtube.com/watch?v=")) {
            const db = firebase.firestore();
            db.collection('vids').doc(isLogIned.email).set({ 
                link : value, rank : tier, uploader : isLogIned.email, success : 0, fail : 0, report : 0, 브론즈: 0, 실버: 0, 골드: 0, 플레티넘: 0, 다이아몬드: 0, 마스터: 0, 그랜드마스터: 0, 랭커: 0
            }).then(() => {
                console.log("Document successfully written!");
                Swal.fire({
                    icon: 'success',
                    title: '전송 완료!',
                    text: "감사합니다!"
                  }) 
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            
              const auth = getAuth();
              auth.signOut();
        }
        
        else {
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: "영상 링크 형식을 확인해주세요"
              })   
        }
    }
    //회원 가입
    function create() {
        if(!checked) {
            Swal.fire({
                icon: 'error',
                text: "약관에 동의 해주세요"
              })   
        } else {
        const auth = getAuth();
        const email = typeId;
        const password = typePassWord;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            Swal.fire({
                icon: 'success',
                title: '가입 성공!',
                text: '환영합니다! ^>^/'
              })   
            users = userCredential.user;
            
        })
        .catch((error) => {
            const errorCode = error.code;
            Swal.fire({
                icon: 'error',
                title: '가입 에러 ㅜㅜ',
                text: errorCode
              })   
        });

    }
    }
    //로그인
    function signIn() {
        const auth = getAuth();
        const email = typeId;
        const password = typePassWord;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {           
            Swal.fire({
                icon: 'success',
                title: '로그인 성공!',

              })   
            users = userCredential.user;        
        })
        .catch((error) => {
            const errorCode = error.code;
            Swal.fire({
                icon: 'error',
                title: '로그인 에러',
                text: errorCode
              })         
        });
        console.log(email)       
    }
    //로그인 확인
    function isLogIn() {
        console.log("isLogIn실행")
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setisLogIned(user)
            console.log("현재 로그인")
            
        } else {
            console.log("현재 로그아웃")
        }
        });
    }
    //로그 아웃
    function logOut() {
        const auth = getAuth();
        auth.signOut()
        setisLogIned(false)
        Swal.fire({
            icon: 'success',
            title: '로그아웃 완료',
          })
    }
    //로그인 확인
    useEffect( () => { isLogIn() } ,[] )
    //티어 선택
    const handleSelect = (e) =>{
        setTier(e.target.value);
        console.log(tier)
    };
    function checkMyStat() {
        setCheckmystat(!searchMyStat)
        
    }
    
    useEffect(() => {
        if(isLogIned) {
            const db = firebase.firestore();
            var docRef = db.collection("vids").doc(isLogIned.email);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    setMystat(doc.data())
                    console.log(myStat)
                    makeData()
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } },[searchMyStat]);

    function makeData() {
        setData([
            {
              name: "브론즈",
              value: myStat.브론즈,
              
            },
            {
              name: "실버",
              value: myStat.실버,
              
            },
            {
              name: "골드",
              value: myStat.골드,
              
            },
            {
              name: "플레티넘",
              value: myStat.플레티넘,
              
            },
            {
              name: "다이아몬드",
              value: myStat.다이아몬드,
              
            },
            {
              name: "마스터",
              value: myStat.마스터,
              
            },
            {
              name: "그마",
              value: myStat.그랜드마스터,
             
            },
            {
                name: "랭커",
                value: myStat.랭커,
               
            }
          ])
    }   

 
    return (
        <div className={styles.outbody}>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems : 'center',
                }}
            >            
                <h1 className={styles.myvid}>내 영상 올리기</h1>
            { isLogIned ? (
                <> 
                    
                    <p style={{width: 500, textAlign: "center", color: "#FFC288"}}>전송 아이디 : {  isLogIned.email }</p>          
                    <Button margin="normal" style={{backgroundColor: "#91D8E4"}} sx = {{ width: 200, fontSize: 20, border: 1, mb : 2}} fullWidth  variant="contained" onClick={ ()=> { logOut() } }>로그아웃</Button>
                    <div id="sendbox">
                    <img onClick={() => {window.open("https://twip.kr/damdam7") }} src="/img/info.png"/>
                    <TextField fullWidth type="text" onChange={(e) => setValue(e.target.value)} placeholder="유튜브 링크 입력"/>
                    
                        <p style={{fontSize: 25}}>티어
                        <Select onChange={handleSelect} value={tier}>
                            <MenuItem value={"브론즈.png"} id="브론즈.png">브론즈</MenuItem>
                            <MenuItem value={"실버.png"} id="실버.png">실버</MenuItem>
                            <MenuItem value={"골드.png"} id="골드.png">골드</MenuItem>
                            <MenuItem value={"플레티넘.png"} id="플레티넘.png">플레티넘</MenuItem>
                            <MenuItem value={"다이아몬드.png"} id="다이아몬드.png">다이아몬드</MenuItem>
                            <MenuItem value={"마스터.png"} id="마스터.png">마스터</MenuItem>
                            <MenuItem value={"그랜드마스터.png"} id="그랜드마스터.png">그랜드마스터</MenuItem>
                            <MenuItem value={"랭커.png"} id="랭커.png">랭커</MenuItem>
                        </Select></p>
                        <Button style={{backgroundColor: "#FFC288"}} sx = {{ fontSize: 30 }} fullWidth  variant="contained" onClick={ ()=> { send() } }>전송</Button>
                        <Link style={{width: '100%'}} to="/">
                            <Button style={{backgroundColor: "#91D8E4"}} sx = {{ fontSize: 30, border: 1, mt: 3 }} fullWidth  variant="contained">메인 화면으로</Button>
                        </Link>
                        <Button style={{backgroundColor: "#FFC288"}} sx = {{ fontSize: 30, mt : 5 }} fullWidth  variant="contained" onClick={ ()=> { checkMyStat() } }>내 영상 통계</Button>
                    </div> 
                        { myStat ? (
                        <>
                        <div>
                            총 시도 횟수 : {myStat.success+myStat.fail}<br></br>
                            성공 : {myStat.success}<br></br>
                            실패 : {myStat.fail}<br></br>
                        </div> 
                        <div>
                            <RadarChart
                            cx={300}
                            cy={250}
                            outerRadius={150}
                            width={500}
                            height={500}
                            data={data}
                            >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis />
                            <Radar
                                name="Mike"
                                dataKey="value"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={1}
                            />
                            </RadarChart>
                        </div>
                            브론즈 : {myStat.브론즈}<br></br>
                            실버 : {myStat.실버}<br></br>
                            골드 : {myStat.골드}<br></br>
                            플레티넘 : {myStat.플레티넘}<br></br>
                            다이아몬드 : {myStat.다이아몬드}<br></br>
                            마스터 : {myStat.마스터}<br></br>
                            그랜드마스터 : {myStat.그랜드마스터}<br></br>
                            랭커 : {myStat.랭커}<br></br>

                        </>
                        ) 
                           : (
                           <div></div>
                           )}
                        <div>
                      
                    </div>                 
                </>
                ) : 
                (
                <>                        
                        <Grid container>
                            <TextField margin="normal" fullWidth required label="이메일" onChange={(e) => setTypeId(e.target.value)}/>
                            <TextField margin="normal" fullWidth required label="비밀번호" onChange={(e) => setTypePassword(e.target.value)} type="password" />
                            <Grid item xs>
                                <Button margin="normal" style={{backgroundColor: "#FFC288"}} sx = {{ fontSize: 20, ml: 0, border: 1, mt: 1, mb: 5}} 
                                fullWidth  variant="contained" onClick={ ()=> { signIn() }} type="submit">로그인
                                </Button>
                            </Grid>    
                                       
                            <TextField margin="normal" fullWidth required label="이메일" onChange={(e) => setTypeId(e.target.value)}/>
                            <TextField margin="normal" fullWidth required label="비밀번호" onChange={(e) => setTypePassword(e.target.value)} type="password" />          
                            <Grid item xs>
                            <Link to="/Terms" style={{color:"black"}} >이용약관에 동의합니다</Link>
                            <Button margin="normal" style={{backgroundColor: "#FFC288" }} sx = {{ fontSize: 20, ml: 0, border: 1, mt: 1}} 
                                fullWidth variant="contained" onClick={ ()=> { isChecked() }} type="submit">동의
                            </Button>   
                                <Button margin="normal" style={{backgroundColor: "#FFC288" }} sx = {{ fontSize: 20, ml: 0, border: 1, mt: 1}} 
                                fullWidth variant="contained" onClick={ ()=> { create() }} type="submit">회원가입
                                </Button>                                               
                            </Grid>                                   
                        </Grid>                                                                                           
                </>                     
                )  
            }
            </Box>
            
        </Container>
        <div className="adfit"></div>
        </div>
    );
}

export default Upload;

