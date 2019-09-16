import React, { useState } from 'react'
import { Form, InputNumber, Button } from 'antd'
import { Typography } from 'antd';
import axios from 'axios'

const { Text } = Typography;

const QuadraticForm = (props) => {
  const [roots, setRoots] = useState([])
  const [error, setError] = useState("")
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
            if (response.data.error ){
              setError(response.data.error)
            } else {
              setRoots(response.data.roots)
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
      { error.length != 0 
        ? <Text code>
            {error}
          </Text>
        : roots.map((root, index) => {
            return(
              <div>
                <Text code copyable={{text: root}}>
                  x<sub>{index + 1}</sub> = {root}
                </Text>
                <br/>
              </div>
            )
          })

      }
    </div>
  )
}

const Quadratic = Form.create({ name: 'quadratic' })(QuadraticForm);

export default Quadratic;