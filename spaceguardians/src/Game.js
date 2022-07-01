import Phaser from 'phaser'
import GameScene from './Scenes/GameScene.js'
import TitleScene from './Scenes/TitleScene.js'
import { CreditsScene } from './Scenes/CreditsScene.js'
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
        arcade: {
          // gravity: { y: 200 }
        }
      },
      audio: {
        disableWebAudio: true
      },
      scene: [TitleScene,GameScene,CreditsScene]
    }
setTimeout(()=>{if(document.getElementById('game')!==null){
  const game = new Phaser.Game(config)
  
}},500)
}

export default GameComponent