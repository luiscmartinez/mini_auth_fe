import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import ReuseablePortal from './modalPortal'
import useOnClickOutside from 'use-onclickoutside'
// import { ReactComponent as X } from 'assets/svg/x.svg'
import { createPopup } from '../helpers'
import githubSvg from '../assets/github.svg'
import twitterSvg from '../assets/twitter.svg'
import googleSvg from '../assets/google.svg'
import {useDispatch} from 'react-redux'
const ShareModal = props => {
  const { isActive, setIsActive, handleSubmit } = props
  const textareaRef = useRef()
  const modalRef = useRef(null)
  const dispatch = useDispatch()

  // detect clicks outside of modalRef
  useOnClickOutside(modalRef, setIsActive)


  return (
    <ReuseablePortal>
      <ModalWrapper
        className='modal-wrapper'
        onKeyDownCapture={e => {
          if (e.which === 27) {
            setIsActive()
          }
        }}
      >
        <div ref={modalRef} className='modal_'>
          <div className='top'>
            <div className='modal_name'>Pledge to your Allegiances {':)'}</div>
            <div className='modal_close' onClick={setIsActive}></div>
          </div>
          <div className='modal_group'>
            <button
              onClick={e => {
                e.preventDefault()
                createPopup(
                  `http://localhost:8000/auth/github`,
                  'http://localhost:3000',
                  props.redirectCB
                )
              }}
            >
              <img src={githubSvg} alt='github' />
              <p>Auth With Github</p>
            </button>

            <button>
              <img src={twitterSvg} />
              <p>Auth With Twitter</p>
            </button>
            <button>
              <img src={googleSvg} />
              <p>Auth With Google</p>
            </button>
          </div>
        </div>
      </ModalWrapper>
    </ReuseablePortal>
  )
}

export default ShareModal

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.88);
  z-index: 2;

  .modal_ {
    background-color: white;
    position: absolute;
    z-index: 1;
    text-align: center;
    top: 30%;
    left: 50%;
    transform: translate(-250px, -70px);
    width: 500px;
    height: 500px;
    border-radius: 6px;
    border: 5px solid #1a4570;
  }
  .tags {
    height: 30px;
    padding: 5px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding: 13px 18px 13px 25px;
    border-bottom: 1px solid #ddd;
    font-size: 1.6rem;
    margin-bottom: 14px;
    height: 64px;
    align-items: center;
  }

  .modal_name {
    letter-spacing: 1px;
    font-size: 2rem;
  }

  .modal_group {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .modal_group button {
    display: flex;
    width: 85%;
    align-items: center;
    justify-content: center;
    border: 1px solid lightgray;
    padding: 10px;
    border-radius: 80px;
    background: #cfd7ff;
    color: #1a4570;
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  .modal_group img {
    max-width: 55px;
  }
  .modal_group p {
    margin-left: 9px;
  }

  .modal_close:hover {
    cursor: pointer;
  }
`
