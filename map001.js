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


/**
 * マップのコンストラクタ
 * 0: 壁
 * 1: 通路
 */
var Map = function (startX, startY, tileWidth, tileHeight, wallFillStyle) {
    // キャンパス上での描画開始位置
    this.startX = startX;
    this.startY = startY;

    // タイルの大きさ
    this.tileWidth = tileWidth;
    this.tileheight = tileHeight;

    this.wallFillStyle=  wallFillStyle; // タイルの塗りつぶし方法

    // マップ
    this.map = [
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0,1,1,0],
        [0,1,0,1,1,1,1,1,1,1,0,0],
        [0,1,1,1,0,1,0,1,0,1,0,0],
        [0,1,0,1,0,1,0,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,0,0,1,0],
        [0,1,0,0,1,0,0,1,0,0,1,0],
        [0,1,1,1,1,0,0,1,1,1,1,0],
        [0,1,0,0,1,0,0,1,0,1,0,0],
        [0,1,1,1,1,1,1,1,0,1,0,0],
        [0,0,1,0,0,1,0,1,0,1,0,0],
        [0,0,1,0,0,1,0,1,0,1,0,0],
        [0,0,1,1,1,1,1,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0]
    ];
};

Map.prototype = {
    // タイルの行数
    getRowLength: function() {
        return this.map.length;
    },

    // タイルの列数
    getColLength: function() {
        return this.map[0].length;
    },

    // タイルの幅
    getTileWidth : function() {
        return this.tileWidth;
    },

    // タイルの高さ
    getTileHeight : function() {
        return this.tileheight;
    },

    // ピクセルで表される座標の点(x, y)が含まれるタイルを返す
    getTile : function(x, y) {
        var col = Math.floor((x - this.startX) / this.getTileWidth());
        var row = Math.floor((y - this.startY) / this.getTileHeight());
        return {'row': row, 'col': col, 'kind': this.map[row][col]};
    },

    // row行col列目のタイルのピクセルで表される座標の左上の点(x, y)を返す
    getTilePosition : function(row, col) {
        return {'left': this.startX + col * this.getTileWidth(), 'top': this.startY + row * this.getTileHeight()};
    },

    // ピクセルで表される座標の点(x, y)が壁のタイルであれば true を返す。
    isWall : function(x, y) {
        var tile = this.getTile(x, y);
        return tile.kind == 0;
    },

    // 壁の描画
    drawWall : function(ctx, row, col) {
        ctx.fillStyle = this.wallFillStyle;
        ctx.rect(this.startX + col * this.getTileWidth(), this.startY + row * this.getTileHeight(),
            this.getTileWidth(), this.getTileHeight());
        ctx.fill();
    },

    // クッキーの描画
    drawCookie : function(ctx, i, j) {

    },

    // マップを描画
    draw : function(ctx) {
        ctx.beginPath();
        for(var j = 0; j < this.getRowLength(); j++) {
            for( var i = 0; i < this.getColLength(); i++) {
                if(this.map[j][i] == 0) {
                    this.drawWall(ctx, j, i);
                } else if (this.map[j][i] == 2 ){
                    this.drawCookie(ctx, j, i);
                }
            }
        }
    }
};
