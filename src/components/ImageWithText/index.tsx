import React from 'react';
import './ImageWithLink.css';

interface IProps {
    src: any
    text: string
    link: string
}

export function ImageLink({src, text, link}: IProps) {
    return (
        <div className='TextWithImage'>
            <a className='imageLink' href={link}>
                <img src={src} className='headerFooterImg'/>
            </a>
            <a className='textLink' href={link}>
                <h2 className='headerFooterH2'>
                    {text}
                </h2>
            </a>
        </div>
    )

}