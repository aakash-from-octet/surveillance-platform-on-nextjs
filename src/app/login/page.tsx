"use client";
import "../styles/login.scss";
import { Input, Button } from "antd";
import Image from "next/image";
import RootLayout from "../layout";
import Logo from "../../../public/images/logo.png";
import LoginImage from "../../../public/images/login-image.png";
import { useRouter } from 'next/navigation';

export default function Login(): JSX.Element {
    const router = useRouter();
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        router.push('/onboarding'); 
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
                        primapod un. Regäheten lagt i yr sas regon. Galigt vatysade.{" "}
                    </p>
                    <Image src={LoginImage} alt="login image" className="login-image" />
                </div>
                <div className="log-in-section">
                    <div>
                        <h2> Login</h2>
                        <p>Please fill the below details to login your account.</p>
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email ID:</label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Email ID"
                            />
                            <label htmlFor="password">Password</label>
                            <Input.Password
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                            />
                            <Button className="forget-pass" type="text">
                                Forgot Password?
                            </Button>
                            <Button className="submit" type="primary" htmlType="submit">
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
}
