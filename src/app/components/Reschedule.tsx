import React, { FC } from 'react';
import { Modal, Button, Select, Checkbox } from 'antd';
import '@/app/styles/modal.scss';
import Cross from '../../../public/images/cross.svg';
import ArrowDown from '../../../public/images/arrow-down.svg';

interface NewRoleModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    rescheduleId: number; 
    handleOk: (value: number) => void;
}


const RescheduleModal: FC<NewRoleModalProps> = ({ visible, setVisible, handleOk, rescheduleId }) => {
    const handleCancelVisible = () => {
        setVisible(false);
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const assetsFeilds = [
        {
            title: 'Start Date',
            for: 'startDate',
            options: [
                {
                    value: 'placeHolder-1',
                    label: 'PlaceHolder 1'
                },
                {
                    value: 'placeHolder-2',
                    label: 'PlaceHolder 2'
                }
            ]
        },
        {
            title: 'Priority',
            for: 'priority',
            options: [
                {
                    value: 'lowest',
                    label: 'Lowest'
                },
                {
                    value: 'highest',
                    label: 'Highest'
                }
            ]
        }
    ]
    return (
        <Modal
            title="Delete Modal"
            mask={true}
            open={visible}
            onOk={() => handleOk(rescheduleId)}
            onCancel={handleCancelVisible}
            className="new-role-modal"
            closeIcon={<Cross />}
            footer={[
                <Button key="back" style={{display: 'none'}} className="cancel" onClick={handleCancelVisible}>
                    Cancel
                </Button>,
                <Button key="submit" style={{width: 'fit-content'}} className="save" type="primary" onClick={() => handleOk(rescheduleId)}>
                    Reschedule
                </Button>,
            ]}
        >
            <div className="assets-feilds">
                {assetsFeilds.map((item, index)=> (
                    <div key={index}>
                        <label className="label-name" htmlFor={item.for}>
                           {item.title}
                        </label>
                        <Select
                            suffixIcon={<ArrowDown />}
                            style={{ width: 120 }}
                            onChange={handleChange}
                            dropdownStyle={{ padding: '5px 0', borderRadius: '4px', marginTop: '-6px', boxShadow: '0px 2px 4px 0px #00000033'}}
                            options={item.options}
                        />
                    </div>
                ))}
            </div>
            <Checkbox>Set An Inspection Reminder</Checkbox>
        </Modal>
    );
};
export default RescheduleModal;