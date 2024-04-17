import React, { FC, useState } from 'react';
import { Modal, Button, Select, Input, message, Upload } from 'antd';
import '@/app/styles/modal.scss';
import Cross from '../../../public/images/cross.svg';
import ArrowDown from '../../../public/images/arrow-down.svg';
import Image from 'next/image';
import UpLoadImage from '../../../public/images/image-preview.png';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import EditIcon from '../../../public/images/edit-white.svg'

interface NewAssetModalProps {
    visible: string;
    setVisible: (visible: string) => void;
    sucess: string; 
    handleOk: (value: string) => void;
}
const { TextArea } = Input;
const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const NewAssetModal: FC<NewAssetModalProps> = ({ visible, setVisible, handleOk, sucess }) => {
    const handleCancel = () => {
        setVisible('');
    };
    const [remarks, setRemarks] = useState(false);
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const assetsFeilds = [
        {
            title: 'Asset Name',
            placeholder: 'Select Asset',
            for: 'AssetName',
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
            title: 'Asset Type',
            placeholder: 'Select Asset Type',
            for: 'AssetType',
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
            title: 'Capacity',
            placeholder: 'Select Capacity',
            for: 'Capacity',
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
            title: 'Asset Status',
            placeholder: 'Select Status',
            for: 'AssetStatus',
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
            title: 'Asset Co-ordinates',
            placeholder: 'Select Co-ordinates',
            for: 'AssetCoordinates',
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
            title: 'Area (In Acres)',
            placeholder: 'Select Area',
            for: 'Area',
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
    ];
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const handleChangeImage: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        const url = URL.createObjectURL(info.file.originFileObj as RcFile);
        setImageUrl(url);
    };
    const uploadButton = (
        <div className='upload'>
           <Image
                src={UpLoadImage}
                alt='upload-image'
                className='uplaoder'
            />
            <p className='upload-text'>Upload Image</p>
        </div>
    );
    return (
        <Modal
            title="New Asset"
            mask={true}
            open={visible === 'New Asset'}
            onOk={() => handleOk('New asset')}
            onCancel={handleCancel}
            className="new-role-modal"
            closeIcon={<Cross />}
            footer={[
                <Button key="back" className="cancel" style={{display : 'none'}} onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" className="save" type="primary" onClick={() => handleOk('New asset')}>
                    Create
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
                            placeholder={item.placeholder}
                            style={{ width: 120 }}
                            onChange={handleChange}
                            dropdownStyle={{ padding: '5px 0', borderRadius: '4px', marginTop: '-6px', boxShadow: '0px 2px 4px 0px #00000033'}}
                            options={item.options}
                        />
                    </div>
                ))}
            </div>
            <div>
                <label className="label-name" htmlFor="image">
                    Upload Asset Image
                </label>
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChangeImage}
                >
                    {imageUrl ? (
                        <><img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                        <div className='hover-area'>
                            <EditIcon />
                            <p>Edit</p>
                        </div>
                        </>
                    ) : (
                        uploadButton
                    )}
                </Upload>
                <label className="label-name" htmlFor="remarks" style={{cursor: 'pointer'}} onClick={() => {setRemarks((!remarks))}}>
                    {remarks ? 'Remarks' : '+ Remarks'}
                </label>
                {remarks ? <TextArea style={{height: '75px'}} rows={3} placeholder="Add Remarks Here.." /> : ''}
                {remarks ? <p style={{cursor: 'pointer'}} onClick={() => {setRemarks((!remarks))}} className='remove'>Remove</p> : ''}
            </div>
        </Modal>
    );
};
export default NewAssetModal;