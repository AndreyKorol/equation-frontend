import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import axios from 'axios'
import Linear from './Linear'
import Qudratic from './Quadratic'

axios.defaults.baseURL = 'https://solverapp.herokuapp.com/';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [key, setKey] = useState(1)

  return(
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          onClick={(item) => {setKey(item.key)}}
        >
          <Menu.Item key="1">Linear</Menu.Item>
          <Menu.Item key="2">Quadratic</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 450 }}>
          {(key == 1) ? <Linear/> : <Qudratic/>}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by AndreyKorol ©2019</Footer>
    </Layout>
  )
}

export default App;
