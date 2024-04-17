'use client';
import React, {useState, useEffect, useRef} from 'react';
import RootLayout from '../layout';
import '@/app/styles/inspection-details.scss';
import { Button, Dropdown, Space, Tour  } from 'antd';
import type { TourProps } from 'antd';
import ImageNotfound from '../../../public/images/not-found-inspection.svg'
import DownArrow from '../../../public/images/down-arrow.svg';
import Delete from '../../../public/images/delete.svg';
import Edit from '../../../public/images/edit.svg';
import ImgIcon from '../../../public/images/img-icon.svg';
import Reschedule from '../../../public/images/reschedule.svg';
import Cross from '../../../public/images/cross.svg';
import SearchAnimation from '../../../public/images/search-animation.gif';
import Image from 'next/image';
import CloseModal from '../components/CloseModal';
import DeleteModal from '../components/deleteModal';
import RescheduleModal from '../components/Reschedule';
import NewInspectionModal from '../components/NewInspectionModal';
import { useRouter } from 'next/navigation';
import teamMember from '../../../public/images/team-member-1.png';
import teamMember2 from '../../../public/images/team-member-2.png';
import teamMember3 from '../../../public/images/team-member-3.png';
import HighPriority from '../../../public/images/highest-priority.svg';
import LowPriority from '../../../public/images/low-priority.svg';
import Moderate from '../../../public/images/moderate.svg';
import High from '../../../public/images/high.svg';
import Lowest from '../../../public/images/lowest.svg';
import SuccessMoadal from '../components/SuccessModal';
import TimeLineInspection from '../components/TimeLineInspection';

interface TimelineItem {
    inspectionStatus: string;
    inspectionTime: string;
    type: string;
}

