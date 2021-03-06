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
        setInterval(() =>{
            this.updateTime();
        }, 50);
    }
    updateCanvas(){
        const {seconds, minutes, hours} = this.state;
        this.clearCanvas();
        this.drawClock();
        this.drawNumbers();
        this.drawHand(seconds/60, 0.70);
        this.drawHand(minutes/60, 0.60);
        this.drawHand((hours + (minutes/60))/12, 0.50);
    }
    updateTime(){
        const {seconds, minutes, hours} = this.state;
        let newSeconds = seconds, newMinutes = minutes, newHours = hours;
        if(seconds + 1 > 59){
            newSeconds = 0;
            newMinutes = minutes + 1;
            if(minutes + 1 > 59){
                newMinutes = 0;
                newHours = hours + 1;
                if(hours + 1 > 12){
                    newHours = 1;
                }
            }
        }
        else {
            newSeconds = seconds + 1;
        }

        //uncomment this and put above code block inside comments to map clock state to current time
        // const currentTime = new Date();
        // const newSeconds = currentTime.getSeconds();
        // const newMinutes = currentTime.getMinutes();
        // const newHours = currentTime.getHours();

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
        ctx.strokeStyle = "red";
        ctx.stroke();
    }

    drawNumbers() {
        let {height} = this.props;
        const ctx = this.refs.canvas.getContext("2d");
        let theta;
        const radius = (height / 2) * 0.9;

        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        ctx.fillStyle = "black";
        for(let num = 12; num > 0; num -= 3){
            theta = num * (2 * Math.PI) / 12;
            ctx.rotate(theta);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-theta);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(theta);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-theta);
        }
    }

    drawHand(angleFraction, lengthFraction){
        let {height, origin} = this.props;
        const ctx = this.refs.canvas.getContext("2d");
        const theta = ((angleFraction) * (2*Math.PI)) - (Math.PI/2);
        const handLength = (height/2) * lengthFraction;
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
