import Phaser from "phaser"
export class CreditsScene extends Phaser.Scene{
    constructor(){
        super('CreditsScene')
    }
    
     preload(){
        this.load.image('bkg', '../assets/bkg.jpg');
        this.load.image('title', '../assets/SG.png');
    }
     create(){
        this.add.image(400, 200, 'title')
        this.add.text(300,280,'You scored - ')
        this.add.text(300, 310, 'You reached Level - ');
        this.add.text(230,580,'Game designed and written by The DareDevs');
        this.add.text(300,350,'Press SPACE to start!')

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