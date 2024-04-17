import React, { FC } from 'react';
import '../styles/modal.scss';
import { Modal } from 'antd';
import Image from 'next/image';
import SucessGif from '../../../public/images/report-generated.gif'

interface SuccessModalProps {
    sucess: string;
    sucesstext: string;
}

const SuccessModal: FC<SuccessModalProps> = ({ sucess, sucesstext }) => {
    return (
        <Modal
            title="New Role"
            mask={true}
            open={sucess !== ''}
            className='success-modal'
        >
            <div className={`lotify`}>
                <Image style={{width: '112px'}} src={SucessGif} alt='sucess' />
            </div>
            <p style={{width: sucess === 'password' ? '395px' : '257px', margin: '0 auto'}}>{sucesstext}</p>
        </Modal>
    );
};

export default SuccessModal;
