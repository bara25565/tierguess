import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button'
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import styles from "../css/Main.module.css";



function Main() {

    function openPage() {
        window.open("https://www.naver.com/");
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

    return (
        <>
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems : 'center',
                }}
            >   
            <h1 className={styles.mainText}>오버워치<br></br>티어 맞추기</h1>
            <Link style={{width: '100%'}} to="/game">
                <Button style={{backgroundColor: "#91D8E4"}} sx = {{ fontSize: 30, border: 1, mt: 3 }} fullWidth  variant="contained" type="submit">시작</Button>
            </Link>                                              
            <Link style={{width: '100%'}} to="/upload">
                <Button style={{backgroundColor: "#91D8E4"}} sx = {{ fontSize: 30, border: 1, mt: 3 }} fullWidth  variant="contained" type="submit">내 영상 올리기</Button>
            </Link>
                
            <Button onClick={ () => openPage()} style={{backgroundColor: "#91D8E4" }} sx = {{ fontSize: 30, border: 1, mt: 3}} fullWidth  variant="contained" type="submit">게임 방법</Button>

            <footer>
                <p className="footerText">인스타/유튜브/후원</p>
                <img className={styles.insta} onClick={() => {window.open("https://www.instagram.com/damdam77_") }} src="/img/instagram.png" alt="instagram" />
                <img className={styles.insta} onClick={() => {window.open("https://www.youtube.com/@damdam77_") }} src="/img/youtube.png" alt="youtube" />
                <img className={styles.insta} onClick={() => {window.open("https://twip.kr/damdam7") }} src="/img/donate.png" alt="instagram" />
            </footer>
            
            </Box>
            <div className="adfit"></div>
        </Container>          
                                                     
        </>
        
    );
}

export default Main;