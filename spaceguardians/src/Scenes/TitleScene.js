import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('titleScene');
    this.modeSelected=false;
  }
  preload() {
    this.load.image('bkg', '../assets/bkg.jpg');
    this.load.image('title', '../assets/SG.png');
  }
  create() {
    this.add.image(0, 0, 'bkg').setScale(3);
    this.add.image(400, 200, 'title');
    this.add.text(250,350,'Press SPACE to start!')
    this.add.text(50,570,'Created by: The DareDevs')
  }
  update(){
    let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    const cursors=this.input.keyboard.createCursorKeys();
    if(keySPACE.isDown && !this.modeSelected){
        this.add.text(250,400,'GET READY')
        this.modeSelected=true;
        this.scene.start('gameScene')
    } 
   
  }
}

export default TitleScene;
