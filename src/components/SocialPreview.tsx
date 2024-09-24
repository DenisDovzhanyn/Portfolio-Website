import React from 'react';
import '../socialPreview.css';
export function SocialPreview(props: any) {
    return (
    <a href={props.url} target='_blank' > 
    <img src={props.socialPreviewUrl} className='socialPreview'/> 
    </a>
)
}