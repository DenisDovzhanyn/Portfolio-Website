import React from "react";
import { motion, spring, stagger } from "framer-motion"
import './card.css'
import { SocialPreview } from "../SocialPreview";
export function Card(props: any) {
    return (
        <motion.div layout className="card" 
        initial={props.direction === 'right' ? {x: -1000} : {x: 1000}}
        animate={props.index === 1 ? {x: 0, width:440, height:693} : {x: 0}}
        transition={{ duration: 1, type: 'spring', bounce: 0.25 }}
        >
            <SocialPreview url={props.repo.url} socialPreviewUrl={props.repo.socialPreviewUrl}/>
            <h1 className="title"><a href={props.repo.url} target="_blank"> {props.repo.name} </a></h1>
            <p>{props.repo.readMe}</p>
        
        </motion.div>
    )
}
