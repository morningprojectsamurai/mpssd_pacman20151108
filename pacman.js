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
 * Authors: Junya Kaneko
 */

// パックマンのコンストラクタを定義。
// パックマンは、半径、速度、移動方向、口の開き具合、口パクの速度、初期タイルの位置を属性として持つ。
var Pacman = function (radius, speed, theta, map, row, col) {
    // タイルベースの移動に必要な情報
    this.map = map;

    var rect = this.map.getTilePosition(row, col);

    // ピクセルベースの移動の描画に必要な情報
    this.radius = radius;
    this.position = {
        'x': Math.floor(rect.left + this.map.getTileWidth() / 2),
        'y': Math.floor(rect.top + this.map.getTileHeight() / 2)
    };
    this.movingDirection = {'x': 0, 'y': 0};
    this.speed = speed;
    this.theta = theta;
    this.dTheta = 3;
};


// パックマンのメソッドを定義。
// 今のところ、メソッドはコンストラクタの持つ prototype オブジェクトのメソッドとして
// 定義すると覚える。
Pacman.prototype = {
    getCx: function () {
        return this.position.x;
    },

    getCy: function () {
        return this.position.y;
    },

    getRadius: function () {
        return this.radius;
    },

    getLeft: function () {
        return this.getCx() - this.getRadius();
    },

    getTop: function () {
        return this.getCy() - this.getRadius();
    },

    getRight: function () {
        return this.getCx() + this.getRadius();
    },

    getBottom: function() {
        return this.getCy() + this.getRadius();
    },

    getSpeed: function () {
        return this.speed;
    },

    getTheta: function () {
        return this.theta;
    },

    goLeft: function () {
        this.movingDirection = {'x': -1, 'y': 0};
    },

    goRight: function () {
        this.movingDirection = {'x': 1, 'y': 0};
    },

    goUp: function () {
        this.movingDirection = {'x': 0, 'y': -1};
    },

    goDown: function () {
        this.movingDirection = {'x': 0, 'y': 1};
    },

    isInWall: function() {
        return this.map.isWall(this.getLeft(), this.getTop()) ||
            this.map.isWall(this.getLeft(), this.getBottom()) ||
            this.map.isWall(this.getRight(), this.getTop()) ||
            this.map.isWall(this.getRight(), this.getBottom())
    },

    move: function (duration) {
        this.chew();

        var previous_pos_x = this.position.x;
        var previous_pos_y = this.position.y;

        this.position.x += (this.movingDirection.x * duration * this.getSpeed() / 1000);

        if (this.isInWall()) {
            this.position.x = previous_pos_x;
        }

        this.position.y += (this.movingDirection.y * duration * this.getSpeed() / 1000);

        if (this.isInWall()) {
            this.position.y = previous_pos_y;
        }
    },

    chew: function () {
        if (this.theta >= 30 || this.theta <= 0) {
            this.dTheta *= -1;
        }
        this.theta += this.dTheta;
        return this.theta;
    },

    draw: function (ctx) {
        ctx.strokeStyle = "#FF0000";
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(this.getCx(), this.getCy(), this.radius, this.getTheta() * Math.PI / 180, (360 - this.getTheta()) * Math.PI / 180);
        ctx.lineTo(this.getCx(), this.getCy());
        ctx.lineTo(this.getCx() + this.radius * Math.cos(this.getTheta() * Math.PI / 180), this.position[1] + this.radius * Math.sin(this.getTheta() * Math.PI / 180));
        ctx.fill();
    }
};