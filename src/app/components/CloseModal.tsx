import React, { FC } from 'react';
import { Modal, Button } from 'antd';
import '@/app/styles/modal.scss';
import Cross from '../../../public/images/cross.svg';
import ChangeStatus from '../../../public/images/chnage-status.svg';
import CloseIcon from '../../../public/images/close.svg'

interface CloseModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    handleOk: (value: string) => void;
    type: string;
    title: string;
    des: string;
}

const CloseModal: FC<CloseModalProps> = ({ visible, setVisible, handleOk, type, title, des }) => {
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <Modal
            title="Close Modal"
            mask={true}
            open={visible}
            onOk={() => handleOk('')}
            onCancel={handleCancel}
            className="delete-modal"
            closeIcon={<Cross />}
            footer={[
                <Button key="back" className="cancel" onClick={handleCancel}>
                    {type === 'close' ? 'Discard' : 'Cancel'}
                </Button>,
                <Button key="submit" className="save" type="primary" onClick={() => handleOk('')}>
                    {type === 'close' ? 'Save' : 'Confrim'}
                </Button>,
            ]}
        >
            {type === 'close' ? <CloseIcon className='icon' /> : <ChangeStatus className='icon' />}
            <p className='title'>{title}</p>
            {des !== '' ? <p className='normal-text'>{des}</p> : ''} 
        </Modal>
    );
};
export default CloseModal;

