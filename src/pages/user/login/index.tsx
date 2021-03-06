import { message, Form, Input, Button} from 'antd';
import React from 'react';
import {history, useModel} from 'umi';
import {FormInstance} from 'antd/es/form';
import {getPageQuery} from '@/utils/utils';
import {LoginParamsType, fakeAccountLogin} from '@/services/login';
import styles from './style.less';


/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let {redirect} = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      window.location.href = '/';
      return;
    }
  }
  history.replace(redirect || '/');
};

export interface LoginProps {
  from?: FormInstance;
}


const Login: React.FC<LoginProps> = (props) => {

  const {refresh} = useModel('@@initialState');


  const handleSubmit = async (values: LoginParamsType) => {
    try {
      // 登录
      const response:any = await fakeAccountLogin({...values});
      if (response.code === 0) {
        message.success('登陆成功！');
        replaceGoto();
        setTimeout(() => {
          refresh();
        }, 0);
        return;
      }else {
        message.error(response.msg);
      }
      // 如果失败去设置用户错误信息
    } catch (error) {
      message.error('登陆失败，请重试！');
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <h1>qianZir~</h1>
          <div className={styles.formContainer}>
            <Form
              hideRequiredMark={true}
              form={props.from}
              onFinish={(values) => {
                handleSubmit(values as LoginParamsType)
              }}
            >

              <Form.Item
                label="账号"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item>
                <Button className={styles.submit} type="primary" htmlType="submit">登录</Button>
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
