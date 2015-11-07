/**
 * This file is part of "MPS Setagaya Pacman."
 *
 * MPS Setagaya Pacman is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MPS Setagaya Pacman is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 *
 * (c) Junya Kaneko <jyuneko@hotmail.com>
 */

/**
 * Created by Junya Kaneko on 10/23/15.
 * Authors: Yoshida Kurima, Junya Kaneko
 */

var Akabei = function (cx, cy, speed) {
    this.position = [cx, cy];
    this.movingDirection = [0, 0];
    this.speed = speed;
};

Akabei.prototype = {
    getCx : function() {
        return this.position[0];
    },

    getCy: function () {
        return this.position[1];
    },

    getSpeed: function() {
        return this.speed;
    },

    move: function(pacman) {
        this.movingDirection[0] = this.movingDirection[1] = 0;
        var i = Math.floor(2 * Math.random());
        if (pacman.getPosition(i) - this.position[i] != 0) {
            this.movingDirection[i] = (pacman.getPosition(i) - this.position[i]) / Math.abs(pacman.getPosition(i) - this.position[i]);
            this.position[i] += this.getSpeed() * this.movingDirection[i];
        }
    },

    draw: function (ctx) {
        cx = this.getCx();
        cy = this.getCy();
        RADIUS = 10;
        BODY_H = RADIUS;
        LEG_H = RADIUS / 5 * 2;
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.moveTo(cx - RADIUS, cy);
        ctx.arc(cx, cy, RADIUS, Math.PI, 2 * Math.PI);
        ctx.lineTo(cx + RADIUS, cy + BODY_H);
        ctx.lineTo(cx + RADIUS / 3 * 2, cy + BODY_H - LEG_H);
        ctx.lineTo(cx + RADIUS / 3, cy + BODY_H);
        ctx.lineTo(cx, cy + BODY_H - LEG_H);
        ctx.lineTo(cx - RADIUS / 3, cy + BODY_H);
        ctx.lineTo(cx - RADIUS / 3 * 2, cy + BODY_H - LEG_H);
        ctx.lineTo(cx - RADIUS, cy + BODY_H);
        ctx.lineTo(cx - RADIUS, cy);
        ctx.fill();
        //ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx - 20 * RADIUS / 50, cy - 4, 16 * RADIUS / 50, 0, Math.PI * 2);
        ctx.arc(cx + 20 * RADIUS / 50, cy - 4, 16 * RADIUS / 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0000FF';
        ctx.beginPath();
        ctx.arc(cx + (- 20 - 8) * RADIUS / 50 , cy - 4 * RADIUS / 50, 7 * RADIUS / 50, 0, Math.PI * 2);
        ctx.arc(cx + (20 - 8) * RADIUS / 50, cy - 4 * RADIUS / 50, 7 * RADIUS / 50, 0, Math.PI * 2);
        ctx.fill();
    }
};