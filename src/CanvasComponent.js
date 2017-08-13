/**
 * Created by TAbdullah on 8/12/2017.
 */
import React, { Component } from 'react';
import './canvasComponent.css';

export default class CanvasComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            theta: -Math.PI/2
        }
    }
    componentDidMount(){
        const {width, height} = this.props;
        this.drawClock();
        let interval = setInterval(() =>{
            this.updateTime();
        }, 1000);
    }
    updateCanvas(){
        this.clearCanvas();
        this.drawClock();
        this.drawSecondHand();
    }
    updateTime(){
        const {theta} = this.state;
        let newTheta;
        const inc = (1/60) * 2*Math.PI;
        // if(theta + 0.1 > 2*Math.PI){
        //     newTheta = (theta - 2*Math.PI) + inc;
        // }
        //else {
            newTheta = theta + inc;
        //}

        this.setState({
            theta: newTheta
        });
    }
    clearCanvas(){
        let {theta, height, width} = this.props;
        const ctx = this.refs.canvas.getContext("2d");
        const offset = height / 2;
        ctx.translate(-offset, -offset);
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.closePath();
    }

    drawClock(){
        let {theta, height, width} = this.props;
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
        let {initialTheta, height, width, origin} = this.props;
        let {theta} = this.state;
        const ctx = this.refs.canvas.getContext("2d");

        const handLength = (height/2) * 0.70;
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
