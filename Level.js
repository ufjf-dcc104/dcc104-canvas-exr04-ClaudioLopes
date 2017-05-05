function Level (){
  this.sprites = [];
  this.inimigos = 3;
  this.shots = [];
}

Level.prototype.init = function () {
  for (var i = 0; i < this.inimigos; i++) {
    var inimigo = new Sprite();
    var r = Math.random()*1000;
    if(i%2 == 0){
      inimigo.angle = -r/1000;
    }else {
        inimigo.angle = r/1000;
    }
    inimigo.x = r;
    inimigo.y = 10;
    inimigo.width = 15;
    inimigo.height = 15;
    inimigo.color = "red";
    this.sprites.push(inimigo);
  }
};

Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenhar(ctx);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenhar(ctx);
    }
};

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].mover(dt);
    }
    for (var i = this.shots.length-1; i >= 0; i--) {
      this.shots[i].moverAng(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }
};

Level.prototype.fire = function (alvo){
  if(alvo.cooldown>0) return;
  var tiro = new Sprite();
  tiro.x = alvo.x;
  tiro.y = alvo.y;
  tiro.angle = alvo.angle;
  tiro.am = 100;
  tiro.width = 8;
  tiro.height = 16;
  this.shots.push(tiro);
  alvo.cooldown = 1;
};

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiuCom(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};

Level.prototype.colidiuComTiros = function(){
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],
      (
        function(that)
        {
          return function(alvo){
            alvo.color = "green";
            that.shots.splice(i,1);
            x = that.sprites.indexOf(alvo);
            that.sprites.splice(x, 1);
          }
        }
      )(this));
  }
};
