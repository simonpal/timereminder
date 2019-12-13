import React from 'react';
import { Event } from '../../model';

interface Props {
    children?: any;
    hideModal: () => void;
}

export const Modal = ({children, hideModal}: Props) => {
    
  return (
    <>
        <div className="overlay" onClick={hideModal}></div>
        <div className="modal">
            {children}
        </div>
    </>
  )
}