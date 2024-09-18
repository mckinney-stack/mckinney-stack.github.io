import styled from 'styled-components';
import { FaHockeyPuck } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

export const StyledLeaderboardBtn = styled(motion.button)`
    position: fixed;
    left: 32px;
    top: 32px;
    visibility: ${props => (props.isOpen ? 'hidden' : 'visible')};
`;

// Animation properties for StyledLeaderboardBtn
export const buttonVariants = {
  hidden: { opacity: 0, transition: { duration: 1 } },
  visible: { opacity: 1, transition: { delay: 1.5, duration: 1 } }
};

export const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

export const StyledLeaderboard = styled.div`
  position: fixed;
  top: 0;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  left: ${props => (props.isOpen ? '0' : '-100%')};
  width: 420px;
  height: 100%;
  background-color: black;
  color: white;
  z-index: 1000;
  transition: left 0.2s ease-in-out;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
 
  
  h2 {
    display: inline-block !important;
    margin: 0;
  }

    button { 
        color: white;
        float: right;
        font-weight: 600;
    }

    li {
      text-align: left;
      margin-bottom: 16px;

      span {
        font-weight: 600;
       }
    }

`;

export const PuckAndPlayContainer = motion.div;

export const containerVariants = {
  initial: { y: '0' },
  animate: { y: '18%', transition: { duration: 2 } },
  exit: { y: '0' },
};


export const StyledH1 = styled.h1`

  &.countdown {
        font-size: 176px !important;
    }

    @media (min-width: 1024px) and (max-width: 1440px) {

      &.countdown {
        font-size: 156px !important;
    }
    }
  

    display: flex;
    align-items: baseline;
    font-size: 60px;
    font-weight: 600;
    margin: 0 auto;
    text-align: center;
    will-change: transform, opacity;

    @media (max-width: 768px) {
        font-size: 120px;
    }

    @media (max-width: 480px) {
        /* font-size: 31.9vw;
        line-height: 38.4vw; */
        font-size: 13.4vw;
    }

    @media screen and (min-width: 1024px) {
        font-size: 44px;

        &.gameOver {
          font-size: 124px;
          margin-top: 56px;
        }
    }
    @media screen and (min-width: 1440px) {
        font-size: 56px;

        &.gameOver {
          font-size: 152px;
        }
    }
`;


