import React from 'react';
import './ImageWithLink.css';

interface IProps {
    src: any
    text: string
    link: string
    isDownload: boolean
}

export function ImageLink({src, text, link, isDownload}: IProps) {
    return (
        <div className='TextWithImage'>
            <a className='imageLink' download={isDownload && 'Denis-Dovzhanyn-Resume'} href={link}>
                <img src={src} className='headerFooterImg'/>
            </a>
            <a className='textLink' download={isDownload && 'Denis-Dovzhanyn-Resume'} href={link}>
                <h2 className='headerFooterH2'>
                    {text}
                </h2>
            </a>
        </div>
    )

}