"use client";
import { Input, Button, Form } from "antd"; 
import "../styles/login.scss";
import { useState } from "react";
import Image from "next/image";
import RootLayout from "../layout";
import Logo from "../../../public/images/logo.png";
import LoginImage from "../../../public/images/login-image.png";
import Emailsent from "../../../public/images/email-sent.svg";
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const router = useRouter();
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState('');
    const onFinish = (values: any) => {
        setEmail(values.email)
        setSent(true);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const openMail = () => {
        const recipient = email;
        const subject = 'Hello';
        const body = `Here is your link: https://inferq-beta.vercel.app/reset-password`;
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }
    const maskedEmail = "****" + email.substring(2);
    return (
      <RootLayout includeHeader={false}>
        <div className="login-page">
            <div className="welcome-section">
                <a href="/">
                    <Image src={Logo} alt="logo" className="logo" />
                </a>
                <h2>Welcome To InferQ</h2>
                <p>
                    Lörem ipsum hexaktig oska. Nira bidöhet. Ade prolyrat suprase och
                    primapod un. Regäheten lagt i yr sas regon. Galigt vatysade.
                </p>
                <Image src={LoginImage} alt="login image" className="login-image" />
            </div>
            <div className="log-in-section">
                <div>
                    {sent ? <div className="email-sent"><Emailsent /></div> : ''}
                   
                    <h2>{!sent ? 'Forgot your password?' : 'Reset link has been sent to your email'} </h2>
                    {!sent ? <p>Don’t worry, it can happen to anyone. Let’s help you reset it.</p> : <p>Link is sent to your email ending with <span>{maskedEmail}.</span> You can continue on the link and reset your password.</p>}
                    {!sent ? 
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
                        className="forgot-pass"
                    >
                        <Form.Item
                            label="Your Registered Email ID"
                            name="email"
                            rules={[{ required: true, message: 'Please Enter Your Email!' }]}
                        >
                            <Input type="email" placeholder="Enter Email ID" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="submit">
                            Send Reset Link
                        </Button>
                    </Form> : <Button onClick={openMail} type="primary" style={{width: '100%'}} className="submit">Open Email</Button> 
                    }
                </div>
            </div>
        </div>
      </RootLayout>
    );
}
