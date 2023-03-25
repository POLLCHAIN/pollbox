import styled from 'styled-components';

export const Paper = styled.div`
  outline: none !important;    
  background-color: #04061D;
  max-width: 300px;
  position: relative;
  width: 95vw;
  box-shadow: 0 0 4px #fff;
  border-radius: 7px;
  &:hover {
    box-shadow: 0 0 8px #fff;    
  }  
`
export const ModalContents = styled.div`
  text-align: center;
  padding: 2rem;
  p {
    font-size: 16px;
    font-weight: 400;
    max-width: 600px;
    margin: 0 0 20px;
    color: #eee;
    line-height: 1.6;
  }
`
export const TopLeftCorner = styled.div`
  position: absolute;
  width: 1rem;
  height: 1rem;
  transition: all .3s ease;
  border-top: 3px solid #ffc107;
  border-left: 3px solid #ffc107;
  top: -3px;
  left: -3px;
  border-top-left-radius: 10px;
`
export const BottomRightRadius = styled.div`
  border-bottom: 3px solid #ffc107;
  border-right: 3px solid #ffc107;
  bottom: -3px;
  right: -3px;
  border-bottom-right-radius: 10px;
  position: absolute;
  width: 1rem;
  height: 1rem;
  transition: all .3s ease;
`
export const MiddleBorder = styled.div`
  width: 2rem; 
  top: -3px;
  border-bottom: 3px solid #ffc107;
  border-top: 3px solid #ffc107;
  position: absolute;
  transition: all .3s ease;
  left: 50%;
  transform: translateX(-50%);
  height: calc(100% + 6px);
`
export const Button = styled.button`
  background-color: #ffc107;
  color: #111;
  border: 0;
  padding: 12px 30px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: ${props => props.size === 'medium' ? '16px' : '18px'};
  line-height: 1.3;
  letter-spacing: 0.025em;
  font-family: 'Roboto', sans-serif;
  height: ${props => props.size === 'large' ? '60px' : 'auto'};
  width: ${props => props.width || 'auto'};
  margin: ${props => props.margin || '0'};
  box-shadow: 2px 2px 20px 0px rgba(131, 100, 226, 0);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 2px 2px 20px 0px #ffc107;
    transition: all 0.3s ease;
  }
`