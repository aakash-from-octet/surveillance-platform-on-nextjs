import React, { FC, useState, useEffect, useRef } from 'react';
import { Modal, Button, Select, Steps, Checkbox, Input } from 'antd';
import ArrowDown from '../../../public/images/arrow-down.svg';
import '@/app/styles/modal.scss';
import Cross from '../../../public/images/cross.svg';

interface NewInspectionModalProps {
    visible: any;
    setVisible: (visible: any) => void;
    sucess: string; 
    handleOk: (value: any) => void;
    update: boolean;
    updateInspectionId: number;
}
const { TextArea } = Input;

const NewInspectionModal: FC<NewInspectionModalProps> = ({ visible, setVisible, handleOk, sucess, update, updateInspectionId }) => {
    const handleCancel = () => {
        if(update) {
            setVisible(false);
            setActive(0)
        }
        setVisible('');
    };
    const [active, setActive] = useState(0);
    const activeStepRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const activeStepElement = activeStepRef.current;
        if (activeStepElement) {
            activeStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        console.log(activeStepElement)
    }, [active]);
    const assets = [
        {
            title: 'Select Assets',
            buttonText: 'Continue',
            id: '#second',
            modal: 'first',
            checkbox: false,
            textarea: false,
            feilds: [
                {
                    name: 'Asset',
                    placeholder: 'Select Asset',
                    for: 'asset',
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
                    name: 'Area',
                    placeholder: 'Select Area',
                    for: 'area',
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
                }
            ]
        },
        {
            title: 'Schedule Inspection',
            buttonText: 'Continue',
            id: '#third',
            modal: 'second',
            checkbox: true,
            textarea: false,
            feilds: [
                {
                    name: 'Start Date',
                    placeholder: 'Select Date',
                    for: 'date',
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
                    name: 'Priority',
                    placeholder: 'Select Priority',
                    for: 'priority',
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
                }
            ]
        },
        {
            title: 'Assign Users',
            buttonText: '',
            modal: 'third',
            checkbox: false,
            textarea: true,
            feilds: [
                {
                    name: 'Department',
                    placeholder: 'Select Department',
                    for: 'department',
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
                    name: 'Inspectors',
                    placeholder: 'Select Inspectors',
                    for: 'inspector',
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
                }
            ]
        }
    ]
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <Modal
            title="New Inspection"
            mask={true}
            open={visible === 'New Inspection' || visible === true}
            onOk={() => {handleOk(update ? updateInspectionId : 'New Inspection'); setActive(0);}}
            onCancel={handleCancel}
            className="new-role-modal inspection"
            closeIcon={<Cross />}
            footer={[
                <Button key="back" style={{display: 'none'}} className="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" style={{width: 'fit-content'}} disabled={active <2} className="save" type="primary" onClick={() => {handleOk(update ? updateInspectionId : 'New Inspection'); setActive(0);}}>
                    Schedule Inspection
                </Button>,
            ]}
        >
            <div className="modal-content-flex">
                <div className="modal-side-bar">
                    <Steps
                        progressDot
                        current={active}
                        direction="vertical"
                        items={[
                            {
                                title: 'Select Assets',
                            },
                            {
                                title: 'Schedule Inspection'
                            },
                            {
                                title: 'Assign Users'
                            }
                        ]}
                    />
                </div>
                <div className='modal-content-body'>
                    {assets.map((item, outerIndex) => (
                        <div className={active < outerIndex ? 'modal-step' : 'active modal-step'} ref={active === outerIndex ? activeStepRef : undefined} key={outerIndex}>
                            <p className='step-title'>{item.title}</p>
                            <div className='step-fields'>
                                {item.feilds.map((content, innerIndex) => (
                                    <div className='step-feild' key={innerIndex}>
                                        <label className="label-name" htmlFor={content.for}>
                                            {content.name}
                                        </label>
                                        <Select
                                            disabled={active < outerIndex}
                                            suffixIcon={<ArrowDown />}
                                            placeholder={content.placeholder}
                                            style={{ width: 120 }}
                                            onChange={handleChange}
                                            dropdownStyle={{ padding: '5px 0', borderRadius: '4px', marginTop: '-6px', boxShadow: '0px 2px 4px 0px #00000033'}}
                                            options={content.options}
                                            />
                                    </div>
                                ))}
                            </div>
                            {item.textarea ? 
                            <>
                                <label className="label-name" htmlFor='instructions'>
                                    Instructions
                                </label>
                                <TextArea disabled={active < outerIndex} style={{height: '75px'}} rows={3} placeholder="Type Here.." /> 
                                </> 
                            : ''}
                            <div className='step-footer'>
                                {item.checkbox ? 
                                    <Checkbox disabled={active < outerIndex}>Set An Inspection Reminder</Checkbox>
                                : '' }
                                {
                                    item.buttonText !== '' && outerIndex === active ?
                                    <Button disabled={active < outerIndex} type="primary" onClick={() => setActive(active + 1)}>
                                        {item.buttonText}
                                    </Button> : ''
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};
export default NewInspectionModal;