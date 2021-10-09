import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import './Infobox.css'
import { prettyPrint } from '../utils'
const Infobox = ({title,active,isRed,cases,cls,total,onCaseChange}) => {

    return (
        <Card onClick={onCaseChange} className={`infoBox ${active?cls:''}`}>
            <CardContent>
                <Typography className="infoBox__title" color={"#4db6ac"}>{title}</Typography>
                <h2  className={`infoBox__cases ${isRed?"red":"green"}` }> {prettyPrint(cases)}</h2>
                <Typography className="infoBox__total" color="gray"><h3>{prettyPrint(total)} Total</h3></Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox 
