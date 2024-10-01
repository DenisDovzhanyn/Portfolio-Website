import React from "react";
import { motion, spring, stagger } from "framer-motion"
import './card.css'
import { SocialPreview } from "../SocialPreview";
export function Card(props: any) {
    return (
        <motion.div layout className="card" 
        whileHover={{scale: 1.1}}
        initial={props.direction === 'right' ? {x: -2000} : {x: 2000}}
        animate={{ x: 0}}
        exit={props.direction === 'right' ? {x: 2000, transition: {duration: 0.5}} : {x: -2000, transition: {duration: 0.5}}}
        transition={{ duration: 1.5, type: 'spring', bounce: 0.25 }}>
            <SocialPreview url={props.repo.url} socialPreviewUrl={props.repo.socialPreviewUrl}/>
            <h1><a href={props.repo.url} target="_blank"> {props.repo.name} </a></h1>
            <p>{props.repo.readMe}</p>
        
        </motion.div>
    )
}
