"use client";
import React, {useState} from 'react';
import "../../styles/assets.scss";
import RootLayout from "../../layout";
import { Button, Dropdown } from "antd";
import Image from "next/image";
import ClientProfile from '../../../../public/images/user-profile.png';
import teamMember from '../../../../public/images/team-member-1.png';
import teamMember2 from '../../../../public/images/team-member-2.png';
import teamMember3 from '../../../../public/images/team-member-3.png';
import EditIcon from '../../../../public/images/edit.svg';
import UserIcon from '../../../../public/images/user-icon.svg';
import AssetsIcon from '../../../../public/images/assets-icon.svg';
import Turtorials from '../../../../public/images/support-icon.svg';
import RoleActiveIcon from '../../../../public/images/role-active-icon.svg';
import LogoutIcon from '../../../../public/images/logout.svg';
import SuccessMoadal from '../../components/SuccessModal';
import Link from 'next/link';
import MenuDot from '../../../../public/images/menu-dot.svg';
import Delete from '../../../../public/images/delete.svg';
import DeleteModal from '@/app/components/deleteModal';
import NewRoleModal from '@/app/components/NewRoleModal';
import { useRouter } from 'next/navigation';

interface Roles {
    name: string;
    users: number,
    permissions: {
        create: number;
        edit: number;
        delete: number;
        reschedule: number;
        assign: number;
    };
}
export default function Assets() {
    const userList: Roles[] = [
        {
            name: 'Manager',
            users: 5,
            permissions: {
                create: 2,
                edit: 2,
                delete: 0,
                reschedule: 1,
                assign: 0
            }
        },
        {
            name: 'Manager',
            users: 5,
            permissions: {
                create: 2,
                edit: 2,
                delete: 0,
                reschedule: 1,
                assign: 0
            }
        },
        {
            name: 'Manager',
            users: 5,
            permissions: {
                create: 2,
                edit: 2,
                delete: 0,
                reschedule: 1,
                assign: 0
            }
        },
        {
            name: 'Manager',
            users: 5,
            permissions: {
                create: 2,
                edit: 2,
                delete: 0,
                reschedule: 1,
                assign: 0
            }
        },
        {
            name: 'Manager',
            users: 5,
            permissions: {
                create: 2,
                edit: 2,
                delete: 0,
                reschedule: 1,
                assign: 0
            }
        },
        {
            name: 'Manager',
            users: 5,
            permissions: {
                create: 2,
                edit: 2,
                delete: 0,
                reschedule: 1,
                assign: 0
            }
        }
    ];
    const [visible, setVisible] = useState<string>('');
    const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [sucess, setSucess] = useState<string>('');
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
                            <div className="tab">
                                <Link href='/profile/users'><UserIcon /> <span>User</span></Link>
                            </div>
                            <div className="tab active">
                                <Link href='/profile/roles'><RoleActiveIcon /> <span>Role</span></Link>
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
                            <h2>All Roles</h2>
                            <Button onClick={() => setVisible('New Role')} type="primary">New Role</Button>
                        </div>
                        <div className="table-header role">
                            <div className="role-name">
                                Role Name
                            </div>
                            <div className="user-team">
                                Users
                            </div>
                            <div className="permissions">
                                Permissions
                            </div>
                            <div className="actions">
                                Action
                            </div>
                        </div>
                        <div className="users-list">
                            {userList.map((item, index) => (
                                <div className="user-list-item role" key={index}>
                                    <p className="role-name">
                                        {item.name}
                                    </p>
                                    <p className="users-team">
                                        <div className='inspection-team'>
                                            <div>
                                                <Image src={teamMember} alt='team-member' />
                                            </div>
                                            <div>
                                                <Image src={teamMember2} alt='team-member' />
                                            </div>
                                            <div>
                                                <Image src={teamMember3} alt='team-member' />
                                            </div>
                                            {item.users > 3 ? 
                                                <div>
                                                    <p>+{item.users - 3}</p>
                                                </div> : ''
                                            }
                                        </div>
                                    </p>
                                    <p className='permissions'>Create ({item.permissions.create}), Edit ({item.permissions.edit}), Delete ({item.permissions.delete}), Reschedule ({item.permissions.reschedule}), Assign ({item.permissions.assign}) </p>
                                    <div className="actions">
                                        <div className="action" onClick={() => setVisible('New Role')}>
                                            <div>
                                                <EditIcon />
                                            </div>
                                        </div>
                                        <div className="action" onClick={(event) => (event.stopPropagation())} >
                                            <Dropdown
                                                menu={{
                                                    items : [
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <DeleteModal visible={visibleDelete} setVisible={setVisibleDelete} handleOk={handleDelete} deleteId={deleteId} name="role" data={deleteText}  />
            <NewRoleModal visible={visible} setVisible={setVisible} sucess={sucess} handleOk={handleOk} />
            <SuccessMoadal sucess={sucess} sucesstext={`${sucess} has been created`} />
        </RootLayout>
    );
}
