"use client";
import { useState, useEffect } from "react";
import "../styles/page.scss";
import { Button, Select, Progress, DatePicker } from "antd";
import type { DatePickerProps } from 'antd';
import Image from "next/image";
import NothingHere from '../../../public/images/nothing-here.png';
import NotBalance from '../../../public/images/not-balance.png';
import RootLayout from "../layout";
import HeaderDesign from '../../../public/images/header-right-design.png'
import Link from "next/link";
import List from '../../../public/images/list.svg';
import DateIconBlue from '../../../public/images/date-icon-blue.svg';
import AnnualLoss from '../../../public/images/annual-loss.svg'
import AnnualPotensial from '../../../public/images/annual-potensial.svg';
import Fault from '../../../public/images/faults.svg';
import RelativePerformance from '../../../public/images/relative-performance.svg';
import ArrowDown from '../../../public/images/arrow-down.svg';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import DateIcon from '../../../public/images/date.svg';
import SolarPannel from '../../../public/images/solar-pannel.svg';
import CalendarOutlined from '../../../public/images/date.svg'

interface HomeListItem {
    name: string;
    value: number;
};
interface ActionRequiredList {
    name: string;
    asset: string;
    status: string;
    btnText: string;
    btnLink: string;
};
interface UpcomingInspectionList {
    name: string;
    asset: string;
    date: string;
    monthYear: string;
};
interface ReportList {
    name: string;
    value: any;
    image: any;
};
interface FaultsListItem {
    color: string;
    value: any;
    percent: any;
};

