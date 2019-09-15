import React from 'react'
import { Form, InputNumber, Button } from 'antd'
import axios from 'axios'

const Linear = () => {
  return(
    <Form layout="inline">
      <Form.Item label="a:" required>
        <InputNumber />
      </Form.Item>
      <Form.Item label="b:" required>
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button>
          Calcuate!
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Linear;