export const H1HeadUp = ({ children, ...props }) => {
  
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return (
      <StyledH1
        initial={{ y: '-100vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'easeInOut', duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
        {...props}
      >
        {children}
      </StyledH1>
    );
  } else {
    return (
      <StyledH1>
        {children}
      </StyledH1>
    );
  }
};


export const MobPuckContainer = styled(motion.div)`

        background-color: black;
        color: ivory;
        padding: 32px;
        border-radius: 100%;
        height: 400px;
        width: 400px;
        display: flex; 
        justify-content: center; 
        align-items: center;
        border: 3px white solid;
        box-shadow: 12px 20px #141414;
        margin-right: 24px;  

    @media (max-width: 768px) {
        background-color: black;
        color: ivory;
        padding: 2vw;
        border-radius: 100%;
        height: 88vw;
        width: 88vw;
        display: flex; 
        justify-content: center; 
        align-items: center;
        border: 0.9vw white solid;
        box-shadow: 2vw 4vw #141414;
        margin-right: 2vw;
        /* transform: rotate(4deg); */
    }

    @media (min-width: 1024px) and (max-width: 1440px) {
      height: 280px !important;
      width: 280px !important;
      border: 2px white solid;
      box-shadow: 8px 12px #141414;
      margin-right: 8px;  
    }
    @media (min-width: 1440px) and (max-width: 1920px) {
      height: 360px;
      width: 360px;
      border: 3px white solid;
      box-shadow: 8px 16px #141414;
      margin-right: 8px;  
    }
`;

export const StaticPuckContainer = styled(MobPuckContainer)`

flex-direction: column !important;
justify-content: center; 

  @media (max-width: 768px) {
        padding: 2vw;
        border-radius: 100%;
        height: 88vw;
        width: 88vw;
        display: flex; 
        justify-content: center; 
        align-items: center;
        box-shadow: 2vw 4vw black;
        margin-right: 2vw;
    }

    @media (min-width: 1024px) and (max-width: 1440px) {
      height: 280px !important;
      width: 280px !important;
      border: 2px white solid;
      box-shadow: 8px 12px #141414;
      margin-right: 8px;  
    }
    @media (min-width: 1440px) and (max-width: 1920px) {
      height: 360px;
      width: 360px;
      border: 3px white solid;
      box-shadow: 8px 16px #141414;
      margin-right: 8px;  
    }
`;

export const StyledMobPuckContainer = ({ children }) => {

  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return (
      <MobPuckContainer
        initial={{ y: '-100vh', rotate: 0 }}
        animate={{ y: 0, rotate: 360 }}
        exit={{ x: '100vw' }}
        transition={{ type: 'tween', duration: 1, ease: [0.42, 0, 0.58, 1] }}
      >
        {children}
      </MobPuckContainer>
    );
  } else {
    return (
      <MobPuckContainer
        initial={{ y: '-100vh', rotate: 0 }}
        animate={{ y: 0, rotate: 360 }}
        exit={{ x: '100vw' }}
        transition={{ type: 'tween', duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
      >
        {children}
      </MobPuckContainer>
    );
  }

}; 

export const CenteredContainer = styled.div`

  margin-top: 96px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  height: 50vh; 
  text-align: center; 
  margin-bottom: 96px;

  @media (max-width: 480px) {
        margin-top: 26vw;
        margin-bottom: 14vw;
    }

    @media (min-width: 1024px) and (max-width: 1440px) {
      margin-top: 48px;
      margin-bottom: 56px;
      height: auto;
  }

`;


export const StyledH1Number = styled(StyledH1)`

    display: flex;
    font-size: 200px;
    font-weight: 600;
    margin: 0 auto;
    text-align: center;

    @media (max-width: 480px) {
        font-size: 63.8vw;
        line-height: 76.8vw;
    }

    @media (max-width: 768px) {
      font-size: 184px;
    }

    @media (min-width: 1024px) and (max-width: 1440px) {
      font-size: 156px;
    }
`;

export const StyledH3 = styled.h3`
    display: block;
    font-size: 128px;
    font-weight: 600;
    margin: 0 auto;
    text-align: center;


`;

export const StickhandleTypeH3 = styled(StyledH3)`
    position: fixed;
    top: -124px;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    font-size: 96px;
    white-space: nowrap;
    overflow: visible;
    text-align: center;

    @media (max-width: 768px) {
      top: -26vw;
      font-size: 14.9vw; 
      line-height: 12.6vw;
      white-space: normal;
      width: 100%;
    }

    @media (min-width: 1024px) and (max-width: 1440px) {
      position: fixed;
      top: -92px;
      width: auto;
      font-size: 56px;
    }

`;

export const StyledH6 = styled.h6`
    display: block;
    font-size: 20px;
    font-weight: 500;
    margin: 0 auto;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }

    @media (min-width: 1024px) and (max-width: 1440px) {
      font-size: 16px;

    }
`;

export const StyledFaHockeyPuck = styled(FaHockeyPuck)`
  position: relative;
  height: 40px;
  width: fit-content;
  

  @media (max-width: 1440px) {
    /* display: none; */
    height: 32px;
  }

  @media (max-width: 480px) {
    /* display: none; */
    height: 36px;
  }
`;

const HockeyPuckWrapper = styled(motion.div)`
  display: flex;
  align-items: baseline;
  margin-left: 24px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }

  @media (min-width: 1024px) and (max-width: 1920px) {
    margin-left: 16px;
  }
`;

export const HockeyPuck = () => {

  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return (
      <HockeyPuckWrapper
      animate={{ x: 0, rotate: [0, 718] }}
      transition={{ delay: 0.2, duration: 1 }}      
    >
      <StyledFaHockeyPuck/>
    </HockeyPuckWrapper>
    );
} else {
  return (
    <HockeyPuckWrapper
      animate={{ x: 0, rotate: [0, 718] }}
      transition={{ delay: 0.2, duration: 0.8 }}      
    >
      <StyledFaHockeyPuck/>
    </HockeyPuckWrapper>
  );
}
  

};

export const StyledFaHockeyPuckIn = styled(FaHockeyPuck)`
    position: relative;
    height: 40px;
    width: fit-content;
    top: 156px;
    margin-left: 40px;

    @media (max-width: 1440px) {
        height: 30px;
        margin-left: 20px;
    }

    @media (max-width: 480px) {
        height: 24px;
        margin-left: 12px;
    }
`;


export const StyledFaHockeyPuckOut = styled(FaHockeyPuck)`
    position: relative;
    height: 40px;
    width: fit-content;
    top: 156px;
    margin-left: 40px;

    @media (max-width: 1440px) {
        height: 30px;
        margin-left: 20px;
    }

    @media (max-width: 480px) {
        height: 24px;
        margin-left: 12px;
    }
`;

export const StyledTimer = styled.div`
  text-align: center;
  margin: 24px auto 48px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 48px;

  @media (min-width: 1024px) and (max-width: 1440px) {
    margin: 16px auto;
  }
`;


export const TimeDisplay = styled.div`
  display: inline-block;
  text-align: center;
  font-family: 'Space Mono', monospace;

  @media (min-width: 1024px) and (max-width: 1440px) {
      font-size: 12px;
    }

`;


export const StyledButton = styled.button.attrs(props => ({
    id: props.id,
  }))`
    /* Default styles */
    padding: 8px 48px;
    margin-bottom: 16px;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 1024px) and (max-width: 1440px) {
      font-size: 12px;
      padding: 8px 40px;
      margin-bottom: 4px;
    }
  
    /* Styles based on id */
    background-color: ${props => {
      switch (props.id) {
        case 'play':
          return 'green';
        case 'stop':
          return 'red';
        case 'reset':
          return 'blue';
        default:
          return 'gray';
      }
    }};

    &:hover {
      opacity: 0.9;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(0.95);
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }

    & > svg {
        margin-left: 8px;
    }
    
  `;
