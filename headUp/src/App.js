import React, { useState, useEffect, useRef } from 'react';
import Counter from './Counter';
import StickhandleType from './StickhandleType';
import Timer from './Timer';
import UserName from './UserName';
import Leaderboard from './Leaderboard';
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { FormattedMessage } from 'react-intl';
import Language from './Language';
import { StyledH1, PuckAndPlayContainer, containerVariants, H1HeadUp, StyledH6, HockeyPuck, CenteredContainer, StyledMobPuckContainer, StaticPuckContainer } from './StyledComponents';
import { ref, set, get } from "firebase/database";
import { useIntl } from 'react-intl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence, layout } from 'framer-motion';
import { database } from './firebaseConfig';



function App() {

    const intl = useIntl();

    const types = ['wide', 'narrow', 'figureEight', 'freestyle', 'leftLeg', 'rightLeg'];

    const { locale, selectLanguage } = useContext(LanguageContext);

    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [number, updateNumber] = useState(0);
    const [type, setType] = useState(types[Math.floor(Math.random() * types.length)]);
    const [isStarting, setIsStarting] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [isCountdownOver, setIsCountdownOver] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [userName, setUserName] = useState('');
    const [isPlayHovered, setIsPlayHovered] = useState(false);
    const [hideInputs, setHideInputs] = useState(false);


    const userTime = formatTime(seconds, milliseconds);

    const countdownIntervalRef = useRef(null);
    const countdownTimeoutRef = useRef(null);

    function isValidUserName(userName) {
      const words = userName.trim().split(' ');
      return words.length >= 2;
    }

    const toastOne = () => toast(intl.formatMessage({ id: 'enterName' }), {
      position: "bottom-right", 
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: false,
      progressStyle: { background: 'red' },
    });
    const toastTwo = () => toast(intl.formatMessage({ id: 'enterFullName' }), {
      position: "bottom-right", 
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: false,
      progressStyle: { background: 'red' },
    });
  
    function handlePlay() {

      if (!userName) {
        toastOne();
        return;
      } 
      if (!isValidUserName(userName)) {
        toastTwo();
        return;
      }

        setHideInputs(true);
        setIsFirstRender(false);
        setIsActive(!isActive);
        if (isActive) {
          setIsStarting(false);
        } else if (!isActive) {
          setIsStarting(true);
        }
        setTimeout(() => {
          countdownIntervalRef.current = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
          countdownTimeoutRef.current = setTimeout(() => {
            setIsStarting(false);
            setIsCountdownOver(true);
            clearInterval(countdownIntervalRef.current);
          }, 3000);
        }, 400);
      }

  function formatTime(seconds, milliseconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const remainingMilliseconds = Math.floor(milliseconds % 1000 / 10);

    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(remainingSeconds).padStart(2, '0');
    const millisecondsStr = String(remainingMilliseconds).padStart(2, '0');

    return `${minutesStr}:${secondsStr}:${millisecondsStr}s`;
}
 
function handleStop(userName, userTime, isCountdownOver) {
  
  if (countdownIntervalRef.current) {
    clearInterval(countdownIntervalRef.current);
  }
  if (countdownTimeoutRef.current) {
    clearTimeout(countdownTimeoutRef.current);
  }

  if (!isCountdownOver) {
    reset();
    return;
  }

  setIsActive(false);
  
  // Write data to firebase
  set(ref(database, 'users/' + userName), {
    username: userName,
    time: userTime
  })
  .then(() => {
    console.log("Data written successfully!");
  })
  .catch((error) => {
    console.error("Error writing data: ", error);
  });

  // Display data from firebase in console - use this functionality for "leaderboard" tab
  get(ref(database, 'users/')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}
  
useEffect(() => {
  let interval = null;
  let startTime = null;
  if (isActive && isCountdownOver) {
      startTime = Date.now();
      interval = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          const elapsedSeconds = Math.floor(elapsedTime / 1000);
          const elapsedMilliseconds = elapsedTime % 1000;
          setSeconds(elapsedSeconds);
          setMilliseconds(elapsedMilliseconds);
          setIsGameOver(false);
      }, 1);
  } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      updateNumber(0);
      setIsGameOver(true);
  }
  return () => clearInterval(interval);
}, [isActive, isCountdownOver]);

    function reset() {

        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
        }
        if (countdownTimeoutRef.current) {
          clearTimeout(countdownTimeoutRef.current);
        }
        setHideInputs(false);
        setSeconds(0);
        setMilliseconds(0);
        setIsActive(false);
        updateNumber(0);
        setType(types[Math.floor(Math.random() * types.length)]);
        setIsStarting(false);
        setCountdown(3);
        setIsCountdownOver(false);
        setIsFirstRender(true);
        setUserName(''); // commented out to make testing easier
    }
  
    return (
      <>
      
       <PuckAndPlayContainer
        variants={containerVariants}
        initial="initial"
        animate={hideInputs ? "animate" : "exit"}
       >
        <ToastContainer />
        <CenteredContainer>
          {isStarting ? (
            <>
            <StaticPuckContainer>
              <StyledH6>
                <FormattedMessage id="getReady"/>
              </StyledH6>
              <StyledH1 className={'countdown'}>{countdown}</StyledH1>
            </StaticPuckContainer>
            </>
          ) : isActive ? (
            <>
              <StickhandleType types={types} type={type} setType={setType} isActive={isActive} />
              <StaticPuckContainer>
                <Counter number={number} updateNumber={updateNumber} isActive={isActive} />
              </StaticPuckContainer>
            </>
          ) : isFirstRender ? (
            <>
            <Leaderboard />
            <StyledMobPuckContainer>
                <H1HeadUp>
                    HeadUp
                    <HockeyPuck />
                </H1HeadUp>
              </StyledMobPuckContainer>
            </>
          ) : (
            <StyledH1 className="gameOver">
              <FormattedMessage id="gameOver" />
            </StyledH1>
          )}
        </CenteredContainer>
        <Timer
    userTime={userTime} 
    isActive={isActive} 
    isFirstRender={isFirstRender} 
    handlePlay={handlePlay} 
    handleStop={handleStop} 
    handleReset={reset} 
    userName={userName} 
    isCountdownOver={isCountdownOver} 
    onMouseEnter={() => setIsPlayHovered(true)} 
    onMouseLeave={() => setIsPlayHovered(false)}
  />        
  </PuckAndPlayContainer>
        <AnimatePresence>
          {!hideInputs ? (
            <>
            <motion.div
            initial={{ opacity: 0, transform: 'translateY(100vw)' }}
            animate={{ opacity: 1, transform: 'translateY(0)' }}
    exit={{ transform: 'translateY(100vw)' }}
    transition={{ duration: 0.4 }}
  >
                <Language />
                <UserName userName={userName} setUserName={setUserName} />
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </>
    );
  }
  
export default App;