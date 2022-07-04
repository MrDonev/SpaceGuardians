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
    this.add.text(20,20,'Hi-Score:10249102 Jomit')
    this.add.text(250,350,'1 Player')
    this.add.text(250,370,'2 Player')
    this.add.text(50,570,'Created by: The DareDevs')
  }
  update(){
    let key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    let key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    const cursors=this.input.keyboard.createCursorKeys();
    if(key1.isDown && !this.modeSelected){
        this.add.text(250,400,'1 player mode selected')
        this.modeSelected=true;
        this.scene.start('gameScene')
    } 
     if(key2.isDown && !this.modeSelected){
        this.add.text(250,400,'2 player mode selected')
        this.modeSelected=true;
        this.scene.start('gameScene')
    }
  }
}

export default TitleScene;
