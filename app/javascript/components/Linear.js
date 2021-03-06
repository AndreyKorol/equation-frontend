import React, { useState } from 'react'
import { Form, InputNumber, Button } from 'antd'
import { Typography, Alert } from 'antd';
import axios from 'axios'

const { Text } = Typography;

const LinearForm = (props) => {
  const [root, setRoot] = useState([])
  const [error, setError] = useState("")
  const { getFieldDecorator } = props.form

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if(!err){
        const options = {
          method: "post",
          url: "/api/v1/equations/linear",
          data: {
            coefficients: [values.a, values.b]
          }
        }

        axios(options)
          .then((response) => {
            if (response.status != 200){
              setError("Something wrong...")
            }

            if (response.data.root.length == 0){
              setError("no roots")
            } else {
              setRoot(response.data.root)
              setError("")
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  };


  return(
    <div>
      <p>
        <Text code>
          Enter coefficients of equation:
          ax + b = 0
        </Text>
      </p>
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
        <Form.Item>
          <Button htmlType="submit">
            Calcuate!
          </Button>
        </Form.Item>
      </Form>
      { error.length != 0 
        ? <Alert message={error} type="warning" />
        : root.map((root, index) => {
            return(
              <div>
                <Text code copyable={{text: root}}>
                  x<sub>{index + 1}</sub> = {root == "-Infinity..Infinity" ? root + " (It means you have endless set of solution)" :root}
                </Text>
                <br/>
              </div>
            )
          })
      }
    </div>
  )
}

const Linear = Form.create({ name: 'linear' })(LinearForm);

export default Linear;
