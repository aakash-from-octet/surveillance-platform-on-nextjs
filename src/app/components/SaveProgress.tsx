import React, { FC, useState } from 'react';
import { Modal, Button, Input, Table, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import '@/app/styles/modal.scss';
import Cross from '../../../public/images/cross.svg';

interface DataSourceItem {
    key: string;
    permission: string;
    create: boolean;
    edit: boolean;
    delete: boolean;
    reOpen: boolean;
    reschedule: boolean;
}
interface NewRoleModalProps {
    visible: string;
    setVisible: (visible: string) => void;
    sucess: string; 
    handleOk: (value: string) => void;
}

const NewRoleModal: FC<NewRoleModalProps> = ({ visible, setVisible, handleOk, sucess }) => {
    const handleCancel = () => {
        setVisible('');
    };

    return (
        <Modal
            title="New Role"
            mask={true}
            open={visible === 'New Role'}
            onOk={() => handleOk('New Role')}
            onCancel={handleCancel}
            className="new-role-modal"
            closeIcon={<Cross />}
            footer={[
                <Button key="back" className="cancel" onClick={handleCancel}>
                    Discard
                </Button>,
                <Button key="submit" className="save" type="primary" onClick={() => handleOk('New role')}>
                    Save
                </Button>,
            ]}
        >
            
        </Modal>
    );
};
export default NewRoleModal;

