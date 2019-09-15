import React, { useState } from 'react'
import { Form, InputNumber, Button } from 'antd'
import axios from 'axios'

const QuadraticForm = (props) => {
  const [roots, setRoots] = useState([]);
  const { getFieldDecorator } = props.form

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if(!err){
        const options = {
          method: "post",
          url: "/api/v1/equations/quadratic",
          data: {
            coefficients: [values.a, values.b, values.c]
          }
        }

        axios(options)
          .then((response) => {
            setRoots(response.data.roots)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  };

  return(
    <div>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item label="a:" required>
          {getFieldDecorator('a', {
            rules: [{ required: true, message: 'Please input `a` coefficient!' }],
          })
          (<InputNumber />)}
        </Form.Item>
        <Form.Item label="b:" required>
          {getFieldDecorator('b', {
            rules: [{ required: true, message: 'Please input `b` coefficient!' }],
          })
          (<InputNumber />)}
        </Form.Item>
        <Form.Item label="c:" required>
          {getFieldDecorator('c', {
            rules: [{ required: true, message: 'Please input `c` coefficient!' }],
          })
          (<InputNumber />)}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            Calcuate!
          </Button>
        </Form.Item>
      </Form>
      {roots.map((root, index) => { return(<p>{index + 1} root: {root}</p>) })}
    </div>
  )
}

const Quadratic = Form.create({ name: 'quadratic' })(QuadraticForm);

export default Quadratic;