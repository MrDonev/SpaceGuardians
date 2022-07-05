import Phaser from 'phaser'
import GameScene from './Scenes/GameScene.js'
import TitleScene from './Scenes/TitleScene.js'
import {PauseScene} from './Scenes/PauseScene.js'
import {CreditsScene}  from './Scenes/CreditsScene.js'
const GameComponent =()=>{
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent:'game',
      render: {
        antialiasGL: false,
        pixelArt: true,
      },
      physics: {
        default: 'arcade',
        debug:true,
        arcade: {
          // gravity: { y: 200 }
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