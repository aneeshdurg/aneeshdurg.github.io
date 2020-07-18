const X = 1000;
const M = X / 2;
const r = 0.8 * M;

class SemicircleProblem {
    constructor(parentEl, renderText, additionalInfo) {
        const container = document.createElement("div");
        container.className = "problem";
        this.canvas = document.createElement("canvas");

        const intersectionContainer = document.createElement("code");
        intersectionContainer.innerHTML = "Intersection point: ";
        this.intersectionText = document.createElement("span");
        intersectionContainer.appendChild(this.intersectionText);

        const redContainer = document.createElement("code");
        redContainer.innerHTML = "Red area: ";
        this.redText = document.createElement("span");
        redContainer.appendChild(this.redText);

        const blueContainer = document.createElement("code");
        blueContainer.innerHTML = "Blue area: ";
        this.blueText = document.createElement("span");
        blueContainer.appendChild(this.blueText);

        const sumContainer = document.createElement("code");
        sumContainer.innerHTML = "Sum of semicircle areas: ";
        this.sumText = document.createElement("span");
        sumContainer.appendChild(this.sumText);

        const totalText = document.createElement("code");
        totalText.innerHTML = "Inside area: " + (Math.PI * Math.pow(r, 2)).toFixed(2);

        container.appendChild(this.canvas);

        if (renderText) {
            const textbox = document.createElement("div");
            textbox.className = "textbox";
            container.appendChild(textbox);
            textbox.appendChild(document.createElement("br"));
            textbox.appendChild(intersectionContainer);
            textbox.appendChild(document.createElement("br"));
            textbox.appendChild(redContainer);
            textbox.appendChild(document.createElement("br"));
            textbox.appendChild(blueContainer);
            textbox.appendChild(document.createElement("br"));
            textbox.appendChild(sumContainer);
            textbox.appendChild(document.createElement("br"));
            textbox.appendChild(totalText);
        }

        parentEl.appendChild(container);

        this.canvas.width = X;
        this.canvas.height = X;

        this.ctx = this.canvas.getContext('2d');

        this.p = NaN;
        this.targetP = 0;

        this.canvas.onclick = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (X * (e.clientX - rect.left) / rect.width) - M;
            this.targetP = x;
        };

        this._drawAdditionalInfo = additionalInfo;

        this.draw();
    }

    get alpha() {
        return Math.sqrt(2 * Math.pow(r, 2) - Math.pow(this.p, 2));
    }

    clear() {
        this.ctx.restore();
        this.ctx.clearRect(0, 0, X, X);
        this.ctx.save();
    }

    drawAxis() {
        this.ctx.setLineDash([5, 5]);

        // x axis
        this.ctx.beginPath();
        this.ctx.moveTo(-M, 0);
        this.ctx.lineTo(M, 0);
        this.ctx.stroke();

        // y axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, -M);
        this.ctx.lineTo(0, M);
        this.ctx.stroke();

        this.ctx.setLineDash([]);
    }

    drawMainCircle() {
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        this.ctx.arc(0, 0, r, 0, 2 * Math.PI, false);
        this.ctx.stroke();
    }

    updateText() {
        this.intersectionText.innerText = this.p.toFixed(2);
        const redArea = Math.PI * Math.pow((this.p + this.alpha) / 2, 2) / 2;
        const blueArea = Math.PI * Math.pow((this.p - this.alpha) / 2, 2) / 2;
        this.redText.innerText = redArea.toFixed(2);
        this.blueText.innerText = blueArea.toFixed(2);
        this.sumText.innerText = (redArea + blueArea).toFixed(2);
    }

    get x1() {
        return (this.p - this.alpha)/2;
    }

    get x2() {
        return (this.p + this.alpha)/2;
    }

    drawSemicircles() {
        this.ctx.lineWidth = 1;

        this.ctx.beginPath();
        this.ctx.arc(this.x1, 0, Math.abs(this.p - this.x1), -Math.PI / 2, Math.PI / 2, false);
        this.ctx.fillStyle = '#ff000088';
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.x2, 0, Math.abs(this.p - this.x2), Math.PI / 2, -Math.PI / 2, false);
        this.ctx.fillStyle = '#0000ff88';
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawPoint(x, y, label, labelx, labely) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = '#000000';
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.font = '60px arial';
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(label, x + labelx, y + labely);

    }

    drawAdditionalInfo() {
        const rho = -(this.p + this.alpha) / 2;

        // Draw triangle
        {
            this.ctx.setLineDash([2, 2]);
            this.ctx.lineWidth = 5;

            this.ctx.beginPath();
            this.ctx.moveTo(this.p, 0);
            this.ctx.lineTo(this.x1, 0);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.x1, 0);
            this.ctx.lineTo(this.x1, rho);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.x1, rho);
            this.ctx.lineTo(this.p, 0);
            this.ctx.stroke();

            this.ctx.setLineDash([]);
        }

        // Draw right angle indicator
        {
            const size = (this.p - this.x1) / 4;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x1 + size, 0);
            this.ctx.lineTo(this.x1 + size, -size);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.x1, -size);
            this.ctx.lineTo(this.x1 + size, -size);
            this.ctx.stroke();
        }

        // Draw labels
        this.drawPoint(this.p, 0, 'P', 0, 50);
        this.drawPoint(this.x1, 0, 'X', -10, 50);
        this.drawPoint(this.x1, rho, 'R', 0, -20);
    }

    draw() {
        if (this.p != this.targetP) {
            if (isNaN(this.p))
                this.p = this.targetP;
            else {
                const s = Math.sign(this.targetP - this.p);
                this.p = (this.targetP + this.p) / 2
            }
        }
        this.clear();
        this.ctx.translate(M, M);
        this.drawAxis();
        this.drawMainCircle();
        this.drawSemicircles();

        if (this._drawAdditionalInfo)
            this.drawAdditionalInfo();

        this.updateText();

        requestAnimationFrame(this.draw.bind(this));
    }
}
