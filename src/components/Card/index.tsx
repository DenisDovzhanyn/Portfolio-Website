import React from "react";
import { motion, spring, stagger } from "framer-motion"
import './styles.css';
import { SocialPreview } from "../SocialPreview";
import { Repository } from '../../types/repository';
interface IProps {
    repo: Repository
    direction: 'left' | 'right'
    index: number
}
export function Card({direction, index, repo}: IProps) {
    return (
        <motion.div layout className="card" 
        initial={direction === 'right' ? {x: -1000} : {x: 1000}}
        animate={index === 1 ? {x: 0, width:440, height:693} : {x: 0}}
        transition={{ duration: 1, type: 'spring', bounce: 0.25 }}
        >
            <SocialPreview url={repo.url} socialPreviewUrl={repo.socialPreviewUrl}/>
            <h1 className="title"><a href={repo.url} target="_blank"> {repo.name} </a></h1>
            <p>{repo.readMe}</p>
        
        </motion.div>
    )
}
