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
    const [allCheck, setAllCheck] = useState(false);
    const [dataSource, setDataSource] = useState<DataSourceItem[]>([
        {
            key: '1',
            permission: 'Inspections',
            create: false,
            edit: false,
            delete: false,
            reOpen: false,
            reschedule: false,
        },
        {
            key: '2',
            permission: 'Assets',
            create: false,
            edit: false,
            delete: false,
            reOpen: false,
            reschedule: false,
        },
        {
            key: '3',
            permission: 'Users',
            create: false,
            edit: false,
            delete: false,
            reOpen: false,
            reschedule: false,
        },
        {
            key: '4',
            permission: 'Others',
            create: false,
            edit: false,
            delete: false,
            reOpen: false,
            reschedule: false,
        },
    ]);

    const handleCancel = () => {
        setVisible('');
        setAllCheck(false);
    };

    const handleSelectAll = (e: CheckboxChangeEvent) => {
        const isChecked = e.target.checked;
        setAllCheck(isChecked);
        const updatedDataSource = dataSource.map((item) => ({
            ...item,
            create: isChecked,
            edit: isChecked,
            delete: isChecked,
            reOpen: isChecked,
            reschedule: isChecked,
        }));

        setDataSource(updatedDataSource);
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent, key: string, column: keyof DataSourceItem) => {
        const checked = e.target.checked;
        const updatedDataSource = dataSource.map((item) => {
            if (item.key === key) {
                return {
                    ...item,
                    [column]: checked,
                };
            }
            return item;
        });

        setDataSource(updatedDataSource);
    };

    const columns = [
        {
            title: 'Permissions',
            dataIndex: 'permission',
            key: 'permission',
        },
        {
            title: 'Create',
            dataIndex: 'create',
            key: 'create',
            render: (checked: boolean, record: DataSourceItem) => (
                <Checkbox checked={checked} onChange={(e) => handleCheckboxChange(e, record.key, 'create')} />
            ),
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render: (checked: boolean, record: DataSourceItem) => (
                <Checkbox checked={checked} onChange={(e) => handleCheckboxChange(e, record.key, 'edit')} />
            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (checked: boolean, record: DataSourceItem) => (
                <Checkbox checked={checked} onChange={(e) => handleCheckboxChange(e, record.key, 'delete')} />
            ),
        },
        {
            title: 'Re-Open',
            dataIndex: 'reOpen',
            key: 'reOpen',
            render: (checked: boolean, record: DataSourceItem) => (
                <Checkbox checked={checked} onChange={(e) => handleCheckboxChange(e, record.key, 'reOpen')} />
            ),
        },
        {
            title: 'Reschedule',
            dataIndex: 'reschedule',
            key: 'reschedule',
            render: (checked: boolean, record: DataSourceItem) => (
                <Checkbox checked={checked} onChange={(e) => handleCheckboxChange(e, record.key, 'reschedule')} />
            ),
        },
    ];

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
                    Cancel
                </Button>,
                <Button key="submit" className="save" type="primary" onClick={() => handleOk('New role')}>
                    Save
                </Button>,
            ]}
        >
            <div className="modal-feild">
                <label className="label-name" htmlFor="roleName">
                    Role Name
                </label>
                <Input type="text" id="roleName" name="roleName" placeholder="Enter Role Name" />
            </div>
            <div className="permission-box">
                <div className="permission-box-title">
                    <label className="label-name">Grant Permissions</label>
                    <Checkbox onChange={handleSelectAll}>Select All</Checkbox>
                </div>
                <Table className="permission-table" dataSource={dataSource} columns={columns} />
            </div>
        </Modal>
    );
};
export default NewRoleModal;

