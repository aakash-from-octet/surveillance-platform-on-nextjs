"use client";
import { Input, Button, Form } from "antd"; 
import "../styles/login.scss";
import { useState } from "react";
import RootLayout from "../layout";
import { useRouter } from 'next/navigation';
import SuccessMoadal from '../components/SuccessModal';

export default function ResetPassword() {
    const router = useRouter();
    const [strength, setStrength] = useState(1);
    const [status, setStatus] = useState('');
    const onFinish = (values: any) => {
        console.log(values);
        setStatus('password')
        setTimeout(() => {
            setStatus('')
            router.push('/');
        }, 4000); 
    };      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
      <RootLayout includeHeader={false}>
        <div className="login-page" style={{backgroundColor: '#E1E7EC'}}>
            <div className="log-in-section reset-pass">
                <div>                   
                    <h2>Reset Password</h2>
                    <p>Create a strong password which you can remember.</p>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        className="reset-pass"
                    >
                        <Form.Item
                            name="password"
                            label="New Pasword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter New Password" />
                        </Form.Item>
                        <Form.Item
                            name="confirm-password"
                            label="Confirm Password"
                            rules={[{ required: true, message: 'Please confirm your password!' }]}
                        >
                            <Input.Password placeholder="Confirm New Password" />
                        </Form.Item>
                        <div className="password-intensity">
                            <div className="bars">
                                <div className="bar" onClick={() => setStrength(strength + 1)} style={{ backgroundColor: strength === 1 ? '#EE4D55' : strength === 2 ? '#F8D757' : '#44C859'}}></div>
                                <div className="bar" onClick={() => setStrength(strength + 1)} style={{ backgroundColor: strength === 1 ? '' : strength === 2 ? '#F8D757' : '#44C859'}}></div>
                                <div className="bar" onClick={() => setStrength(strength + 1)} style={{ backgroundColor: strength === 1 ? '' : strength === 2 ? '' : '#44C859'}}></div>
                            </div>
                            <p className="text" style={{color: strength === 1 ? '#EE4D55' : strength === 2 ? '#F8D757' : '#44C859'}}>{strength === 1 ? 'Weak' : strength === 2 ? 'Medium' : 'Strong'}</p>
                        </div>
                        <div className="password-instructions">
                            <p>Your new password must have :</p>
                            <ul>
                                <li>
                                    Not be the same as your username
                                </li>
                                <li>
                                    not be one of the previous 10 used passwords.
                                </li>
                                <li>
                                    be at least 10 characters long contain mixed case characters
                                </li>
                                <li>
                                    contain numeric digits contain special characters
                                </li>
                            </ul>
                        </div>
                        <Button type="primary" htmlType="submit" className="submit">
                            Create New Password
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
        <SuccessMoadal sucess={status} sucesstext={`Your account security credentials have been updated successfully! `} />
      </RootLayout>
    );
}
