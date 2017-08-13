/**
 * Created by TAbdullah on 8/12/2017.
 */
import React, { Component } from 'react';
import './canvasComponent.css';

export default class CanvasComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            seconds: 0,
            minutes: 58,
            hours: 12
        }
    }
    componentDidMount(){
        this.drawClock();
        let interval = setInterval(() =>{
            this.updateTime();
        }, 500);
    }
    updateCanvas(){
        this.clearCanvas();
        this.drawClock();
        this.drawSecondHand();
        this.drawMinuteHand();
        this.drawHourHand();
    }
    updateTime(){
        const {seconds, minutes, hours} = this.state;
        let newSeconds = seconds, newMinutes = minutes, newHours = hours;
        if(parseInt(seconds) + 1 > 59){
            newSeconds = 0;
            newMinutes = parseInt(minutes) + 1;
            if(parseInt(minutes) + 1 > 59){
                newMinutes = 0;
                newHours = parseInt(hours) + 1;
                if(parseInt(hours) + 1 > 12){
                    newHours = 1;
                }
            }
        }
        else {
            newSeconds = parseInt(seconds) + 1;
        }
        console.log('update time:', newHours + " : " + newMinutes + " : " + newSeconds);

        this.setState({
            seconds: newSeconds,
            minutes: newMinutes,
            hours: newHours
        });
    }
    clearCanvas(){
        let {height, width} = this.props;
        const ctx = this.refs.canvas.getContext("2d");
        const offset = height / 2;
        ctx.translate(-offset, -offset);
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.closePath();
    }

    drawClock(){
        let {height} = this.props;
        const ctx = this.refs.canvas.getContext("2d");
        const offset = height / 2;

        ctx.translate(offset, offset);
        const radius = offset * 0.90;
        ctx.arc(0, 0, radius, 0 , 2*Math.PI);
        ctx.fillStyle = "bisque";
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.stroke();

    }
    drawSecondHand(){
        let {height, origin} = this.props;
        let {seconds} = this.state;
        const ctx = this.refs.canvas.getContext("2d");
        const theta = (seconds/60) * (2*Math.PI);

        const handLength = (height/2) * 0.70;
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(handLength * Math.cos(theta), handLength * Math.sin(theta));
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
    drawMinuteHand(){
        let {height, origin} = this.props;
        let {minutes} = this.state;
        const ctx = this.refs.canvas.getContext("2d");
        const theta = (minutes/60) * (2*Math.PI);

        const handLength = (height/2) * 0.60;
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(handLength * Math.cos(theta), handLength * Math.sin(theta));
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
    drawHourHand(){
        let {height, origin} = this.props;
        let {hours} = this.state;
        const ctx = this.refs.canvas.getContext("2d");
        const theta = (hours/12) * (2*Math.PI);

        const handLength = (height/2) * 0.50;
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(handLength * Math.cos(theta), handLength * Math.sin(theta));
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
    componentDidUpdate(){
        this.updateCanvas();
    }
    render(){
        const {width, height} = this.props;
        const {seconds, minutes, hours} = this.state;
        console.log(hours + " : " + minutes + " : " + seconds);
        return (
            <canvas ref="canvas" width={width} height={height}/>
        );
    }
}

CanvasComponent.defaultProps = {
    width: 300,
    height: 300,
    origin: {x: 0, y: 0}
};
