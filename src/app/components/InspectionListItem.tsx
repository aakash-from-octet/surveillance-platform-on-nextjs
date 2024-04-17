'use client';
import { FC, useState } from 'react';
import '@/app/styles/list-item.scss';
import Image from 'next/image';
import { Dropdown, Space } from 'antd';
import Delete from '../../../public/images/delete.svg';
import Edit from '../../../public/images/edit.svg';
import Reschedule from '../../../public/images/reschedule.svg';
import HighPriority from '../../../public/images/highest-priority.svg';
import LowPriority from '../../../public/images/low-priority.svg';
import Moderate from '../../../public/images/moderate.svg';
import High from '../../../public/images/high.svg';
import Lowest from '../../../public/images/lowest.svg';
import MenuDot from '../../../public/images/menu-dot.svg';
import { useRouter } from 'next/navigation';
import teamMember from '../../../public/images/team-member-1.png';
import teamMember2 from '../../../public/images/team-member-2.png';
import teamMember3 from '../../../public/images/team-member-3.png';


interface InspectionListItemProps {
    content: {
      priority: string;
      inspectionName: string;
      assetId: number;
      dateTime: string;
      inspectionTeam: string;
      status: string;
      imagesLength: number;
    },
    setVisible: any,
    setDeleteId: any,
    setRescheduleId: any,
    setVisibleSchedule: any,
    setUpdateInspectionId: any,
    setVisibleInspection: any,
    indexId: number,
    setDeleteText: any
}

const InspectionListItem: FC<InspectionListItemProps> = ({ content, setVisible, setDeleteId, setRescheduleId, setVisibleSchedule, setUpdateInspectionId, setVisibleInspection, indexId, setDeleteText }) => {
    const items = [
        {
            key: '0',
            label: <div onClick={() => {setVisible(true); setDeleteId(content.assetId); setDeleteText(content.inspectionName)}}>Delete</div>,
            icon: <div onClick={() => {setVisible(true); setDeleteId(content.assetId)}}><Delete /></div>,
        },
        {
            key: '1',
            label: <div onClick={() => {setVisibleSchedule(true); setRescheduleId(content.assetId)}}>Reschedule</div>,
            icon: <div onClick={() => {setVisibleSchedule(true); setRescheduleId(content.assetId)}}><Reschedule /></div>,
        },
        {
            key: '3',
            label: <div onClick={() => {setVisibleInspection(true); setUpdateInspectionId(content.assetId)}}>Edit</div>,
            icon: <div onClick={() => {setVisibleInspection(true); setUpdateInspectionId(content.assetId)}}><Edit /></div>,
        },
    ];
    const router = useRouter();
    const handleClick = () => {
        router.push('/inspection-details');
    };
    return (
        <div className='list-item-inpection' onClick={handleClick}>
            <div className='priority'>
                <div className="priority-icon">
                    {
                        content.priority === 'Highest' ? <HighPriority /> :  content.priority === 'Low' ? <LowPriority /> : content.priority === 'Lowest' ? <Lowest /> : content.priority === 'High' ? <High /> : <Moderate />
                    }
                </div>
                <p className="priority-name">{content.priority}</p>
            </div>
            <p className="inspection-name">{content.inspectionName}</p>
            <p className="asset-id">{content.assetId}</p>
            <p className="data-time">{content.dateTime}</p>
            <div className='inspection-team'>
                <div>
                    <Image src={teamMember} alt='team-member' />
                </div>
                <div>
                    <Image src={teamMember2} alt='team-member' />
                </div>
                <div>
                    <Image src={teamMember3} alt='team-member' />
                </div>
                {content.imagesLength > 3 ? 
                    <div>
                        <p>+{content.imagesLength - 3}</p>
                    </div> : ''
                }
            </div>
            <div className={` status ${content.status === 'On Going' ? 'on-going' : ''}`}>
                <p>{content.status}</p>
            </div>
            <div className="action" onClick={(event) => (event.stopPropagation())} >
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomRight"
                        trigger={['click']}
                        className='clickable'
                    >
                    <div>
                        <MenuDot />
                    </div>
                    </Dropdown>
            </div>
        </div>
    )
}
export default InspectionListItem;