import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.modeSelected=false;
    this.timer = 0;
    this.text = ""
  }
  preload() {
    this.load.image('title', '../assets/SG.png');
    this.load.audio('levelEnd', ['../assets/level.wav']);
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    head.appendChild(link);
  }
  create() {
    this.add.image(400, 150, 'title');
    this.levelEnd = this.sound.add('levelEnd', { loop: false });

    
    this.text = this.add.text(200,300,'Press SPACE to start!', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })
    this.add.text(70,400,'Lateral Ship Movements - left/right', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })
    this.add.text(180,430,'Fire weapon - SpaceBar', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })
    this.add.text(200,460,'Pause Game - Shift', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })
    this.add.text(180,490,'Toggle Full Screen - F', {
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

    this.levelEnd.play()

  }
  update(time){
    let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if(keySPACE.isDown && !this.modeSelected){
        this.add.text(250,400,'GET READY')
        this.modeSelected=true;
        this.scene.start('GameScene')
    } 
   this.timer+= time.elapsed;
   if (this.timer >= 1000) {
    this.text.active = !this.text.active
   }
  }
}

export default TitleScene;
