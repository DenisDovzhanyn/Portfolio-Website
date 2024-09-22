import React from "react";

export function Card(props: any) {
    return (
        <div id="card">
            <h1><a href={props.url}> {props.name} </a></h1>
            <p>{props.readMe}</p>
        </div>
    )
}
