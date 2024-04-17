"use client";
import React, {useRef, useEffect, useState} from 'react';
import "../../styles/assets.scss";
import RootLayout from "../../layout";
import { Button, Input } from "antd";
import Image from "next/image";
import ClientProfile from '../../../../public/images/user-profile.png';
import UserIcon from '../../../../public/images/user-icon.svg';
import AssetsIcon from '../../../../public/images/assets-icon.svg';
import RoleIcon from '../../../../public/images/role-icon.svg';
import TutorialActiveIcon from '../../../../public/images/support-active-icon.svg';
import LogoutIcon from '../../../../public/images/logout.svg';
import Link from 'next/link';
import PlayVid from '../../../../public/images/play-vid.png';
import SearchIcon from '../../../../public/images/search.svg';
import { useRouter } from 'next/navigation';

interface Tutorials {
    name: string;
    src: string;
}

export default function Tutorials() {
    const tourList: Tutorials[] = [
        {
            name: 'How To Upload Documents?',
            src: '/search.mp4'
        },
        {
            name: 'How To Upload Image?',
            src: '/search.mp4'
        },
        {
            name: 'How To Upload Form?',
            src: '/search.mp4'
        }
    ];
    const tourList2: Tutorials[] = [
        {
            name: 'How To Upload Documents?',
            src: '/search.mp4'
        },
        {
            name: 'How To Upload Map?',
            src: '/search.mp4'
        },
        {
            name: 'How To Upload Videos?',
            src: '/search.mp4'
        }
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event: any) => {
        const { value } = event.target;
        setSearchTerm(value);
    };
    const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
    const [activeVideoIndex, setActiveVideoIndex] = useState<number[]>([]);
    const vid = useRef<HTMLVideoElement>(null);
    const pushOrRemove = (index: number) => {
        if (activeVideoIndex.includes(index)) {
            setActiveVideoIndex(activeVideoIndex.filter((i) => i !== index));
          } else {
            setActiveVideoIndex([...activeVideoIndex, index]);
          }
    };
    useEffect(() => {
        if(vid.current) {
            if (selectedVideoIndex !== null && activeVideoIndex.includes(selectedVideoIndex)) {
                vid.current.play();
            }
            else {
                vid.current.pause();
            }
        }
    }, [selectedVideoIndex, activeVideoIndex]);
    const router = useRouter();
    const logout = () => {
        router.push('/');
    }
    return (
        <RootLayout includeHeader={true}>
            <div className="tabs-page">
                <div className="page-header">
                    <div className="container">
                        <div className="client">
                            <div className="client-details">
                                <div className="client-image">
                                    <Image src={ClientProfile} alt="client-profile" />
                                </div>
                                <div className="client-content">
                                    <p className="title">Varchasva Energy Pvt. Ltd.</p>
                                    <p className="desc">Last Logged in 5 Hours Ago</p>
                                </div>
                            </div>
                            <Button type="text" onClick={logout}><LogoutIcon /> Logout</Button>
                        </div>
                        <div className="tabs">
                            <div className="tab">
                                <Link href='/profile/assets'><AssetsIcon /> <span>Assets</span></Link>
                            </div>
                            <div className="tab">
                                <Link href='/profile/users'><UserIcon /> <span>User</span></Link>
                            </div>
                            <div className="tab">
                                <Link href='/profile/roles'><RoleIcon /> <span>Role</span></Link>
                            </div>
                            <div className="tab active">
                                <Link href='/profile/tutorials'><TutorialActiveIcon /> <span>Tutorials </span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="container">
                        <div className="page-title">
                            <h2>How Can We Help You?</h2>
                            <Input placeholder="Search Tutorials" onChange={(e) => handleSearch(e)} prefix={<SearchIcon />} />
                        </div>
                        <div className="tutorial-main-list">
                            <div>
                                <h3 className="tutorial-title">Tutorials</h3>
                                <div className="tutorial-list">
                                {tourList
                                    .filter((data) =>
                                        data.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((data, index) => (
                                        <div className="tutorial-list-item" key={index}>
                                            <div className="vid" onClick={() => {
                                                setSelectedVideoIndex(index);
                                                pushOrRemove(index);
                                            }}>
                                                <Image src={PlayVid} alt='video' className={ selectedVideoIndex !== null && activeVideoIndex.includes(index) ? 'none' : ''} />
                                                <video loop ref={selectedVideoIndex === index ? vid : null} className='success-video' style={{ width: '100%', height: '100%' }}>
                                                    <source src={data.src} />
                                                </video>
                                            </div>
                                            <div className="desc">
                                                <p>{data.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="tutorial-title">Best Practices</h3>
                                <div className="tutorial-list">
                                {tourList2
                                    .filter((data) =>
                                        data.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((data, index) => (
                                        <div className="tutorial-list-item" key={index}>
                                            <div className="vid" onClick={() => {
                                                setSelectedVideoIndex(index);
                                                pushOrRemove(index);
                                            }}>
                                                <Image src={PlayVid} alt='video' />
                                                <video loop className='success-video' style={{ width: '100%', height: '100%' }}>
                                                    <source src={data.src} />
                                                </video>
                                            </div>
                                            <div className="desc">
                                                <p>{data.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
}
