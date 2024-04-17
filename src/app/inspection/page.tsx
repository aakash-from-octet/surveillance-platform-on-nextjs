"use client";
import "../styles/page.scss";
import { useState } from "react";
import { Input, Button, DatePicker, Select } from "antd";
import type { DatePickerProps } from 'antd';
import Image from "next/image";
import NothingHere from '../../../public/images/nothing-here.png'
import RootLayout from "../layout";
import InspectionListItem from "../components/InspectionListItem";
import DeleteModal from "../components/deleteModal";
import NewInspectionModal from "../components/NewInspectionModal";
import RescheduleModal from "../components/Reschedule";
import HeaderDesign from '../../../public/images/header-right-design.png';
import SearchIcon from '../../../public/images/search.svg';
import CalendarOutlined from '../../../public/images/date.svg'
import ArrowDown from '../../../public/images/arrow-down.svg';

interface InspectionItem {
    priority: string;
    inspectionName: string;
    assetId: number;
    dateTime: string;
    inspectionTeam: string;
    status: string;
    imagesLength: number
}

export default function Inspection() {
    const listItem: InspectionItem[] = [
        {
            priority: 'Highest',
            inspectionName: 'Inspection Block Of Solar Plant, Delhi',
            assetId: 3254661,
            dateTime: '2 May, 10:32 pm',
            inspectionTeam: '',
            status: 'Scheduled',
            imagesLength: 5,
        },
        {
            priority: 'Moderate',
            inspectionName: 'Inspection Block Of Solar Plant, Delhi',
            assetId: 32543,
            dateTime: '4 May, 10:32 pm',
            inspectionTeam: '',
            status: 'Scheduled',
            imagesLength: 5,
        },
        {
            priority: 'Low',
            inspectionName: 'Inspection Block Of Solar Plant, Delhi',
            assetId: 32,
            dateTime: '3 May, 10:32 pm',
            inspectionTeam: '',
            status: 'On Going',
            imagesLength: 5,
        },
        {
            priority: 'Lowest',
            inspectionName: 'Inspection Block Of Solar Plant, Delhi',
            assetId: 325464,
            dateTime: '9 May, 10:33 pm',
            inspectionTeam: '',
            status: 'Scheduled',
            imagesLength: 5,
        },
        {
            priority: 'High',
            inspectionName: 'Inspection Block Of Solar Plant, Delhi',
            assetId: 3254,
            dateTime: '7 May, 10:32 pm',
            inspectionTeam: '',
            status: 'On Going',
            imagesLength: 5,
        }
    ]
    const [visible, setVisible] = useState(false);
    const [visibleSchedule, setVisibleSchedule] = useState(false);
    const [visibleInspection, setVisibleInspection] = useState(false);
    
    const [deleteId, setDeleteId] = useState(0);
    const [deleteText, setDeleteText] = useState('');
    const [rescheduleId, setRescheduleId] = useState(0);
    const [updateInspectionId, setUpdateInspectionId] = useState(0);

    const handleOk = (data: number): void => {
        console.log(data, 'is deleted');
        setVisible(false)
    }
    const handleSchedule = (data: number): void => {
        console.log(data, 'is rescheduled');
        setVisibleSchedule(false)
    }
    const handleInspection = (data: number): void => {
        console.log(data, 'is rescheduled');
        setVisibleInspection(false)
    }
    const handleNewInspection = () => {
        setVisibleInspection(true)
    }
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event: any) => {
        const { value } = event.target;
        console.log(value, 'value')
        setSearchTerm(value);
    };
    const pageHeader: string[] = ['Priority', 'Inspection Name', 'Asset ID', 'Date & Time', 'Inspection Team', 'Status', 'Action'];
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    // Sorting
    const [sortingOrder, setSortingOrder] = useState<'asc' | 'desc'>('asc');
    const [sortingBy, setSortingBy] = useState<'priority' | 'assetId' | 'dateTime' | ''>('');

    const sortedList = listItem.sort((a, b) => {
        let comparison = 0;
        if (sortingBy === 'priority') {
            const priorityOrder = ['Highest', 'High', 'Moderate', 'Low', 'Lowest'];
            comparison = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        } else if (sortingBy === 'assetId') {
            comparison = a.assetId - b.assetId;
        } else if (sortingBy === 'dateTime') {
            comparison = new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
        }

        return sortingOrder === 'asc' ? comparison : -comparison;
    });

    const handleSortClick = (sortBy: 'priority' | 'assetId' | 'dateTime' | '') => {
        if (sortingBy === sortBy) {
            setSortingOrder(sortingOrder === 'asc' ? 'desc' : 'asc');
        } else {
            if (sortBy !== '') {
                setSortingBy(sortBy);
                setSortingOrder('asc');
            }
        }
    };
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleSortClickIndex = (index: number) => {
        if (activeIndex === index) {
          setActiveIndex(-1);
        } else {
          setActiveIndex(index);
        }
    };
    return (
        <RootLayout includeHeader={true}>
            <div className="main-page">
                <div className="page-header">
                    <Image src={HeaderDesign} alt="desgin" className="header-design" />
                    <div className="user-side">
                        <Image src={NothingHere} alt="nothing-here" className="nothing-here" />
                        <div>
                            <h1>Hello, Ben Murray</h1>
                            <p>Lorem Ipsum is simply a dummy text.</p>
                        </div>
                    </div>
                    <Button type="primary" onClick={handleNewInspection}>
                        Add New Inspection
                    </Button>
                </div>
                <div className="page-content">
                    <div className="page-filter">
                        <Input placeholder="Search inspections" onChange={(e) => handleSearch(e)} prefix={<SearchIcon />} />
                        <div className="sort">
                            <Select
                                suffixIcon={<ArrowDown />}
                                defaultValue="Group By"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                dropdownStyle={{ padding: '5px 0', borderRadius: '4px', marginTop: '-6px', boxShadow: '0px 2px 4px 0px #00000033'}}
                                options={[
                                    { value: 'text-1', label: 'Text 1' },
                                    { value: 'text-2', label: 'Text 2' },
                                    { value: 'text-3', label: 'Text 3' },
                                ]}
                            />
                            <DatePicker onChange={onChange} format="DD MMMM, YYYY" suffixIcon={<CalendarOutlined />} />
                        </div>
                    </div>
                    <div className="inspection-list-header">
                        <ul>
                            {pageHeader.map((item, index) => (
                                <li key={index} onClick={() => {handleSortClick( item === 'Priority' ? 'priority' : item === 'Asset ID' ? 'assetId' : item === 'Date & Time' ? 'dateTime' : ''); handleSortClickIndex(index)}}
                                    style={{ cursor: item === 'Priority' || item === 'Asset ID' || item === 'Date & Time' ? 'pointer' : '' }}  
                                >
                                    {item} {item === 'Priority' || item === 'Asset ID' || item === 'Date & Time' ? <ArrowDown className={index === activeIndex && sortingOrder === 'asc' ? 'active' : ''} /> : ''}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {sortedList
                        .filter((item) =>
                            item.inspectionName.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((item, index) => (
                        <InspectionListItem 
                            key={index} 
                            content={item} 
                            setVisible={setVisible} 
                            setVisibleSchedule={setVisibleSchedule} 
                            setRescheduleId={setRescheduleId} 
                            setDeleteId={setDeleteId}
                            setDeleteText={setDeleteText}
                            indexId={index}
                            setUpdateInspectionId={setUpdateInspectionId}
                            setVisibleInspection={setVisibleInspection}
                        />
                    ))}
                </div>
            </div>
            <DeleteModal visible={visible} setVisible={setVisible} handleOk={handleOk} deleteId={deleteId} name="inspection" data={deleteText} />
            <RescheduleModal visible={visibleSchedule} setVisible={setVisibleSchedule} handleOk={handleSchedule} rescheduleId={rescheduleId} />
            <NewInspectionModal visible={visibleInspection} setVisible={setVisibleInspection} sucess="" updateInspectionId={updateInspectionId} update={true} handleOk={handleInspection} />
        </RootLayout>
    );
}
