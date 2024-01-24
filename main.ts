controller.player2.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    players = 2
    controller.player2.moveSprite(player2, 0, 100)
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    players = 2
    controller.player2.moveSprite(player2, 0, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.vx = -1.1 * otherSprite.vx
    otherSprite.vy = 1.1 * otherSprite.vy
    music.playTone(494, music.beat(BeatFraction.Half))
})
let player2: Sprite = null
let players = 0
players = 1
let picture = image.create(scene.screenWidth(), scene.screenHeight())
for (let index = 0; index <= scene.screenHeight(); index++) {
    if (index % 6 < 4) {
        picture.setPixel(scene.screenWidth() / 2, index, 1)
    }
}
scene.setBackgroundImage(picture)
let player1 = sprites.create(img`
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    `, SpriteKind.Player)
player1.setPosition(8, 60)
controller.moveSprite(player1, 0, 100)
player1.setFlag(SpriteFlag.StayInScreen, true)
player2 = sprites.create(img`
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    `, SpriteKind.Player)
player2.setPosition(152, 60)
player2.setFlag(SpriteFlag.StayInScreen, true)
let projectile = sprites.createProjectileFromSprite(img`
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    1 1 1 1 
    `, player1, randint(50, 75), randint(25, 50))
projectile.x += 3
projectile.setFlag(SpriteFlag.BounceOnWall, true)
projectile.setFlag(SpriteFlag.ShowPhysics, false)
info.player1.setScore(0)
info.player2.setScore(0)
game.onUpdate(function () {
    if (projectile.x > player2.right) {
        info.player1.changeScoreBy(1)
        music.jumpUp.play()
        projectile.setPosition(player1.x + 3, player1.y)
        projectile.setVelocity(randint(50, 75), randint(25, 50))
    } else if (projectile.x < player1.left) {
        info.player2.changeScoreBy(1)
        music.jumpDown.play()
        projectile.setPosition(player2.x - 3, player2.y)
        projectile.setVelocity(randint(-75, -50), randint(25, 50))
    }
})
game.onUpdate(function () {
    if (projectile.x > scene.screenWidth() / 2 && players == 1) {
        if (projectile.y > player2.y) {
            player2.y += 2
        } else {
            player2.y += -2
        }
    }
})
