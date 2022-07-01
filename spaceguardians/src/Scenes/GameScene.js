import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
    this.player = null;
    this.aliens = null;
    this.starfield = null;
    this.blueInvader = {};
    this.redInvader = {};
    this.yellowInvader = {};
    this.strongestInvader = {};
    this.score = 0;
    this.lastBlueInvaderLength = 30;
    this.lastyellowInvaderLength = 8;
    this.lastRedInvaderLength = 6;
    this.lastStrongInvaderLength = 2;
    this.started = false;
    this.level=1;
  }
  preload() {
    this.load.image('starfield', '../assets/bkg.jpg');
    this.load.image('player', '../assets/player.png');
    this.load.image('blueInvader', '../assets/blueEnemy.png');
    this.load.image('blueYellowInvader', '../assets/blueYellowEnemy.png');
    this.load.image('redBlueInvader', '../assets/redBlueEnemy.png');
    this.load.image('strongestInvader', '../assets/strongestEnemy.png');
    this.load.image('bullet', '../assets/bullet.png');
    this.load.audio('shoot', ['../assets/shoot.wav'])
    this.load.audio('death', ['../assets/death.wav'])
    this.load.audio('tune', ['../assets/music.mp3'])
    this.load.audio('levelEnd', ['../assets/level.wav'])
  }
  create() {
    this.physics.world.setBounds(0, 0, 800, 600);
    this.starfield = this.add.image(0, 0, 'starfield').setScale(3);
    this.player = this.physics.add.image(400, 530, 'player');
    this.scoreTable = this.add.text(20, 20, `Score : ${this.score}`);
    this.levelTable = this.add.text(710,20,`Level : ${this.level}`)
    this.player.setCollideWorldBounds(true);
    // creating the bullet
    this.lastFired = null;
    var Bullet = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,
      initialize: function Bullet(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(400, 1);
      },
      fire: function (x, y) {
        this.setPosition(x, y - 50);
        this.setActive(true);
        this.setVisible(true);
      },
      update: function (time, delta) {
        this.y -= this.speed * delta;
        if (this.y < -50) {
          this.setActive(false);
          this.setVisible(false);
        }
      },
    });
    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 1,
      runChildUpdate: true,
    });


    //adding the sounds
    this.fire = this.sound.add('shoot', {loop: false});
    this.death = this.sound.add('death', {loop: false});
    this.music = this.sound.add('tune', 0.7, {loop: true});
    this.levelEnd = this.sound.add('levelEnd', {loop: false});

    //creating the aliens
    this.aliens = this.add.group();
    this.container = this.add.container(0, 0);
    this.createAliens();

    //play the music
    this.music.play();
    
    
  }

  createAliens() {
    let blueInvaderCounter = 0;
    let yellowInvaderCounter = 0;
    let redInvaderCounter = 0;
    let strongestInvaderCounter = 0;
    for (let y = 4; y < 7; y++) {
      for (let x = 4; x < 14; x++) {
        ++blueInvaderCounter;
        this.blueInvader[`blueInvader-${blueInvaderCounter}`] =
          this.aliens.create(x * 48, y * 35, 'blueInvader');
        this.blueInvader[`blueInvader-${blueInvaderCounter}`] =
          this.physics.add.existing(
            this.blueInvader[`blueInvader-${blueInvaderCounter}`],
            0
          );
        this.blueInvader[
          `blueInvader-${blueInvaderCounter}`
        ].id = `blueInvader-${blueInvaderCounter}`;
        this.physics.add.collider(
          this.bullets,
          this.blueInvader[`blueInvader-${blueInvaderCounter}`],
          this.destroySprites,
          this.world
        );
      }
    }
    for (let y = 3; y < 4; y++) {
      for (let x = 5; x < 13; x++) {
        ++yellowInvaderCounter;
        this.yellowInvader[`yellowInvader-${yellowInvaderCounter}`] =
          this.aliens.create(x * 48, y * 35, 'blueYellowInvader');
        this.yellowInvader[`yellowInvader-${yellowInvaderCounter}`] =
          this.physics.add.existing(
            this.yellowInvader[`yellowInvader-${yellowInvaderCounter}`],
            0
          );
        this.yellowInvader[
          `yellowInvader-${yellowInvaderCounter}`
        ].id = `yellowInvader-${yellowInvaderCounter}`;
        this.physics.add.collider(
          this.bullets,
          this.yellowInvader[`yellowInvader-${yellowInvaderCounter}`],
          this.destroySprites,
          this.world
        );
      }
    }
    for (let y = 2; y < 3; y++) {
      for (let x = 6; x <= 11; x++) {
        ++redInvaderCounter;
        this.redInvader[`redInvader-${redInvaderCounter}`] = this.aliens.create(
          x * 48,
          y * 35,
          'redBlueInvader'
        );
        this.redInvader[`redInvader-${redInvaderCounter}`] =
          this.physics.add.existing(
            this.redInvader[`redInvader-${redInvaderCounter}`],
            0
          );
        this.redInvader[
          `redInvader-${redInvaderCounter}`
        ].id = `redInvader-${redInvaderCounter}`;
        this.physics.add.collider(
          this.bullets,
          this.redInvader[`redInvader-${redInvaderCounter}`],
          this.destroySprites,
          this.world
        );
      }
    }
    for (let y = 1; y < 2; y++) {
      for (let x = 7; x <= 10; x++) {
        if (x === 7 || x === 10) {
          ++strongestInvaderCounter;
          this.strongestInvader[`strongestInvader-${strongestInvaderCounter}`] = this.aliens.create(
            x * 48,
            y * 35,
            'strongestInvader'
          );
          this.strongestInvader[`strongestInvader-${strongestInvaderCounter}`] =
            this.physics.add.existing(
              this.strongestInvader[
                `strongestInvader-${strongestInvaderCounter}`
              ],
              0
            );
          this.strongestInvader[
            `strongestInvader-${strongestInvaderCounter}`
          ].id = `strongestInvader-${strongestInvaderCounter}`;
          this.physics.add.collider(
            this.bullets,
            this.strongestInvader[
              `strongestInvader-${strongestInvaderCounter}`
            ],
            this.destroySprites,
            this.world
          );
        }
      }
    }
    this.container.add(this.aliens.children.entries);

    var destX = -10;

    var tween = this.tweens.add({
      targets: this.container,
      duration: 6000,
      yoyo: true,
      repeat: -1,
      x: {
        getEnd: function (target, key, value) {
          return destX - 155;
        },
        getStart: function (target, key, value) {
          return destX + 155;
        },
      },
    });
  }

  destroySprites(invader, bullet) {
    invader.destroy();
    bullet.destroy();
  }

  shootWeapon() {
    this.fire.play();
  }

  dieAlien() {
    this.death.play();
  }

  levelEnding() {
    this.levelEnd.play();
  }
  update(time, delta) {
    let blueLength = Object.keys(this.blueInvader).length;
    let yellowLength = Object.keys(this.yellowInvader).length;
    let redLength = Object.keys(this.redInvader).length;
    let strongestLength = Object.keys(this.strongestInvader).length;

    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.x -= 3;
      this.started = true;
    }
    if (cursors.right.isDown) {
      this.player.x += 3;
      this.started = true;
    }
    if (cursors.space.isDown) {
      this.started = true;
      var bullet = this.bullets.get();
      if (bullet) {
        bullet.fire(this.player.x, this.player.y);
        this.shootWeapon();
        this.lastFired = time + 50;
      }
    }
    if (this.started) {
      Object.keys(this.blueInvader).forEach((invader) => {
        if (
          this.blueInvader[invader] !== undefined &&
          this.blueInvader[invader].active === false
        ) {
          delete this.blueInvader[invader];
          this.dieAlien()
        }
      });
      Object.keys(this.yellowInvader).forEach((invader) => {
        if (
          this.yellowInvader[invader] !== undefined &&
          this.yellowInvader[invader].active === false
        ) {
          delete this.yellowInvader[invader];
          this.dieAlien()

        }
      });
      Object.keys(this.redInvader).forEach((invader) => {
        if (
          this.redInvader[invader] !== undefined &&
          this.redInvader[invader].active === false
        ) {
          delete this.redInvader[invader];
          this.dieAlien()
        }
      });
      Object.keys(this.strongestInvader).forEach((invader) => {
        if (
          this.strongestInvader[invader] !== undefined &&
          this.strongestInvader[invader].active === false
        ) {
          delete this.strongestInvader[invader];
          this.dieAlien()
        }
      });
    }
    if (blueLength < this.lastBlueInvaderLength) {
      this.score += (this.lastBlueInvaderLength - blueLength) * 20;
      this.lastBlueInvaderLength = blueLength;
      this.scoreTable.setText(`Score: ${this.score}`);
    }
    if (yellowLength < this.lastyellowInvaderLength) {
      this.score += (this.lastyellowInvaderLength - yellowLength) * 40;
      this.lastyellowInvaderLength = yellowLength;
      this.scoreTable.setText(`Score: ${this.score}`);
    }
    if (redLength < this.lastRedInvaderLength) {
      this.score += (this.lastRedInvaderLength - redLength) * 80;
      this.lastRedInvaderLength = redLength;
      this.scoreTable.setText(`Score: ${this.score}`);
    }
    if (strongestLength < this.lastStrongInvaderLength) {
      this.score += (this.lastStrongInvaderLength - strongestLength) * 160;
      this.lastStrongInvaderLength = strongestLength;
      this.scoreTable.setText(`Score: ${this.score}`);
    }
    if (blueLength+redLength+yellowLength+strongestLength === 0) {
      this.level++;
      this.levelTable.setText(`Level: ${this.level}`);
      this.lastBlueInvaderLength=30;
      this.lastyellowInvaderLength=8;
      this.lastRedInvaderLength=6;
      this.lastStrongInvaderLength=2;
      this.levelEnding();
      setTimeout(this.createAliens(),2000)
    }
  }
}
export default GameScene;
