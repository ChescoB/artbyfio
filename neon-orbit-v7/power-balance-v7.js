(function(){
'use strict';
var previousResetRun=resetRun;
var previousActivatePower=activatePower;
var previousUpdateGame=updateGame;

function weightedPowerType(){
  var pool=[];
  function add(type,weight){for(var i=0;i<weight;i++)pool.push(type)}
  var lowEnergy=STATE.energy<STATE.maxEnergy*.42;
  var critical=STATE.energy<STATE.maxEnergy*.26||STATE.lives<=1;
  add('heal',lowEnergy?18:7);
  add('shield',STATE.shield?5:12);
  add('magnet',9);
  add('slow',7);
  add('overdrive',7);
  add('nova',STATE.nova<55?9:4);
  if((STATE.drones||0)<3)add('drone',5);
  add('blackhole',4);
  add('clone',4);
  add('starforge',3);
  add('phase',3);
  if(STATE.lives<5)add('life',critical?3:1);
  return pool[Math.floor(Math.random()*pool.length)]||'heal';
}

resetRun=function(){
  previousResetRun();
  STATE.powerTimer=11+Math.random()*5;
  STATE.powerCooldown=0;
  STATE.timeSincePower=0;
  STATE.powerDrops=0;
};

spawnPower=function(){
  if(STATE.boss||STATE.bossPending||STATE.transition||powers.length>=1)return;
  var emergency=STATE.energy<STATE.maxEnergy*.26||STATE.lives<=1;
  var pityReady=(STATE.timeSincePower||0)>=38;
  if((STATE.powerCooldown||0)>0&&!emergency&&!pityReady)return;
  var type=weightedPowerType();
  powers.push({x:38+Math.random()*(STATE.w-76),y:-36,r:15,t:0,type:type});
  STATE.powerDrops=(STATE.powerDrops||0)+1;
  STATE.timeSincePower=0;
};

activatePower=function(type,x,y){
  previousActivatePower(type,x,y);
  var permanent=type==='drone'||type==='life';
  var major=type==='blackhole'||type==='clone'||type==='starforge'||type==='phase';
  STATE.powerCooldown=permanent?26:major?22:17;
  STATE.timeSincePower=0;
};

updateGame=function(dt){
  STATE.powerCooldown=Math.max(0,(STATE.powerCooldown||0)-dt);
  STATE.timeSincePower=Math.min(60,(STATE.timeSincePower||0)+dt);
  var before=powers.length;
  previousUpdateGame(dt);
  if(powers.length>before){
    var progressionDelay=Math.min(6,Math.max(0,STATE.wave-1)*.45);
    STATE.powerTimer=18+progressionDelay+Math.random()*7;
  }
};
})();
