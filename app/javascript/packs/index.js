import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import 'antd/dist/antd.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
