import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.modeSelected=false;
  }
  preload() {
    this.load.image('title', '../assets/SG.png');

    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    head.appendChild(link);
  }
  create() {
    this.add.image(400, 200, 'title');
    this.add.text(200,370,'Press SPACE to start!', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })
    this.add.text(230,570,'The DareDevs', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 30,
      color: '#ff0000',
      align: 'center'
    })
  }
  update(){
    let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if(keySPACE.isDown && !this.modeSelected){
        this.add.text(250,400,'GET READY')
        this.modeSelected=true;
        this.scene.start('GameScene')
    } 
   
  }
}

export default TitleScene;
