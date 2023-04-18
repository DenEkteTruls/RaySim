import { compute_slots } from "svelte/internal";


export class Engine {
    constructor(detail, max_length) {
        this.punkter = [{x: 0, y: 0}];
        this.detail = detail;
        this.u1 = 0;
        this.u2 = 0;
        this.d = 0.055;
        this.max_length = max_length;
    }


    updateVoltage(u1, u2) {
        this.u1 = u1;
        this.u2 = u2;
        this.updatePunkter();
    }


    updatePunkter() {
        let i = 0;
        for(let x = 0; x < this.max_length; x += this.max_length/this.detail) {
            console.log(this.u1, this.u2);

            let teta = (x == 0 ? 0 : Math.atan(this.punkter[i-1].y / x));
            
            let q = 1.6 * 10e-19;
            let m = 9.1049 * 10e-31;
            let v0 = Math.sqrt((2*q*this.u1)/m);
            let y = ((q*this.u2)/(2*m*this.d*(v0*Math.cos(teta))**2)) * x**2 + Math.tan(teta) * x;

            this.punkter = [...this.punkter, {x: Math.round(x*1e5) / 1e5, y: y}];
            i++;
        }
    }
}