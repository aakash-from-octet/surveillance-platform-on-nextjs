'use client';
import { FC, useState, useEffect } from 'react';
import '@/app/styles/header.scss';
import Image from 'next/image';
import Logo from '../../../public/images/header-logo.png';
import Profile from '../../../public/images/profile.png';
import Notification from '../../../public/images/notification.svg';
import Home from '../../../public/images/home.svg';
import Inspecition from '../../../public/images/inspection.svg';
import DownArrow from '../../../public/images/down-arrow.svg';
import { Popover, Drawer, Dropdown} from 'antd';
import HeaderDesign from '../../../public/images/header-design.png';
import Link from 'next/link';
import MyProfileModal from './MyProfileModal';
import SuccessModal from './SuccessModal';
import User from '../../../public/images/profile-img.png';
import LogoutIcon from '../../../public/images/logout.svg';
import UserIcon from '../../../public/images/user-icon.svg';
import AssetsIcon from '../../../public/images/assets-icon.svg';
import Turtorials from '../../../public/images/support-icon.svg';
import RoleIcon from '../../../public/images/role-icon.svg';
import { usePathname  } from 'next/navigation';
import CloseIcon from '../../../public/images/cross.svg';
import MenuDot from '../../../public/images/menu-dot.svg';

const Header: FC = () => {
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
    };
    const [visible, setVisible] = useState(false);
    const [success, setSuccess] = useState('')
    const handleOk = (data: string) => {
        setVisible(false);
        setSuccess(data);
        setTimeout(() => {
            setSuccess('');
        }, 2000);
    }
    useEffect(() => {
        if(open === true) {
            document.body.classList.add('profile-open');
        } else {
            setTimeout(() => {
                document.body.classList.remove('profile-open');
            }, 200)
        }
    }, [open]);
    const pathname = usePathname();
    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const onClose = () => {
        setOpenDrawer(false);
    };
    const notificationList = [
        {
            title: 'Lorem Ipsum is a dummy text',
            des: 'Lorem ipsum dolor',
            time: '5 minutes ago'
        },
        {
            title: 'Lorem Ipsum is a dummy text',
            des: 'Lorem ipsum dolor',
            time: '5 minutes ago'
        },
        {
            title: 'Lorem Ipsum is a dummy text',
            des: 'Lorem ipsum dolor',
            time: '5 minutes ago'
        },
        {
            title: 'Lorem Ipsum is a dummy text',
            des: 'Lorem ipsum dolor',
            time: '5 minutes ago'
        }
    ];
    const [readNotification, setReadNotification] = useState<number[]>([]);
    const pushOrRemove = (index: number) => {
        setReadNotification([...readNotification, index]);
    };
    return (
        <header>
            <Image src={HeaderDesign} alt='header-design' className='header-design' />
            <div className='navbar'>
                <div className='logo-div'>
                    <Link href='/dashboard'>
                        <Image
                            src={Logo}
                            alt="logo"
                            className='header-logo'
                        />
                    </Link>
                </div>
                <ul className='nav-links'>
                    <li className='nav-link-item'>
                        <Link href='/dashboard' className={pathname === '/dashboard' ? 'active' : ''}>
                            <Home /> Home
                        </Link>
                    </li>
                    <li className='nav-link-item'>
                        <Link href='/inspection' className={pathname === '/inspection' ? 'active' : ''}>
                            <Inspecition />Inspection
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='right-header'>
                <div className='notification' onClick={showDrawer}>
                    <span></span>
                    <Notification />
                </div>
                <Drawer placement="right" width={506} onClose={onClose} closable={false} open={openDrawer}>
                    <div className="notification-title">
                        <div className='info'>
                            <p className="title">Notification</p>
                            <p className="count">2 Unread</p>
                        </div>
                        <div className="close-div" onClick={onClose}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="notification-list">
                        {notificationList.map((item, index) => (
                            <div className={readNotification.includes(index) ? "notification-item read" : 'notification-item'} key={index} onClick={() => pushOrRemove(index)}>
                                <div className="info">
                                    <div className="content">
                                        <p className="title">{item.title}</p>
                                        <p className="des">{item.des}</p>
                                    </div>
                                    <div className="action" onClick={(event) => (event.stopPropagation())} >
                                        <Dropdown
                                            menu={{
                                                items : [
                                                    {
                                                        key: '0',
                                                        label: <div onClick={() => {console.log('action', index)}}>Action 1</div>,
                                                    },
                                                    {
                                                        key: '1',
                                                        label: <div onClick={() => {console.log('action', index)}}>Action 2</div>,
                                                    }
                                                ],
                                            }}
                                            placement="bottomRight"
                                            trigger={['click']}
                                            className='clickable'
                                        >
                                            <div>
                                                <MenuDot />
                                            </div>
                                        </Dropdown>
                                    </div>
                                </div>
                                <p className="time">{item.time}</p>
                            </div>
                        ))}
                    </div>
                </Drawer>
                <Popover
                    content={
                        <div>
                            <div className="header">
                                <div className="user-profile">
                                    <Image src={User} alt='user' />
                                </div>
                                <p className="title">Varchasva Energy Pvt. Ltd.</p>
                            </div>
                            <div className="drop-list">
                                <Link href="/profile/assets" className="item">
                                    <AssetsIcon />Assets
                                </Link>
                                <Link href="/profile/users" className="item">
                                    <UserIcon />Users
                                </Link>
                                <Link href="/profile/roles" className="item">
                                    <RoleIcon />Role
                                </Link>
                                <Link href="/profile/tutorials" className="item">
                                    <Turtorials />Tutorials
                                </Link>
                            </div>
                            <div className="footer">
                                <div className="user" onClick={() => setVisible(true)}>
                                    <div className="user-img">
                                        <Image src={User} alt='user' />
                                    </div>
                                    <div className="">
                                        <p className="name">
                                            John Doe
                                        </p>
                                        <p className="email">
                                            ohn@abc.com
                                        </p>
                                    </div>
                                </div>
                                <Link className='ant-btn ant-btn-text' href='/' type='text'>
                                    <LogoutIcon /> Logout
                                </Link>
                            </div>
                        </div>
                    }
                    title="Title"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    className='profile-pop'
                    placement="bottomRight"
                >
                    <div className='profile'>
                        <div className='profile-img'>
                            <Image
                                src={Profile}
                                alt="logo"
                                className='header-logo'
                            />
                        </div>
                        <div className='profile-user-name'>
                            John Doe
                            <DownArrow className={open ? 'rotate' : ''} />
                        </div>
                    </div>
                </Popover>
            </div>
            <MyProfileModal visible={visible} setVisible={setVisible} handleOk={handleOk} success={success} />
            <SuccessModal sucess={success} sucesstext='New Changes Have Been Saved Successfully!' />
        </header>
    )
}
export default Header;  