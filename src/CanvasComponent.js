/**
 * Created by TAbdullah on 8/12/2017.
 */
import React, { Component } from 'react';
import './canvasComponent.css';

export default class CanvasComponent extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        this.updateCanvas();
    }
    updateCanvas(){
        this.drawClock();
        this.drawSecondHand();
    }
    updateTime(){

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
        // ctx.beginPath();
        // ctx.moveTo(0,0);
        // ctx.lineTo(300,150);

        //for(let theta = 0; theta < 2*Math.PI; theta += 0.1) {

        //}
    }
    drawSecondHand(){
        let {theta, height, width, origin} = this.props;
        const ctx = this.refs.canvas.getContext("2d");
        const handLength = (height/2) * 0.70;
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(handLength * Math.cos(theta), handLength * Math.sin(theta));
        ctx.strokeStyle = "red";
        ctx.stroke();
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
    origin: {x: 0, y: 0},
    theta: -Math.PI/2


};
