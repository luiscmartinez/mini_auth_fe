import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { createPopup } from './helpers'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { fetchAuth } from './actions/index'
import ShareModal from './utils/authModal'
import Success from './success'
function App(props) {
  const [post, setPost] = useState('')
  const auth = useSelector(state => state.auth)
  const isModalOpen = useSelector(state => state.modal.isAuthOpen)
  const redirectCallback = async () => {
    const isAuth = await dispatch(fetchAuth())
    if (isAuth.id) {
      props.history.push('/')
    }
  }
  const handleChange = e => {
    setPost(e.target.value)
  }
  const setIsActive = async () => {
    await dispatch({ type: 'AUTH_MODAL_CLOSE' })

  }
  const handleSubmit = () => {
    if (auth !== false) {
      console.log('in here bby')
    } else {
      dispatch({ type: 'AUTH_MODAL_OPEN' })
    }
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (!auth) {
      dispatch(fetchAuth())
    }
  })
  return (
    <div className='App' style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={e => {
          e.preventDefault()
          createPopup(
            `http://localhost:8000/auth/github`,
            'http://localhost:3000',
            redirectCallback
          )
        }}
      >
        <p>Sign up with Github</p>
      </button>
      <a href={`http://localhost:8000/auth/logout`}>
        <span>Logout</span>
      </a>
      <input value={post} onChange={handleChange} />
      <div>
        {isModalOpen && <ShareModal redirectCB={redirectCallback} setIsActive={setIsActive}/>}
        <button onClick={handleSubmit}>SUBMIT !</button>
      </div>
      <Route path='/success' component={Success} />
    </div>
  )
}

export default withRouter(App)
