import React, { useState, useEffect, FC, useCallback } from 'react';
import ArrowUP from '../../../public/images/arrow-up.svg';
import Image from 'next/image';
import johnDoe from '../../../public/images/john-doe.png';
import dragDrop from '../../../public/images/drag-drop.png';
import MpIcon from '../../../public/images/mp.svg';
import ViewReoprt from '../../../public/images/viewReport.svg';
import Scanning from '../../../public/images/scanning.gif';
import MenuDot from '../../../public/images/menu-dot.svg';
import ArrowDown from '../../../public/images/arrow-down.svg';
import { Button, Dropdown, Progress, Checkbox } from 'antd';
import '@/app/styles/inspection-details.scss';
import CloseModal from './CloseModal';
import InspectImageModal from './InspectImageModal';
import Edit from '../../../public/images/edit.svg'
import { useDropzone } from 'react-dropzone';

interface TimeLineInspectionProps {
    items: any;
    timeLine: TimelineItem[];
    setTimeLine: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
    setStatus: any;
    setSuccesReport: any;
    setTurtorial: any;
    ref1: any;
    ref2: any;
    setInnerStep: any;
    innerStep: number
}

interface TimelineItem {
    inspectionStatus: string;
    inspectionTime: string;
    type: string;
}

const TimeLineInspection: FC<TimeLineInspectionProps> = ({ items, timeLine, setTimeLine, setStatus, setSuccesReport, setTurtorial, ref1, ref2, setInnerStep, innerStep }) => {
    const [startedButton, setStartedButton] = useState(true);
    const handleUploadMedia = () => {
        const newItem: TimelineItem = {
            inspectionStatus: 'Uploaded Files',
            inspectionTime: 'on 10/12/2022 at 10:43 am',
            type: 'upload',
          }; 
        setTimeLine(prevTimeLine => [...prevTimeLine, newItem]);
        setStartedButton(false); 
    }
    const userName = 'John Doe';
    const [percent, setPercent] = useState<number>(0);
    const [uploadingLength, setUploadingLength] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [lastItem, setLastItem] = useState('');
    const reUpload = () => {
        setInnerStep(0);
        setTimeInspect(5);
        setPercent(0);
        setTimeLeft(0);
        setUploadingLength(0);
        setImageInspected([]);
        handleUploadMedia();
    }
    useEffect(() => {
        setLastItem((timeLine[timeLine.length - 1]).type)
    }, [timeLine]);
    // Uplaod Time
    useEffect(() => {
        if (timeLine.length >= 3) {
            if (lastItem === 'upload') {
                let counter = 0;
                let mb = 0;
                let time = 100;
                const interval = setInterval(() => {
                    if (counter === 100) {
                        clearInterval(interval);
                    } else {
                        counter++;
                        mb+=10;
                        time--;
                        setPercent(counter);
                        setUploadingLength(mb);
                        setTimeLeft(time);
                    }
                }, 50);
                return () => {
                  clearInterval(interval); 
                };
            }
        }
    }, [timeLine, lastItem]);
    // Inspect Timing
    const [timeInspect, setTimeInspect] = useState<number>(5);
    useEffect(() => {
        if (lastItem === 'upload') {
            if (percent === 100) {
              setTimeout(() => {
                setInnerStep(1);
                let counter = 100;
                const interval = setInterval(() => {
                  if (counter === 0) {
                    clearInterval(interval);
                  } else {
                    counter--;
                    setTimeInspect(counter);
                  }
                }, 80);
          
                return () => {
                  clearInterval(interval);
                };
              }, 2000);
            }
        }
    }, [percent, lastItem]);
    useEffect(() => {
        if (timeInspect === 0) {
            if (lastItem === 'upload') {
                setInnerStep(2);
            }
        }
    }, [timeInspect, lastItem]);

    // Upload Files
    const [uploadFiles, setUploadedFiles] = useState(['', '', '']);
    const handleAddItems = (data: any) => {
        if (data.length === 3) {
            const newItem = '';
            const newItemS = '';
            if (data === uploadFiles) {
                setUploadedFiles(prevUploadFiles => [...prevUploadFiles, newItem, newItemS]);
            }
            else {
                setPdfItem(prevUploadFiles => [...prevUploadFiles, newItem, newItemS])
            }
        }
        else {
            if (data === uploadFiles) { 
                setUploadedFiles(prevUploadFiles => {
                    let updatedFiles = [...prevUploadFiles];
                    if (updatedFiles.length > 3) {
                        updatedFiles = updatedFiles.slice(0, 3);
                    }
                    return updatedFiles;
                });
            }
            else {
                setPdfItem(prevUploadFiles => {
                    let updatedFiles = [...prevUploadFiles];
                    if (updatedFiles.length > 3) {
                        updatedFiles = updatedFiles.slice(0, 3);
                    }
                    return updatedFiles;
                });
            }
        }
    };
    useEffect(() => {
        if (lastItem === 'upload') {
            if (timeLine.length === 3 && innerStep === 2) {
                setTurtorial(true);
            }
        }
    }, [innerStep, lastItem]);
    // 
    const [imageInspected, setImageInspected] = useState<number[]>([]);
    const [dropdownStep, setDropdownStep] = useState<number[]>([]);

    // Genrate report
    const [visible, setVisible] = useState(false);
    const [inspectPopupId, setInspectPopupId] = useState(0)
    const handleOk = (data: number) => {
        setVisible(false)
        setImageInspected(prevImageInspected => [...prevImageInspected, data]);
    }
    const handleInspetedImages = (data: number) => {
        setStatus('On Going');
        setInspectPopupId(data);
        setVisible(true);
    };

    const handleViewReport = (data: number) => {
        alert(data + 'pdf seen by you');
    }
    const [dropdownStepsOpen, setDropdownStepsOpen] = useState<number[]>([]);
    const setStepValue = (data: number) => {
        if (dropdownStepsOpen.includes(data)) {
            setDropdownStepsOpen(selectedItems.filter((selectedItem) => selectedItem !== data));
        } else {
            setDropdownStepsOpen([...dropdownStepsOpen, data]);
        }
    };
    const [pdfItem, setPdfItem] =  useState<string[]>([]);
    const handleReportGenrate = (data: number, type: string) => {
        if (type !== 'first') {
            const newItem: TimelineItem = {
                inspectionStatus: 'Generated Report',
                inspectionTime: 'on 10/12/2022 at 10:43 am',
                type: 'report',
            };
            const newItemS: TimelineItem = {
                inspectionStatus: 'Changed The status from inspection to work in progress',
                inspectionTime: 'on 10/12/2022 at 10:43 am',
                type: 'status changed',
            };
            setTimeLine(prevTimeLine => [...prevTimeLine, newItemS, newItem]);
            setInnerStep(3);
        }
        else {
            setSuccesReport('Report');
            setTimeout(() => {
                if (selectedItems.length > 0) {
                    let limitedArray = uploadFiles.slice(0, selectedItems.length);
                    setPdfItem(limitedArray);
                }
                else {
                    setPdfItem(uploadFiles);
                }
                setSuccesReport('');
                const newItem: TimelineItem = {
                    inspectionStatus: 'Generated Report',
                    inspectionTime: 'on 10/12/2022 at 10:43 am',
                    type: 'report',
                }; 
                setTimeLine(prevTimeLine => [...prevTimeLine, newItem]);
                setInnerStep(3);
                if (lastItem === 'upload') {
                    setDropdownStep(prevTimeLine => [...prevTimeLine, data]);
                };
                setStepValue(data)
            }, 2000);  
        }
    }

    const handleMarkComplete = () => {
        const newItem: TimelineItem = {
            inspectionStatus: 'Completed The Inspection',
            inspectionTime: 'on 10/12/2022 at 10:43 am',
            type: 'complete',
        }; 
        setTimeLine(prevTimeLine => [...prevTimeLine, newItem]);
        setStatus('Completed');
    }

    // SELECT BOX ITEM
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const handleCheckboxChange = (data: number) => {
        if (selectedItems.includes(data)) {
          setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== data));
        } else {
          setSelectedItems([...selectedItems, data]);
        }
    };
    const [checkComplete, setCheckComplete] = useState(false);
    const completeItems = [
        {
            key: '0',
            label: <div onClick={() => {setClose(true);}}>Change to work in progress</div>,
        }
    ];

    // Check Complete
    useEffect(() => {
        if (lastItem === 'complete') {
            setCheckComplete(true);
        }
        else  {
            setCheckComplete(false);
        }
    }, [timeLine, lastItem]);

    const [close, setClose] = useState(false);
    const handleClose = () => {
        setClose(false);
        handleReportGenrate(timeLine.length, 'second');
        setStatus('On Going');
    }
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        alert('please check console, ' + acceptedFiles[0].name + ' is uploaded')
    }, []);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <div className='timeline-items'>
            {timeLine.map((item, index) => (
                <div className='timeline-item' key={index}>
                    <ArrowUP />
                    <div className='timeline-item-info'>
                        <div className='user-deatils'>
                            <div className='user-avatar'>
                                <Image src={johnDoe} alt='user' />
                            </div>
                            <div className='user-deatils-content'>
                                <p className='user-status'><strong>{userName}</strong> {item.inspectionStatus}</p>
                                <p className='user-date'>{item.type === 'scheduled' ?  'Scheduled' : ''} {item.inspectionTime}</p>
                            </div>
                        </div>
                        {item.type !== 'scheduled' && startedButton ? <Button onClick={handleUploadMedia} type='primary'>Upload Media</Button> : ''}
                        {dropdownStep.includes(index) ?  <div className="action" onClick={() => setStepValue(index)}>
                            <div className={dropdownStepsOpen.includes(index) ? '' : 'open'}><ArrowDown /></div>
                        </div> : ''}
                        {item.type === 'complete' && checkComplete ?  
                            <div className="action" onClick={(event) => (event.stopPropagation())} >
                                <Dropdown
                                    menu={{items: completeItems}}
                                    placement="bottomRight"
                                    trigger={['click']}
                                    className='clickable'
                                >
                                    <div>
                                        <MenuDot />
                                    </div>
                                </Dropdown>
                            </div> : ''
                        }
                    </div>
                    {item.type === 'upload' || item.type === 'report' ?
                        <>
                            {dropdownStepsOpen.includes(index) ? '' :
                                <div className='upload-files-main'>
                                    {!dropdownStep.includes(index) && lastItem === 'upload' ? 
                                        <div className='drag-drop' {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Image src={dragDrop} alt='user' className='drag-drop-image' />
                                            {isDragActive ? (
                                                <p className='title'>Drop Your Files Here</p>
                                            ) : (
                                                <><p className='title'>Drag & Drop Your Files Here Or Choose File</p><p className='text'>50 MB Max File Size</p></>
                                            )}
                                        </div>
                                    : ''
                                    }
                                    <div className='upload-list'>
                                        {(item.type === 'report' ? pdfItem : uploadFiles).map((data, index) => (
                                            <div className="" key={index}>
                                                <div className="upload-list-item">
                                                    <div className='vid-detail' style={{ gap: innerStep <= 1 ? '20px' : '10px' }}>
                                                        {innerStep >= 2 && item.type === 'upload' ? <Checkbox onChange={() => handleCheckboxChange(index)}  /> : ''}
                                                        {innerStep <= 1 || item.type !== 'report' ? <MpIcon /> : <ViewReoprt />}
                                                        <div>
                                                            <p className='size'>Arianto grante LTD. 1281288928.mp4</p>
                                                            {innerStep === 2 ? <p ref={index === 1 ? ref2 : null}>150 images generated</p> : ''}
                                                        </div>
                                                    </div>
                                                    {innerStep === 0 ? <Progress percent={percent} /> : ''}
                                                    {innerStep === 0 ?
                                                        <div className='video-size text-upload'>
                                                            <p>{uploadingLength}MB /1GB</p>
                                                            <span></span>
                                                            <p>{Math.round(timeLeft/25)} minutes left</p>
                                                        </div>
                                                    : ''}
                                                    {innerStep === 1 ?
                                                        <div className='text-upload'>
                                                            <p>Please wait while AI generates images.</p>
                                                            <span></span>
                                                            <p>{Math.round(timeInspect/25)} minutes left</p>
                                                        </div>
                                                    : ''}
                                                    {innerStep === 1 && item.type === 'upload' ? <Image src={Scanning} alt='scanning' className='scanning' /> : ''}
                                                    {innerStep >= 2  && item.type === 'upload' && imageInspected.includes(index) ? 
                                                        <span className='inspected-badge'>35 Images Inspected <Edit onClick={() => handleInspetedImages(index)} /></span> 
                                                    : ''}
                                                    {innerStep >= 2 ?  
                                                        <div className='actions'>
                                                            {item.type === 'report' ?
                                                                <Button type='text' onClick={() => handleViewReport(index)}>View Report</Button> :
                                                            item.type === 'upload' ?
                                                                <Button type='text' onClick={() => handleInspetedImages(index)} ref={index === 1 ? ref1 : null}>Inspect Images</Button> : ''
                                                            }
                                                            <div className="action" onClick={(event) => (event.stopPropagation())} ref={index === 1 ? ref2 : null} >
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
                                                    : ''}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="more-acions">
                                        {(item.type === 'report' ? pdfItem : uploadFiles).length === 3 ? <Button type='text' onClick={() => handleAddItems(item.type === 'report' ? pdfItem : uploadFiles)}> View 2 More Videos</Button> : 
                                        (item.type === 'report' ? pdfItem : uploadFiles).length < 3 ? '' : <Button type='text' onClick={() => handleAddItems(item.type === 'report' ? pdfItem : uploadFiles)}> View Less</Button>}
                                        {item.type === 'report' ?
                                            <div className='btn-group'>
                                                <Button disabled={lastItem !== 'report'} onClick={reUpload} type='default'>Upload Media</Button> 
                                                <Button disabled={lastItem !== 'report'} onClick={handleMarkComplete} type='primary'>Mark As Complete</Button> 
                                            </div> :
                                            <Button onClick={() => handleReportGenrate(index, 'first')} disabled={imageInspected.length === 0 || lastItem !== 'upload'} type='primary'>Genrate Report</Button>
                                        }
                                    </div>
                                </div> 
                            }
                        </>
                        : ''  
                    }
                </div>
            ))}
            <CloseModal visible={close} setVisible={setClose} handleOk={handleClose} type="change" title={'You are changing the status to work in progress'} des={'Loreum ipsume is dummy text that will go here'} />
            <InspectImageModal visible={visible} setVisible={setVisible} handleOk={handleOk} id={inspectPopupId} title='Arianto Grande' />
        </div>
    );
};

export default TimeLineInspection;
