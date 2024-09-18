// Leaderboard.js
import React, { useState, useEffect } from 'react';
import { ref, get, child } from "firebase/database";
import { database } from './firebaseConfig';
import { StyledLeaderboard, StyledLeaderboardBtn, StyledFlexContainer, buttonVariants } from './StyledComponents';   
import { FormattedMessage } from 'react-intl';

const Leaderboard = ({ isActive }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchLeaderboardData = async () => {
        try {
          const dbRef = ref(database);
          const snapshot = await get(child(dbRef, 'users'));
          if (snapshot.exists()) {
            const data = snapshot.val();
            const formattedData = Object.keys(data).map(key => ({
              username: data[key].username,
              time: data[key].time,
              numericTime: convertTimeToSeconds(data[key].time)
            }));
            formattedData.sort((a, b) => b.numericTime - a.numericTime);
            setLeaderboardData(formattedData);
            console.log('Data available:', formattedData);
          } else {
            console.log('No data available');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchLeaderboardData();
    }
  }, [isOpen]);

  const convertTimeToSeconds = (time) => {
    const [minutes, seconds] = time.split(':').map(parseFloat);
    return minutes * 60 + seconds;
  };

  if (isActive) {
    return null; // Hide the leaderboard when isActive is true
  }

  return (
    <div>
      <StyledLeaderboardBtn 
        isOpen={isOpen}
        className="btn"
        initial="hidden"
        animate="visible"
        variants={buttonVariants} 
        onClick={() => setIsOpen(!isOpen)}>
        <FormattedMessage id="leaderBoard"/>
      </StyledLeaderboardBtn>
      <StyledLeaderboard isOpen={isOpen}>
        <StyledFlexContainer>
          <h2>
            <FormattedMessage id="leaderBoard"/>
          </h2>
          <button style={{color: 'white'}} className="btn" onClick={() => setIsOpen(!isOpen)}>
          x
          </button>
        </StyledFlexContainer>
        <ol>
          {leaderboardData.map((entry, index) => (
            <li key={index}>
              {entry.username} <br /><span>{entry.time}</span>
            </li>
          ))}
        </ol>
      </StyledLeaderboard>
    </div>
  );
};

export default Leaderboard;