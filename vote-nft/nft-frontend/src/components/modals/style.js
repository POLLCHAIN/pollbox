import styled from 'styled-components';

import {Close} from "@styled-icons/material/Close";

export const ModalBody = styled.div`
  padding: 8px 12px;
`;
export const ModalHeader = styled.div`
   text-align: right;
`;
export const ModalCloseIcon = styled(Close)`
`;
export const ModalTitle = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`;
export const ModalRow = styled.div`
   display: flex;
   justify-content: space-between;
   margin: 20px 0;
`;
export const ModalLabel = styled.div`
    font-size: 16px;
    color: grey;
    margin: 0px 10px;
`;
export const ModalValue = styled.div`
    font-weight: bold;
    font-size: 16px;
    color: #1E2026;
`;

export const ModalCol = styled.div`
   display: flex;
   justify-content: space-between;
   margin: 20px 0;
`;

export const ModalTextArea = styled.textarea`
    flex-grow: 1;
    width: 100%;
    height: 80px;
    border-radius: 5px;
    padding: 5px;
    border: solid 1px;
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const ModalAction = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;
`;

export const ModalButton = styled.div`
    background-color: #ac5b2b;
    padding: 16px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    color:white;
`;
