import Phaser from 'phaser'
import GameScene from './Scenes/GameScene.js'
import TitleScene from './Scenes/TitleScene.js'
import {PauseScene} from './Scenes/PauseScene.js'
import {CreditsScene}  from './Scenes/CreditsScene.js'
const GameComponent =()=>{
    const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
      physics: {
        default: 'arcade',
        debug:true,
        arcade: {
          gravity: { y: 0.07 }
        }
      },
      audio: {
        disableWebAudio: true
      },
      scene: [TitleScene,GameScene,CreditsScene, PauseScene]
    }
setTimeout(()=>{if(document.getElementById('game')!==null){
  const game = new Phaser.Game(config)
  
}},500)
}

export default GameComponent