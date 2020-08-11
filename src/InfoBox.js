import React from 'react'
import './InfoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core'

function InfoBox({ title, cases, active , isRed, total, ...props }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infobox-selected'} ${isRed && 'infobox-red'}`}>
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox_cases ${!isRed && 'InfoBox_cases-green'}`}>+{cases}</h2>
                <Typography className={`infoBox_total ${!isRed && 'InfoBox_cases-green'}`} color="textSecondary">
                    Total : {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
