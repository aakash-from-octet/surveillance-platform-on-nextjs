import React, { FC } from 'react';
import { Modal, Button } from 'antd';
import '@/app/styles/modal.scss';
import Cross from '../../../public/images/cross.svg';
import DeleteIcon from '../../../public/images/delete-icon.svg'

interface DeleteModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    deleteId: number; 
    handleOk: (value: number) => void;
    name: string;
    data: string
}

const DeleteModal: FC<DeleteModalProps> = ({ visible, setVisible, handleOk, deleteId, name, data }) => {
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <Modal
            title="Delete Modal"
            mask={true}
            open={visible}
            onOk={() => handleOk(deleteId)}
            onCancel={handleCancel}
            className="delete-modal"
            closeIcon={<Cross />}
            footer={[
                <Button key="back" className="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" className="delete" type="primary" onClick={() => handleOk(deleteId)}>
                    Delete
                </Button>,
            ]}
        >
            <DeleteIcon className='icon' />
            <p className='title'>Do you want to delete this {name}?</p>
            <p className='normal-text'> {data}</p>
        </Modal>
    );
};
export default DeleteModal;

