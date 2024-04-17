"use client";
import React, {useState} from 'react';
import "../../styles/assets.scss";
import RootLayout from "../../layout";
import { Button, Dropdown } from "antd";
import Image from "next/image";
import ClientProfile from '../../../../public/images/user-profile.png';
import AssetsImage from '../../../../public/images/assets-image.png';
import AssetsIcon from '../../../../public/images/assets-icon.svg';
import RoleIcon from '../../../../public/images/role-icon.svg';
import Turtorials from '../../../../public/images/support-icon.svg';
import UserActiveIcon from '../../../../public/images/user-active-icon.svg';
import LogoutIcon from '../../../../public/images/logout.svg';
import SuccessMoadal from '../../components/SuccessModal';
import Link from 'next/link';
import Profile from '../../../../public/images/user-profile.png';
import Delete from '../../../../public/images/delete.svg';
import MenuDot from '../../../../public/images/menu-dot.svg';
import EditIcon from '../../../../public/images/edit.svg';
import AddUserModal from '@/app/components/AddUserModal';
import DeleteModal from '@/app/components/deleteModal';
import { useRouter } from 'next/navigation';

interface Asset {
    userImage: any;
    name: string;
    role: string;
    assets: number,
    mobileNum: string;
    email: string;
}

export default function Assets() {
    const userList: Asset[] = [
        {
            userImage: AssetsImage,
            name: 'Abhiskek Srivastav',
            role: 'Field Inspector',
            assets: 5,
            mobileNum: '+91 9876543210',
            email: 'abhishek@abc.in'
        },
        {
            userImage: AssetsImage,
            name: 'Abhiskek Srivastav',
            role: 'Field Inspector',
            assets: 5,
            mobileNum: '+91 9876543210',
            email: 'abhishek@abc.in'
        },
        {
            userImage: AssetsImage,
            name: 'Abhiskek Srivastav',
            role: 'Field Inspector',
            assets: 5,
            mobileNum: '+91 9876543210',
            email: 'abhishek@abc.in'
        },
        {
            userImage: AssetsImage,
            name: 'Abhiskek Srivastav',
            role: 'Field Inspector',
            assets: 5,
            mobileNum: '+91 9876543210',
            email: 'abhishek@abc.in'
        },
        {
            userImage: AssetsImage,
            name: 'Abhiskek Srivastav',
            role: 'Field Inspector',
            assets: 5,
            mobileNum: '+91 9876543210',
            email: 'abhishek@abc.in'
        },
        {
            userImage: AssetsImage,
            name: 'Abhiskek Srivastav',
            role: 'Field Inspector',
            assets: 5,
            mobileNum: '+91 9876543210',
            email: 'abhishek@abc.in'
        },
        {
            userImage: AssetsImage,
            name: 'Abhiskek Srivastav',
            role: 'Field Inspector',
            assets: 5,
            mobileNum: '+91 9876543210',
            email: 'abhishek@abc.in'
        },
        {
            userImage: AssetsImage,
            name: 'Abhiskek Srivastav',
            role: 'Field Inspector',
            assets: 5,
            mobileNum: '+91 9876543210',
            email: 'abhishek@abc.in'
        },
    ];
    const [visible, setVisible] = useState<string>('');
    const [sucess, setSucess] = useState<string>('');
    const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [deleteText, setDeleteText] = useState<string>('');
    const handleOk = (data: string): void => {
        setVisible('');
        setSucess(data);
        setTimeout(() => {
            setSucess('');
        }, 2000);        
    };
    const handleDelete = (data: number) => {
        setVisibleDelete(false);
        console.log(data, 'deleted')
    }
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
                            <div className="tab active">
                                <Link href='/profile/users'><UserActiveIcon /> <span>User</span></Link>
                            </div>
                            <div className="tab">
                                <Link href='/profile/roles'><RoleIcon /> <span>Role</span></Link>
                            </div>
                            <div className="tab">
                                <Link href='/profile/tutorials'><Turtorials /> <span>Tutorials </span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="container">
                        <div className="page-title">
                            <h2>All Users</h2>
                            <Button onClick={() => setVisible('Add User')} type="primary">New User</Button>
                        </div>
                        <div className="table-header">
                            <div className="user">
                                User
                            </div>
                            <div className="user-assets">
                                Assets
                            </div>
                            <div className="phone">
                                Mobile Number
                            </div>
                            <div className="email">
                                Email Address
                            </div>
                            <div className="actions">
                                Action
                            </div>
                        </div>
                        <div className="users-list">
                            {userList.map((item, index) => (
                                <div className="user-list-item">
                                    <div className="user">
                                        <div className="user-img">
                                            <Image src={Profile} alt={item.name} />
                                        </div>
                                        <div className="user-details">
                                            <p className="name">
                                                {item.name}
                                            </p>
                                            <p className="role">
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="user-assets">
                                        {item.assets}
                                    </p>
                                    <p className="phone">
                                        {item.mobileNum}
                                    </p>
                                    <p className="email">
                                        {item.email}
                                    </p>
                                    <div className="actions">
                                        <div className="action" onClick={() => setVisible('Add User')}>
                                            <div className='edit'>
                                                <EditIcon />
                                            </div>
                                        </div>
                                        <div className="action" onClick={(event) => (event.stopPropagation())} >
                                            <Dropdown
                                                menu={{
                                                    items: [
                                                        {
                                                            key: '0',
                                                            label: <div onClick={() => {setVisibleDelete(true); setDeleteId(index); setDeleteText(item.name)}}>Delete</div>,
                                                            icon: <div onClick={() => {setVisibleDelete(true); setDeleteId(index)}}><Delete /></div>,
                                                        },
                                                        {
                                                            key: '1',
                                                            label: <div onClick={() => {console.log('Item deleted')}}>Action 2</div>,
                                                            icon: <div onClick={() => {console.log('Item deleted')}}><Delete /></div>,
                                                        }
                                                    ]
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <DeleteModal visible={visibleDelete} setVisible={setVisibleDelete} handleOk={handleDelete} deleteId={deleteId} name="user" data={deleteText}  />
            <AddUserModal visible={visible} setVisible={setVisible} sucess={sucess} handleOk={handleOk} />
            <SuccessMoadal sucess={sucess} sucesstext={`${sucess} has been created`} />
        </RootLayout>
    );
}
