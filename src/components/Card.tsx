import React from "react";
import '../card.css'
import { SocialPreview } from "./SocialPreview";
export function Card(props: any) {
    return (
        <div className="card">
            <SocialPreview url={props.repo.url} socialPreviewUrl={props.repo.socialPreviewUrl}/>
            <h1><a href={props.repo.url} target="_blank"> {props.repo.name} </a></h1>
            <p>{props.repo.readMe}</p>
        </div>
    )
}
