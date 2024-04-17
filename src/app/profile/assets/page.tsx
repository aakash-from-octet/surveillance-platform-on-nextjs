"use client";
import React, {useState} from 'react';
import "../../styles/assets.scss";
import RootLayout from "../../layout";
import { Button } from "antd";
import Image from "next/image";
import ClientProfile from '../../../../public/images/user-profile.png';
import AssetsImage from '../../../../public/images/assets-image.png';
import teamMember from '../../../../public/images/team-member-1.png';
import teamMember2 from '../../../../public/images/team-member-2.png';
import teamMember3 from '../../../../public/images/team-member-3.png';
import DeleteIcon from '../../../../public/images/delete.svg';
import EditIcon from '../../../../public/images/edit.svg';
import UserIcon from '../../../../public/images/user-icon.svg';
import RoleIcon from '../../../../public/images/role-icon.svg';
import Turtorials from '../../../../public/images/support-icon.svg';
import AssetsActiveIcon from '../../../../public/images/assets-active-icon.svg';
import LogoutIcon from '../../../../public/images/logout.svg';
import NewAssetModal from '../../components/NewAssetModal';
import SuccessMoadal from '../../components/SuccessModal';
import Link from 'next/link';
import DeleteModal from '@/app/components/deleteModal';
import { useRouter } from 'next/navigation';

interface Asset {
    assetImage: any;
    assetTitle: string;
    statusText: string;
    status: string;
    assetId: string;
    location: string;
    area: string;
    capacity: string;
    team: number;
}

export default function Assets() {
    const assetsList: Asset[] = [
        {
            assetImage: AssetsImage,
            assetTitle: 'Arianto grant Limited plant, Ahmedabad, Gujarat.',
            statusText: 'Active',
            status: 'active',
            assetId: '4561236',
            location: '115°N, 145°N',
            area: '34 Acres',
            capacity: '100 Kw',
            team: 5
        },
        {
            assetImage: AssetsImage,
            assetTitle: 'Arianto grant Limited plant, Ahmedabad, Gujarat.',
            statusText: 'Active',
            status: 'active',
            assetId: '4561236',
            location: '115°N, 145°N',
            area: '34 Acres',
            capacity: '100 Kw',
            team: 5
        },
        {
            assetImage: AssetsImage,
            assetTitle: 'Arianto grant Limited plant, Ahmedabad, Gujarat.',
            statusText: 'Active',
            status: 'active',
            assetId: '4561236',
            location: '115°N, 145°N',
            area: '34 Acres',
            capacity: '100 Kw',
            team: 5
        },
        {
            assetImage: AssetsImage,
            assetTitle: 'Arianto grant Limited plant, Ahmedabad, Gujarat.',
            statusText: 'Active',
            status: 'active',
            assetId: '4561236',
            location: '115°N, 145°N',
            area: '34 Acres',
            capacity: '100 Kw',
            team: 5
        },
        {
            assetImage: AssetsImage,
            assetTitle: 'Arianto grant Limited plant, Ahmedabad, Gujarat.',
            statusText: 'Active',
            status: 'active',
            assetId: '4561236',
            location: '115°N, 145°N',
            area: '34 Acres',
            capacity: '100 Kw',
            team: 5
        },
        {
            assetImage: AssetsImage,
            assetTitle: 'Arianto grant Limited plant, Ahmedabad, Gujarat.',
            statusText: 'Active',
            status: 'active',
            assetId: '4561236',
            location: '115°N, 145°N',
            area: '34 Acres',
            capacity: '100 Kw',
            team: 5
        },
        {
            assetImage: AssetsImage,
            assetTitle: 'Arianto grant Limited plant, Ahmedabad, Gujarat.',
            statusText: 'Active',
            status: 'active',
            assetId: '4561236',
            location: '115°N, 145°N',
            area: '34 Acres',
            capacity: '100 Kw',
            team: 5
        }
    ];
    const [visible, setVisible] = useState<string>('');
    const [sucess, setSucess] = useState<string>('');
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [deleteId, setDeleteId] = useState(0);
    const [deleteText, setDeleteText] = useState('');
    const router = useRouter();
    const logout = () => {
        router.push('/');
    }
    const handleOk = (data: string): void => {
        setVisible('');
        setSucess(data);
        setTimeout(() => {
            setSucess('');
        }, 2000);        
    };
    const handleDeleteTrigger = (index: number, text: string) => {
        setDeleteId(index);
        setDeleteText(text);
        setVisibleDelete(true)
    }
    const handleDelete = (data: number) => {
        setVisibleDelete(false)
        console.log(data, 'is deleted')
    }
    const goToInspection = () => {
        router.push('/inspection-details');
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
                            <div className="tab active">
                                <Link href='/profile/assets'><AssetsActiveIcon /> <span>Assets</span></Link>
                            </div>
                            <div className="tab">
                                <Link href='/profile/users'><UserIcon /> <span>User</span></Link>
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
                            <h2>All Assets</h2>
                            <Button onClick={() => setVisible('New Asset')} type="primary">New Asset</Button>
                        </div>
                        <div className="assets-list">
                            {assetsList.map((item, index) => (
                                <div className="asset-item" key={index}>
                                    <div className="assets-inspection">
                                        <div className="assets-name">
                                            <div className="assets-image">
                                                <Image src={item.assetImage} alt="assets-image" />
                                            </div>
                                            <div>
                                                <p className="assets-title">
                                                    {item.assetTitle}
                                                </p>
                                                <p className={`status-badge ${item.status === 'active' ? 'active' : item.status === 'on-going' ? 'on-going' : ''}`}>
                                                    {item.statusText}
                                                </p>
                                            </div>
                                        </div>
                                        <Button onClick={goToInspection} type="default">View Inspections</Button>
                                    </div>
                                    <div className="assets-details">
                                        <div className="assets-details-inner">
                                            <div className="asset-info">
                                                <p className="title">Asset ID</p>
                                                <p className="value">{item.assetId}</p>
                                            </div>
                                            <div className="asset-info">
                                                <p className="title">Asset ID</p>
                                                <p className="value">{item.location}</p>
                                            </div>
                                            <div className="asset-info">
                                                <p className="title">Asset ID</p>
                                                <p className="value">{item.area}</p>
                                            </div>
                                            <div className="asset-info">
                                                <p className="title">Asset ID</p>
                                                <p className="value">{item.capacity}</p>
                                            </div>
                                            <div className="asset-info">
                                                <p className="title">Asset ID</p>
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
                                                    {item.team > 3 ? 
                                                        <div>
                                                            <p>+{item.team - 3}</p>
                                                        </div> : ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="assets-action">
                                            <Button type="text" onClick={() => setVisible('New Asset')}><EditIcon /> Edit</Button>
                                            <Button type="text" onClick={() => handleDeleteTrigger(index, item.assetTitle)}><DeleteIcon /> Delete</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <DeleteModal visible={visibleDelete} setVisible={setVisibleDelete} handleOk={handleDelete} deleteId={deleteId} name="assets" data={deleteText}  />
            <NewAssetModal visible={visible} setVisible={setVisible} sucess={sucess} handleOk={handleOk} />
            <SuccessMoadal sucess={sucess} sucesstext={`${sucess} has been created`} />
        </RootLayout>
    );
}
