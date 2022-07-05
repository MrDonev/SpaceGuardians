import Phaser from 'phaser';
export class PauseScene extends Phaser.Scene {
  constructor() {
    super('PauseScene');

  }

  init(data) {
    this.score = data.score;
    this.level = data.level;
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
    this.add.text(300, 280, `Current Score - ${this.score}`, {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#fff',
      align: 'center'
    });
    this.add.text(300, 310, `Current Level - ${this.level}`, {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#fff',
      align: 'center'
    });
    this.add.text(300, 350, 'Press SHIFT to continue!', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#fff',
      align: 'center'
    });
  }
  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if(cursors.shift.isDown){
        this.scene.pause();
        this.scene.resume("GameScene");
        }
  }
}