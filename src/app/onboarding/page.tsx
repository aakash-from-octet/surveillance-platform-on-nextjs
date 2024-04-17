'use client';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import RootLayout from '../layout';
import TickUnchecked from '../../../public/images/tick-unchecked.svg';
import TickChecked from '../../../public/images/tick-checked.svg';
import { Button, } from 'antd';
import NewRoleModal from '../components/NewRoleModal';
import SuccessMoadal from '../components/SuccessModal';
import NewAssetModal from '../components/NewAssetModal';
import AddUserModal from '../components/AddUserModal';
import NewInspectionModal from '../components/NewInspectionModal';
import OnboardingAsset from '../../../public/images/onboarding-asset-1.png';
import OnboardingAsset2 from '../../../public/images/onboarding-asset-2.png';
import OnboardingAsset3 from '../../../public/images/onboarding-asset-3.png';
import { useRouter } from 'next/navigation';
import '@/app/styles/onboarding.scss';

interface OnboardingItem {
    title: string;
    des: string;
    buttonText: string;
    disabled: boolean;
}

export default function OnBoarding(): JSX.Element {
    const onboardingItem: OnboardingItem[] = [
        {
          title: 'Setup Roles for your Organisation',
          des: 'You can manage permission and access for different roles.',
          buttonText: 'New Role',
          disabled: false
        },
        {
          title: 'Manage Users In The Platform',
          des: 'Create and assign different roles to different users.',
          buttonText: 'Add User',
          disabled: false
        },
        {
          title: 'Add Your Assets To Manage Inspections',
          des: 'Users with permission will be able to manage these assets later.',
          buttonText: 'New Asset',
          disabled: false
        },
        {
          title: 'Let’s Create Your First Inspection',
          des: 'All set! you can now create and manage your inspections.',
          buttonText: 'New Inspection',
          disabled: true,
        }
    ];
    const [visible, setVisible] = useState<string>('');
    const [sucess, setSucess] = useState<string>('');
    const [done, setDone] = useState<string[]>([]);
    const [disabled, setDisabled] = useState<boolean>(false)

    useEffect(() => {
        if (visible === '') {
            document.body.classList.remove('active');
        } else {
            document.body.classList.add('active');
        }
    }, [visible]);
    useEffect(() => {
        if (done.length >= 3) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [done]);
    const showModal = (data: string): void => {
        setVisible(data);
    };
    const router = useRouter();

    const handleOk = (data: string): void => {
        setVisible('');
        setSucess(data);
        setTimeout(() => {
            setSucess('');
            const updatedItems: string[] = [...done, data.toLowerCase()];
            setDone(updatedItems);
            if (data === 'New Inspection') {
                router.push('/inspection'); 
            }
        }, 2000);        
    };
    return (
        <RootLayout includeHeader={true}>
            <div>
                <div className='onboarding'>
                    <h1>Welcome, Ben Murray!</h1>
                    <p className='page-title'>Lorem Ipsum is simply a dummy text.</p>
                    {onboardingItem.map((content, index) => (
                        <div className='onboarding-item' key={index}>
                            <div className='task'>
                            {done.includes(content.buttonText.toLowerCase()) ? <TickChecked /> : <TickUnchecked />}
                                <div>
                                    <p className='task-title'>{content.title}</p>
                                    <p className='des'>{content.des}</p>
                                </div>
                            </div>
                            <Button disabled={disabled ? content.disabled ? true : false : false} onClick={() => showModal(content.buttonText)}>{content.buttonText}</Button>
                        </div>
                    ))}
                    <Image
                        src={OnboardingAsset}
                        alt='on-boarding-asset'
                        className='on-boarding-asset'
                    />
                    <Image
                        src={OnboardingAsset2}
                        alt='on-boarding-asset'
                        className='on-boarding-asset-2'
                    />
                    <Image
                        src={OnboardingAsset3}
                        alt='on-boarding-asset'
                        className='on-boarding-asset-3'
                    />
                </div>
                <NewRoleModal visible={visible} setVisible={setVisible} sucess={sucess} handleOk={handleOk} />
                <NewAssetModal visible={visible} setVisible={setVisible} sucess={sucess} handleOk={handleOk} />
                <AddUserModal visible={visible} setVisible={setVisible} sucess={sucess} handleOk={handleOk} />
                <NewInspectionModal visible={visible} setVisible={setVisible} sucess={sucess} updateInspectionId={0} update={false} handleOk={handleOk} />
                <SuccessMoadal sucess={sucess} sucesstext={`${sucess} has been created`} />
            </div>
        </RootLayout>
    )
  }
  