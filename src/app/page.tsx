"use client";
import "./styles/login.scss";
import { Input, Button, Form } from "antd";
import Image from "next/image";
import RootLayout from "./layout";
import Logo from "./../../public/images/logo.png";
import LoginImage from "./../../public/images/login-image.png";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const onFinish = (values: any) => {
        console.log('Success:', values);
        alert('submited')
        router.push('/onboarding');
    };      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
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
                    <h2> Login</h2>
                    <p>Please fill the below details to login your account.</p>
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
                    >
                        <Form.Item
                            label="Email ID"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input type="email" placeholder="Enter Email ID" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter Password" />
                        </Form.Item>
                        <Link href='/forgot-password' className="forget-pass" type="text">
                            Forgot Password?
                        </Link>
                        <Button type="primary" htmlType="submit" className="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
      </RootLayout>
    );
}
