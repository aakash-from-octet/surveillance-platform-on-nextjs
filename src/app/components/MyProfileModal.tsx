import React, { FC } from 'react';
import { Modal, Button, Input } from 'antd';
import '@/app/styles/modal.scss';
import Cross from '../../../public/images/cross.svg';
import Image from 'next/image';
import UserImage from '../../../public/images/profile-img.png';
import LogoutIcon from '../../../public/images/logout.svg';
import Link from 'next/link';

interface MyProfileModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    handleOk: (value: any) => void;
    success: string;
}

const MyProfileModal: FC<MyProfileModalProps> = ({ visible, setVisible, handleOk, success }) => {
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <Modal
            title="My Profile"
            mask={true}
            open={visible}
            onOk={() => handleOk('Report')}
            onCancel={handleCancel}
            className="profile-modal"
            closeIcon={<Cross />}
            footer={[
                <Button key="back" style={{ display: 'none' }} className="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" className="save" type="primary" onClick={() => handleOk('Report')}>
                    Save
                </Button>,
            ]}
        >
            <div className="user-info">
                <div className="user-img">
                    <Image src={UserImage} alt='user' />
                </div>
                <div className="user-details">
                    <p className='name'>John Doe</p>
                    <p className='des'>Designation : Inspector</p>
                </div>
                <Link href='/' className='ant-btn ant-btn-text' type='text'><LogoutIcon /> Logout</Link>
            </div>
            <div className="user-list">
                <div className="item">
                    <label htmlFor="name">Name</label>
                    <Input type='text' name='name' id='name' />
                </div>
                <div className="item">
                    <label htmlFor="number">Contact Number</label>
                    <Input type='tel' name='number' id='number' />
                </div>
                <div className="item">
                    <label htmlFor="email">Email ID</label>
                    <Input type='email' name='email' id='email' />
                </div>
                <div className="item">
                    <label htmlFor="pass">Password</label>
                    <Input type='password' name='pass' id='pass' />
                </div>
            </div>
        </Modal>
    );
};
export default MyProfileModal;

