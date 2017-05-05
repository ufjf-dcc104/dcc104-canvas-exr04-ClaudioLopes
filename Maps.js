function Maps(){
  this.maps = 6;
  this.sprites = [];
}

Maps.prototype.init = function () {
  for (var i = 0; i < this.maps; i++) {
    var map = new Sprite();
    map.x = 50 + (10*i*20);
    map.y = 400;
    map.width = 50;
    map.height = 90;
    map.imgkey = "enemy";
    map.color = "black";
    this.sprites.push(map);
  }
};

Maps.prototype.desenha = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenhar(ctx);
    }
};

Maps.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiuCom(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};

Maps.prototype.colidiuComEnemy = function(enemy){
  for(var i = enemy.sprites.length-1; i>=0; i--){

    this.colidiuCom(enemy.sprites[i],
      (
        function(that)
        {
          return function(alvo){
            alvo.color = "green";
            that.sprites.splice(i,1);
            x = that.sprites.indexOf(alvo);
            that.sprites.splice(x, 1);
          }
        }
      )(this));
  }
};
