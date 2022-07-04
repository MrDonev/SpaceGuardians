import Phaser from "phaser"
export class CreditsScene extends Phaser.Scene{
    constructor(){
        super('CreditsScene')
    }
    
     preload(){

    }
     create(){
        this.add.text(350,280,'Crediiiiiiits')
    }
     update(){

    }
}