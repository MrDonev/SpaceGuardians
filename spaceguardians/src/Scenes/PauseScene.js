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
  }

  create() {
    this.add.image(400, 200, 'title');
    this.add.text(300, 280, `Current Score - ${this.score}`, {
      fontFamily: '\'Sorts Mill Goudy\', serif',
      fontSize: 20,
      color: '#fff',
      align: 'center'
    });
    this.add.text(300, 310, `Current Level - ${this.level}`, {
      fontFamily: '\'Sorts Mill Goudy\', serif',
      fontSize: 20,
      color: '#fff',
      align: 'center'
    });
    this.add.text(300, 350, 'Press SHIFT to continue!', {
      fontFamily: '\'Sorts Mill Goudy\', serif',
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