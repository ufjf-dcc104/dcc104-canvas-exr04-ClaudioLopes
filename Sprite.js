function Sprite(){
  this.x = 570;
  this.y = 420;
  this.width = 50;
  this.height = 50;
  this.color = "blue";
  this.angle = 270;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.g = 10;
  this.am = 0;
  this.cooldown = 0;
}

Sprite.prototype.desenha = function(ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(-this.width/2, -this.height/2);
  ctx.lineTo(-this.width/2, +this.height/2);
  ctx.lineTo(+this.width/2, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.restore();
};

Sprite.prototype.desenhar = function(ctx){
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,this.width,this.height);
  ctx.strokeRect(this.x,this.y,this.width,this.height);
};

Sprite.prototype.mover = function(dt){
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt + this.angle;
  this.y = this.y + this.vy*dt;
};

Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x+this.width < alvo.x) return false;
  if(this.x > alvo.x+this.width) return false;
  if(this.y+this.height < alvo.y) return false;
  if(this.y > alvo.y+this.height) return false;
  return true;
};

Sprite.prototype.moverAng = function (dt) {
  this.angle = this.angle;
  this.ax = this.am*Math.cos(Math.PI*this.angle/180);
  this.ay = this.am*Math.sin(Math.PI*this.angle/180);
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  if(this.cooldown>0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};

Sprite.prototype.moverGun = function(dt){
  this.angle = this.angle;
  this.ax = this.am*Math.cos(Math.PI*this.angle/180);
  this.ay = this.am*Math.sin(Math.PI*this.angle/180);
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + this.ay*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
};