export default function Dashboard() {
    const inspectionOverView: HomeListItem[] = [
        {
            name: 'Completed Inspections',
            value: 100,
        },
        {
            name: 'Overdue Inspections',
            value: 30,
        },
        {
            name: 'On-Going Inspections',
            value: 20,
        },
    ];
    const faultsOverView: HomeListItem[] = [
        {
            name: 'Completed Inspections',
            value: 100,
        },
        {
            name: 'Overdue Inspections',
            value: 30,
        },
        {
            name: 'On-Going Inspections',
            value: 20,
        },
    ];
    const actionList: ActionRequiredList[] = [
        {
            name: 'Inspection Block Of Solar Plant Delhi, Plant',
            asset: 'Solar Farm Gujarat',
            status: 'On Going',
            btnText: 'Upload Media',
            btnLink: '/ispection-detail'
        },
        {
            name: 'Inspection Block Of Solar Plant Delhi, Plant',
            asset: 'Solar Farm Gujarat',
            status: 'On Going',
            btnText: 'View Report',
            btnLink: '/ispection-detail'
        },
        {
            name: 'Inspection Block Of Solar Plant Delhi, Plant',
            asset: 'Solar Farm Gujarat',
            status: 'On Going',
            btnText: 'Start Inspection',
            btnLink: '/ispection-detail'
        }
    ];
    const upcomingInspectionList: UpcomingInspectionList[] = [
        {
            name: 'Inspection Block Of Solar Plant Delhi, Plant',
            asset: 'Solar Farm Gujarat',
            date: '25',
            monthYear: 'September, 2023'
        },
        {
            name: 'Inspection Block Of Solar Plant Delhi, Plant',
            asset: 'Solar Farm Gujarat',
            date: '25',
            monthYear: 'September, 2023'
        },
        {
            name: 'Inspection Block Of Solar Plant Delhi, Plant',
            asset: 'Solar Farm Gujarat',
            date: '25',
            monthYear: 'September, 2023'
        },
    ];
    const reportList: ReportList[] = [
        {
            name: 'Panels Inspected',
            value: 1000,
            image: <List />,
        },
        {
            name: 'Faults Detected',
            value: 245,
            image: <Fault />,
        },
        {
            name: 'Relative Performance',
            value: '67.6%',
            image: <RelativePerformance />,
        },
        {
            name: 'Annual Potential',
            value: '456.2k',
            image: <AnnualPotensial />,
        },
        {
            name: 'Annual Loss',
            value: '234.2k',
            image: <AnnualLoss />,
        },
    ];
    const faultsClassification: HomeListItem[] = [
        {
            name: 'Bird Waste',
            value: 30,
        },
        {
            name: 'Wind',
            value: 40,
        },
        {
            name: 'Module offline',
            value: 60,
        },
        {
            name: 'Cell',
            value: 20,
        },
        {
            name: 'Birds Waste',
            value: 50,
        },
        {
            name: 'Lable',
            value: 80,
        },
    ];
    const [adminUser, setAdminUser] = useState(false);
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const faultsList: FaultsListItem[] = [
        {
            color: '#DAB4E5',
            value: '10',
            percent: 10
        },
        {
            color: '#FECAD5',
            value: 'Multi Cell',
            percent: 60,
        },
        {
            color: '#FDAEA9',
            value: 'Speckled',
            percent: 5,
        },
        {
            color: '#F0CA86',
            value: 'Bypass Diode',
            percent: 5,
        },
        {
            color: '#DDE59B',
            value: 'Multi Cell',
            percent: 7,
        },
        {
            color: '#9AD7A4',
            value: 'Single Cell',
            percent: 6,
        },
        {
            color: '#72B7EA',
            value: 'Other',
            percent: 7,
        },
    ]; 
    const options = {
        title: {
            text: null
        },
        colors: ['#DAB4E5', '#FECAD5', '#FDAEA9', '#F0CA86', '#DDE59B', '#9AD7A4', '#72B7EA'],
        tooltip: {
            valueSuffix: '%',
            stickOnContact: true,
        },
        plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              pointPadding: 0.1,
              dataLabels: {
                enabled: false,
                format: '{name}: {y} %'
              },
                groupPadding: 0.2,
              showInLegend: false
            }
        },
        legend: {
            // layout: 'vertical',
            // align: 'right',
            // verticalAlign: 'middle',
            // itemMarginTop: 10,
            // itemMarginBottom: 10,
            // labelFormatter: function(this: Highcharts.Series): string {
            //     return this.name + ': ' + this.y + ' %';
            // }    
        },
        series: [
            {
                type: 'pie',
                name: 'Percentage',
                colorByPoint: true,
                innerSize: '62%',
                data: [{
                    name: 'Cell',
                    y: 10
                }, {
                    name: 'Multi Cell',
                    y: 60
                }, {
                    name: 'Speckled',
                    y: 5
                }, {
                    name: 'Bypass Diode',
                    y: 5
                }, {
                    name: 'Multi Cell',
                    y: 7
                }, {
                    name: 'Single Cell',
                    y: 7
                }, {
                    name: 'Other',
                    y: 7
                }
                ]
            }
        ]
    };
    const secondOptions = {
        chart: {
            type: 'column',
            zoomType: 'y'
        },
        title: {
            text: null
        },
        colors: ['#1B68BB', '#72B7EA'],
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            title: {
              text: null
            },
            accessibility: {
              description: 'Countries'
            }
        },
        yAxis: {
            title: {
              text: null
            },
            labels: {
              overflow: 'justify'
            },
            tickInterval: 10000,
            max: 60000
        },
        plotOptions: {
            column: {
                cursor: 'pointer',
                borderRadius: 6.5,
                groupPadding: 0.29,
                pointPadding: 0.01,
            }
        },
        tooltip: {
            // valueSuffix: ' (1000 MT)',
            stickOnContact: true,
            // backgroundColor: 'rgba(255, 255, 255, 0.93)'
        },
        legend: {
            enabled: false,
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'top',
            itemMarginTop: 10,
            itemMarginBottom: 10,   
        },
        series: [
            {
              name: 'Corn',
              data: [30000, 26000, 48000, 38000, 28000, 58000, 32000, 28000, 49000, 30000, 50000, 45000],
              borderColor: '#949494'
            },
            {
              name: 'Wheat',
              data: [50000, 40000, 23000, 22000, 41000, 54000, 58000, 40000, 22000, 35000, 40000, 38000]
            }
        ]
    };
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <RootLayout includeHeader={true}>
            <div className="main-page">
                <div className="page-header">
                    <Image src={HeaderDesign} alt="desgin" className="header-design" />
                    {/* this is the dummy function will remove later */}
                    <div className="user-side" onClick={() => setAdminUser(!adminUser)}>
                        {   
                            !adminUser ? <Image src={NothingHere} alt="nothing-here" className="nothing-here" /> :
                            <Image src={NotBalance} alt="not-balance" className="nothing-here" />
                        }
                        <div>
                            <h1>Hello, Ben Murray</h1>
                            <p>{adminUser ? 'Hope this insights will help you to make better dicisions ' : 'Lorem Ipsum is simply a dummy text.'}</p>
                        </div>
                    </div>
                    {!adminUser && 
                        <DatePicker onChange={onChange} format="DD MMMM, YYYY" suffixIcon={<CalendarOutlined />} />
                    }
                </div>
                <div className="page-content home">
                    {!adminUser && <div className="home-list">
                        <div>
                            <h2>Inspection Overview</h2>
                            <div className="home-list-inner">
                                {inspectionOverView.map((item, index) => (
                                    <div className="list-item" key={index}>
                                        <List />
                                        <p className="list-item-name">{item.name}</p>
                                        <p className="list-item-value">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2>Faults Overview</h2>
                            <div className="home-list-inner">
                                {faultsOverView.map((item, index) => (
                                    <div className="list-item" key={index}>
                                        <List />
                                        <p className="list-item-name">{item.name}</p>
                                        <p className="list-item-value">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> }
                    {adminUser && <div className="home-report-list">
                        {reportList.map((item, index) => (
                            <div className="home-report-item" key={index}>
                                {item.image}
                                <div className="report-details">
                                    <p className="name">{item.name}</p>
                                    <p className="value">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div> }
                    {!adminUser && <>
                    <h2>Actions Required</h2>
                    <div className="actions-list">
                        {actionList.map((item, index) => (
                            <div className="actions-item" key={index}>
                                <div className="details">
                                    <p className="title">{item.name}</p>
                                    <p className="des">Asset:{item.asset}</p>
                                </div>
                                <p className={`status ${item.status === 'On Going' ? 'on-going' : ''}`}>{item.status}</p>
                                <Link className="ant-btn-default" href={item.btnLink} type="default">{item.btnText}</Link>
                            </div>
                        ))}
                    </div>
                    <h2>Upcoming Inspections</h2>
                    <div className="upcoming-inspection-list">
                        {upcomingInspectionList.map((item, index) => (
                            <div className="inspection-item" key={index}>
                                <div className="details">
                                    <div className="date">
                                        <DateIconBlue />
                                        <div className="date-text">
                                            <p>{item.date}</p>
                                            <p>{item.monthYear}</p>
                                        </div>
                                    </div>
                                    <Button>View Details</Button>
                                </div>
                                <div>
                                    <p className="list-title">{item.name}</p>
                                    <p className="list-des">Asset: {item.asset}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </>}
                    {adminUser && <>
                    <Select
                        suffixIcon={<ArrowDown />}
                        defaultValue="All Assets"
                        style={{ width: 146 }}
                        onChange={handleChange}
                        className="assets-select"
                        options={[
                            { value: 'all-assets', label: 'All Assets' },
                            { value: 'asset-1', label: 'Asset No. 1' },
                            { value: 'asset-2', label: 'Asset No. 2' },
                            { value: 'asset-3', label: 'Asset No. 3' },
                            { value: 'asset-4', label: 'Asset No. 4' },
                            { value: 'asset-5', label: 'Asset No. 5' },
                        ]}
                    />
                    <div className="charts-list">
                        <div className="chart">
                            <p className="chart-title">Faults Classification</p>
                            <div className="info">
                                <div className="faults-list">
                                    {faultsClassification.map((item, index) => (
                                        <div className="faults-list-item" key={index}>
                                            <div className="detail">
                                                <p>{item.name}</p>
                                                <Progress percent={item.value} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="chart">
                            <div className="title-para">
                                <p className="chart-title">Fault Types</p>
                                <div className="des">Total Panels: <span>245 Panels</span></div>
                            </div>
                            <div className="pie-chart-container">
                                <div className="container">
                                    <SolarPannel className="solar-pannel" />
                                    <HighchartsReact highcharts={Highcharts} options={options} />
                                </div>
                                <div className="legends">
                                    {faultsList.map((item, index) => (
                                        <div className="legend-outer" key={index}>
                                            <div className="legend">
                                                <div className="color" style={{backgroundColor: item.color}}></div>
                                                <p>{item.value}</p>
                                            </div>
                                            <p className="num">{item.percent}%</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="chart">
                            <div className="title-para">
                                <p className="chart-title">Revenue Loss vs Revenue Potential</p>
                                <div className="date">
                                    <DateIcon className='date-icon' />
                                    <Select
                                        suffixIcon={<ArrowDown />}
                                        defaultValue="Monthly"
                                        style={{ width: 146 }}
                                        onChange={handleChange}
                                        className="time-select"
                                        options={[
                                            { value: 'monthly', label: 'Monthly' },
                                            { value: 'yearly', label: 'Yearly' },
                                            { value: 'quaterly', label: 'Quarterly' },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="legends">
                                <div className="legend">
                                    <div className="color"></div>
                                    <p>Potential</p>
                                </div>
                                <div className="legend">
                                    <div className="color" style={{background: '#72B7EA'}}></div>
                                    <p>loss</p>
                                </div>
                            </div>
                            <div className="chart-container">
                                <HighchartsReact highcharts={Highcharts} options={secondOptions} />
                            </div>
                        </div>
                    </div> 
                    </>}
                </div>
            </div>
        </RootLayout>
    );
}
