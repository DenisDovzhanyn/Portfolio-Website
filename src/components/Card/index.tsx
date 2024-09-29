import React from "react";
import { motion, spring } from "framer-motion"
import './card.css'
import { SocialPreview } from "../SocialPreview";
export function Card(props: any) {
    return (
        <motion.div className="card" 
        whileHover={{scale: 1.1}}
        initial={{ x: 2000 }}
        animate={{ x: 0}}
        transition={{ duration: 1 }}>
            <SocialPreview url={props.repo.url} socialPreviewUrl={props.repo.socialPreviewUrl}/>
            <h1><a href={props.repo.url} target="_blank"> {props.repo.name} </a></h1>
            <p>{props.repo.readMe}</p>
        </motion.div>
    )
}
