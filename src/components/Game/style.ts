import styled from 'styled-components';
import bg from '../../assets/WAM_bg.jpg';

export const GameWrapper = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ScoreLabel = styled.span`
  font-weight: bold;
  font-size: xx-large;
  color: red;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: black;
`;

export const Score = styled.span`
  font-weight: bold;
  font-size: xx-large;
  color: black;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: white;
`;

export const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`;
