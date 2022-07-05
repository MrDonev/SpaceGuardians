import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.modeSelected=false;
  }
  preload() {
    this.load.image('bkg', '../assets/bkg.jpg');
    this.load.image('title', '../assets/SG.png');
  }
  create() {
    this.add.image(0, 0, 'bkg').setScale(3);
    this.add.image(400, 200, 'title');
    this.add.text(300,350,'Press SPACE to start!', {
      fontFamily: '\'Sorts Mill Goudy\', serif',
      fontSize: 20,
      color: '#fff',
      align: 'center'
    })
    this.add.text(300,570,'The DareDevs', {
      fontFamily: '\'Sorts Mill Goudy\', serif',
      fontSize: 20,
      color: '#fff',
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
