import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';


const FormGroup = styled.div`
  width: 256px;
  margin: 0 auto;
  justify-content: center;
`;

const BsLabel = styled.label`
  font-weight: 600;
  margin-right: 12px;

  @media (min-width: 1024px) and (max-width: 1440px) {
    font-size: 12px;
    margin-right: 8px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 160px;
`;

const BsInput = styled.input`
  width: 160px;
  position: relative;
  z-index: 2;
  
  &:active, &:focus {
    background-color: transparent !important;
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    font-size: 12px;
  }

`;

const BsUserInputShadow = styled.input`
  
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent !important;
  pointer-events: none;
  color: #adb5bd !important;

  &.disabled {
    background-color: transparent !important;
    position: absolute !important;
    color: #adb5bd !important;
    z-index: -300;
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    font-size: 12px;
  }

`;


function handleSubmit(e) {
  e.preventDefault();
}



export default function UserName({userName, setUserName}) {

  const [userNames, setUserNames] = useState([]);
  const [suggestion, setSuggestion] = useState('');
 

  useEffect(() => {
    const db = getDatabase();
    get(ref(db, 'users')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const names = Object.keys(data);
        setUserNames(names);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [userNames]);

  useEffect(() => {
    if (userName) {
      const match = userNames.find(name => name.startsWith(userName));
      setSuggestion(match ? match : '');
    } else {
      setSuggestion('');
    }
  }, [userName, userNames]);


  return (
    <FormGroup className="form-group d-flex align-items-center" onSubmit={handleSubmit}>
      <BsLabel htmlFor="nameInput" className="mr-2">
        <FormattedMessage id="player" />
      </BsLabel>
      <InputContainer>
      <BsInput placeholder="Bobby Orr" type="text" className="form-control form-control-sm" id="nameInput" value={userName} onChange={e => setUserName(e.target.value)} onKeyDown={e => {
          if (e.key === 'Tab') {
            e.preventDefault();
            setUserName(suggestion);
          }
        }}
        onTouchMove={() => {if (suggestion) {setUserName(suggestion)}}}
        />
        <BsUserInputShadow type="text" className="form-control form-control-sm" value={suggestion} disabled/>
      </InputContainer>
    </FormGroup>
  );
};



