import React, { useContext } from 'react';
import styled from 'styled-components';
import { LanguageContext } from './LanguageContext';
import { FlagIcon } from 'react-flag-kit';

const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 16px;

  @media (min-width: 1024px) and (max-width: 1440px) {
    margin-bottom: 12px;
  }
`;

export const StyledSelect = styled.select`
  width: 128px;

  @media (min-width: 1024px) and (max-width: 1440px) {
    font-size: 12px;
  }
`;

const RectangularFlagIcon = styled(FlagIcon)`
  width: 24px !important;
  height: 16px !important;
  margin-right: 12px;
`;

function Language() {
  const { locale, selectLanguage } = useContext(LanguageContext);

  return (
    <LanguageContainer>
      <RectangularFlagIcon code={locale === 'en' ? 'GB' : 'SK'} />
      <StyledSelect className="form-select form-control form-select-sm" value={locale} onChange={selectLanguage}>
        <option value="en">English</option>
        <option value="sk">Slovenský</option>
      </StyledSelect>
    </LanguageContainer>
  );
}

export default Language;