export default function OnBoarding(): JSX.Element {
    const router = useRouter();
    const [startInspection, setStartInspection] = useState(false);
    const [close, setClose] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [rescheduleVisible, setRescheduleVisible] = useState(false);
    const [inspectionVisible, setInspectionVisible] = useState(false);
    const handleClose = () => {
        setClose(false);
        router.push('/inspection');
        setTimeLine([])
        setInnerStep(0) 
    }
    const handleDelete = (data: number) => {
        setDeleteVisible(false);
        router.push('/inspection');
        console.log(data, 'deleted')
    }
    const handleReschedule = () => {
        setRescheduleVisible(false);
        router.push('/inspection');
    }
    const handleInspection = () => {
        setInspectionVisible(false);
        router.push('/inspection');
    }
    const closePage = ( ) => {
        setClose(true);
    }
    const [status, setStatus] = useState('Scheduled');

    //SATRT INSPECTION
    const [timeLine, setTimeLine] = useState<TimelineItem[]>([]);
    const handleStartInspection = (): void => {
        setStartInspection(true);
        setTimeout(() => {
            const newItemSecond = {
                inspectionStatus: 'Scheduled Inspection ABC',
                inspectionTime: 'on 10/12/2022 at 10:43 am',
                type: 'scheduled',
            };
            const newItem = {
                inspectionStatus: 'Started Inspection ABC',
                inspectionTime: 'on 10/12/2022 at 10:43 am',
                type: 'started',
            };
            setTimeLine(prevTimeLine => [...prevTimeLine, newItemSecond, newItem]);
            setStartInspection(false);
        }, 3000); 
    }

    // STATIC
    const content = 5;
    const priority = 'Highest';

    // flow
    const [innerStep, setInnerStep] =  useState(0);

    // DROPDOWN
    const items = innerStep < 1 ? [
        {
            key: '0',
            label: <div onClick={() => {setDeleteVisible(true)}}>Delete</div>,
            icon: <div onClick={() => {setDeleteVisible(true)}}><Delete /></div>,
        },
        {
            key: '1',
            label: <div onClick={() => {setRescheduleVisible(true)}}>Reschedule</div>,
            icon: <div onClick={() => {setRescheduleVisible(true)}}><Reschedule /></div>,
        },
        {
            key: '3',
            label: <div onClick={() => {setInspectionVisible(true)}}>Edit</div>,
            icon: <div onClick={() => {setInspectionVisible(true)}}><Edit /></div>,
        },
    ] :
    [
        {
            key: '0',
            label: <div onClick={() => {console.log(true)}}>Delete</div>,
            icon: <div onClick={() => {console.log(true)}}><Delete /></div>,
        },
        {
            key: '1',
            label: <div onClick={() => {console.log(true)}}>Show Annoted Images</div>,
            icon: <div onClick={() => {console.log(true)}}><ImgIcon /></div>,
        }
    ];
    
    // TURTORIAL
    const [turtorial, setTurtorial] = useState(false);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const steps: TourProps['steps'] = [
        {
          title: 'You can annotate the images from here',
          description: 'Tip : Loreum Ipsume is dummy text',
          target: () => ref1.current,
          placement: 'bottomRight',
          mask:{ style: {color: 'red'}}
        },
        {
          title: 'You can take actions from here',
          description: 'Dummy Tour',
          target: () => ref2.current,
          placement: 'left',
        }
    ];
    // SUCCESS MESSAGE
    const [succesReport, setSuccesReport] = useState('');
    return (
        <RootLayout includeHeader={false}>
            <div className='inspection-details'>
                <div className='inspection-page-header'>
                    <p>Arianto grant Limited plant, Ahmedabad, Gujarat.</p>
                    <button className='cancel' onClick={closePage} >
                        <Cross />
                    </button>
                </div>
                <div className='page-content'>
                    <div className='side-bar'>
                        <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Status</p>
                            <div className={`status ${status === 'On Going' ? 'ongoing' : ''}`}>
                                <p className='sidebar-detail-value'>{status}</p>
                            </div>
                        </div>
                        <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Inspection Team</p>
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
                                {content > 3 ? 
                                    <div>
                                        <p>+{content - 3}</p>
                                    </div> : ''
                                }
                            </div>
                        </div>
                         <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Inspection Date</p>
                            <p className='sidebar-detail-value'>10 May, 2022</p>
                        </div>
                         <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Inspection Priority</p>
                            <div className='priority'>
                                <div className="priority-icon">
                                    {
                                        priority === 'Highest' ? <HighPriority /> :  priority === 'Low' ? <LowPriority /> : priority === 'Lowest' ? <Lowest /> : priority === 'High' ? <High /> : <Moderate />
                                    }
                                </div>
                                <p className="sidebar-detail-value">{priority}</p>
                            </div>
                        </div>
                         <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Inspection Area</p>
                            <p className='sidebar-detail-value'>100 Acres</p>
                        </div>
                         <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Created By</p>
                            <p className='sidebar-detail-value'>John Doe</p>
                        </div>
                         <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Note</p>
                            <p className='sidebar-detail-value'>Lorem ipsum is simply a dummy text.</p>
                        </div>
                        <span></span>
                         <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Asset Name</p>
                            <p className='sidebar-detail-value'>Loreum ipsum Solar is dummy text that will go here Farm, Gujarat</p>
                        </div>
                         <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Asset ID</p>
                            <p className='sidebar-detail-value'>#1527818</p>
                        </div>
                         <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Asset Capacity</p>
                            <p className='sidebar-detail-value'>10 Kw</p>
                        </div>
                         <div className='inspection-detail'>
                            <p className='sidebar-detail-title'>Location</p>
                            <p className='sidebar-detail-value'>23.0225° N, 72.5714° E</p>
                        </div>
                    </div>
                    <div className='main-content'>
                        { timeLine.length === 0 ?
                            <div className='start-inspection'>
                                {
                                    timeLine.length === 0 && startInspection ?
                                    <div className='sheduled-by'>
                                        <Image src={SearchAnimation} alt='search' className='search' />
                                        <h2 className='start-inspection-title'>Starting up the new inspection</h2>
                                        <p className='start-inspection-text'>On 10 Dec, 2022 at 10:43 am</p>
                                    </div> : timeLine.length === 0 ? 
                                    <>    
                                        <ImageNotfound />
                                        <div className='sheduled-by'>
                                            <h2 className='start-inspection-title'>This inspection is scheduled by John Doe</h2>
                                            <p className='start-inspection-text'>On 10 Dec, 2022 at 10:43 am</p>
                                        </div>
                                        <Button type='primary' onClick={handleStartInspection} >Start Inspection</Button>
                                        <Dropdown
                                            placement="bottom"
                                            menu={{
                                                items,
                                            }}
                                            trigger={['click']}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    More Actions
                                                    <DownArrow />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </> : ''
                                }
                            </div> :
                            <TimeLineInspection items={items} innerStep={innerStep} setInnerStep={setInnerStep} timeLine={timeLine} setTimeLine={setTimeLine} setStatus={setStatus} setSuccesReport={setSuccesReport} setTurtorial={setTurtorial} ref1={ref1} ref2={ref2}  />
                        }
                    </div>
                </div>
            </div>
            <CloseModal visible={close} setVisible={setClose} handleOk={handleClose} des='' type='close' title='Would You Like To Save Your Progress Before Clossing?' />
            <DeleteModal visible={deleteVisible} setVisible={setDeleteVisible} handleOk={handleDelete} deleteId={1} name="inspection" data='Arianto grant Limited plant, Ahmedabad, Gujarat.' />
            <RescheduleModal visible={rescheduleVisible} setVisible={setRescheduleVisible} handleOk={handleReschedule} rescheduleId={1} />
            <NewInspectionModal visible={inspectionVisible} setVisible={setInspectionVisible} sucess="" updateInspectionId={1} update={true} handleOk={handleInspection} />
            <Tour open={turtorial} onClose={() => setTurtorial(false)} steps={steps} />
            <SuccessMoadal sucess={succesReport} sucesstext={`${succesReport} has been generated successfully!`} />
        </RootLayout>
    )
  }
  