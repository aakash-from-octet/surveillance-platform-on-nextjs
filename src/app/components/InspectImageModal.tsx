import React, { FC, useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import '@/app/styles/modal.scss';
import Cross from '../../../public/images/cross.svg';
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import InspectImage from '../../../public/images/inspect-image.png';
import InspectImage3 from '../../../public/images/not-balance.png';
import InspectImage2 from '../../../public/images/login-image.png';
import * as markerjs2 from 'markerjs2';
import Image from 'next/image';
import ArrowDown from '../../../public/images/arrow-down.svg';

interface InspectImageModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    title: string; 
    handleOk: (value: any) => void;
    id: number;
}

const InspectImageModal: FC<InspectImageModalProps> = ({ visible, setVisible, handleOk, title, id }) => {
    const handleCancel = () => {
        setVisible(false);
        if (imgRef.current !== null) {
            const markerArea = new markerjs2.MarkerArea(imgRef.current);
            markerArea.close();
        }
    };
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [points, setPoints] = useState(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const imgRef2 = useRef<HTMLImageElement>(null);
    const imgRef3 = useRef<HTMLImageElement>(null);
    const [imageCurrentRef, setImageCurrentRef] = useState<any>(null)
    const [markerArea, setMarkerArea] = useState<any>(null);

    useEffect(() => {
        if(imageCurrentRef === null) {
            setImageCurrentRef(imgRef)
        }
    }, []);
    const showMarkerArea = (imgRef: any) => {
        if (imageCurrentRef.current !== null) {
            const area = new markerjs2.MarkerArea(imageCurrentRef.current);
            area.addEventListener('render', (event: any) => {
                if (imageCurrentRef.current) {
                    imageCurrentRef.current.src = event.dataUrl;
                    setPoints(event.state);
                    console.log(points, 'points');
                }
            });
            area.show();
            setMarkerArea(area);
            setImageCurrentRef(imgRef); 
        }
    };
    
    const closeMarkerArea = () => {
        if (markerArea) {
            markerArea.close(); 
            setMarkerArea(null); 
        }
    };
    useEffect(() => {
        if(!visible) {
            if (markerArea) {
                markerArea.close(); 
                setMarkerArea(null); 
            }
        }
    }, [visible]);
    return (
        <Modal
            title={title}
            mask={true}
            open={visible}
            onOk={() => handleOk(id)}
            onCancel={handleCancel}
            className="inspect-image-modal"
            closeIcon={<Cross />}
            footer={[
                <Button key="back" className="cancel" style={{display : 'none'}} onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" className="save" type="primary" onClick={() => handleOk(id)}>
                    Save & Upload
                </Button>,
            ]}
        >
            <div className='swiper-main'>
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Thumbs]}
                    className="mySwiper2"
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                >
                    <SwiperSlide>
                        <Image src={InspectImage} alt='image' ref={imgRef} onClick={() => {showMarkerArea(imgRef); }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={InspectImage3} alt='image' ref={imgRef2} onClick={() => {showMarkerArea(imgRef2);}} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={InspectImage2} alt='image' ref={imgRef3} onClick={() => {showMarkerArea(imgRef3);}} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={InspectImage} alt='image' ref={imgRef} onClick={showMarkerArea} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={InspectImage} alt='image' ref={imgRef} onClick={showMarkerArea} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={InspectImage} alt='image' ref={imgRef} onClick={showMarkerArea} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={InspectImage} alt='image' ref={imgRef} onClick={showMarkerArea} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={InspectImage} alt='image' ref={imgRef} onClick={showMarkerArea} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={InspectImage} alt='image' ref={imgRef} onClick={showMarkerArea} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={InspectImage} alt='image' ref={imgRef} onClick={showMarkerArea} />
                    </SwiperSlide>
                </Swiper>
                <div>
                    <div className="annoted-images">
                        <p>Annotated Images (50)</p>
                        <div className="count">
                            <ArrowDown /><span>50</span><ArrowDown />
                        </div>
                    </div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[ Thumbs]}
                        onSwiper={setThumbsSwiper}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <Image src={InspectImage} alt='image' onClick={() => { closeMarkerArea(); setImageCurrentRef(imgRef)}} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={InspectImage3} alt='image' onClick={() => {closeMarkerArea(); setImageCurrentRef(imgRef2)}} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={InspectImage2} alt='image' onClick={() => {closeMarkerArea(); setImageCurrentRef(imgRef3)}} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={InspectImage} alt='image' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={InspectImage} alt='image' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={InspectImage} alt='image' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={InspectImage} alt='image' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={InspectImage} alt='image' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={InspectImage} alt='image' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src={InspectImage} alt='image' />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </Modal>
    );
};
export default InspectImageModal;