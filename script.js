var canvas = document.getElementById('canvas') // 캔버스 요소 불러오기
var ctx = canvas.getContext('2d')

canvas.width = innerWidth // 캔버스 가로 크기
canvas.height = innerHeight

var Lwalk = new Image()
var Rwalk = new Image()
var stand = new Image()
var prison1 = new Image()
var standOrder = 0
var aOrder = 0
var dOrder = 0

var A = false
var D = false

var intro = true
var falling = true

var flex = document.getElementById('flex')
var flex1 = document.getElementById('flex1')
var flex2 = document.getElementById('flex2')
var T = false
var TF = document.getElementById('TF')
var TeO = -1
var TText = ['-당신은 어느 침대 위에 누워 있다. 아무래도 교도소의 독방인 것 같다.', '???: 어이, 수감자 741171109897101! 일어나!', '당신: ...? 누구세요..?', '???: 넌 이곳 군침이 싹도는 수감소 제1교도소에 수감된 죄수번호 741171109897101이다.', '???: 아직 잘 모르는것 같으니 네 이름과 전과를 얘기해주지.', '그래.. 전과는 탈옥 13번, 수감 20번, 연쇄살인 5번.. 정말 끔찍하군.', '???: ...내 이름이 궁금하나?', '???: 난 드류. 이 수용소의 소장이지. 여긴 인간 말종들을 모아놓은 곳이다. 너도 빠져나갈 생각은 하지 않는게 좋을거야.', '-독방 바깥에서 무언가 무너지는 소리가 났다.', '당신: 어이, 뭔가 일이 생긴 것 같은데?', '드류: 넌 닥치고, 어이! 거기 무슨 일이야?', '-으아악! 살인마가 독방을 탈출했다!', '-드류가 면회실 밖으로 급하게 뛰쳐나갔다. 그리고 당신의 눈엔 그가 변기에 빠트린 열쇠 한 개가 보였다.']
var Chapters = ['tutorial', '1', '2']
Lwalk.src = '/sprites/walking/left.png'
Rwalk.src = '/sprites/walking/right.png'
stand.src = '/sprites/stand.png'
prison1.src = '/sprites/prison1.png'

var jumping = false

class Junbae {
    constructor() {
        this.start = false
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.frames = 1
        this.gravity = 0.3
        this.movement = false
        this.drawing = false
        if(this.start == false) {
            this.movement = false
        } else if(this.start == true) {
            this.movement = true
        }
    }
    
    update() {
        if(this.start == true) {
            this.movement = true
        }
        ctx.imageSmoothingEnabled = false
        if(this.movement == true) {
            this.draw()
        }
        this.frames++
        this.position.y += this.velocity.y

        if(this.position.x + 150 + this.velocity.x >= canvas.width) {
            this.velocity.x = 0
        } else {
            this.position.x += this.velocity.x
        }

        if(this.position.y + 160 + this.velocity.y <= canvas.height) {
            this.velocity.y += this.gravity
            falling = true
        } else {
            this.velocity.y = 0
            jumping = false
            falling = false
        }
        if(this.frames > 3) {
            this.frames = 0
        }
    }
    
    draw() {
        this.drawing == true
        ctx.beginPath()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(prison1, 0, 0, 800, 500, 0, 0, innerWidth, innerHeight)
        if(A == true) {
            ctx.drawImage(Rwalk, 32 * aOrder, 0, 32, 32, this.position.x, this.position.y, 160, 160)
        } else if(D == true) {
            ctx.drawImage(Lwalk, 32 * dOrder, 0, 32, 32, this.position.x, this.position.y, 160, 160)
        } else {
            ctx.drawImage(stand, 32 * standOrder, 0, 32, 32, this.position.x, this.position.y, 160, 160)
        }
        ctx.closePath()
    }
}

setInterval(() => {
    if(junbae.movement == true) {
        if(A == true) {
            standOrder = 0
            dOrder = 0
            if(aOrder == 3) {
                aOrder = 0
            } else {
                aOrder++
            }
        } else if(D == true) {
            standOrder = 0
            aOrder = 0
            if(dOrder == 3) {
                dOrder = 0
            } else {
                dOrder++
            }
        } else {
            aOrder = 0
            dOrder = 0
        }
    }
},300)
setInterval(() => {
    if(junbae.movement == true) {
        if(A == true) {
            standOrder = 0
        } else if(D == true) {
            standOrder = 0
        } else {
            if(standOrder == 1) {
                standOrder = 0
            } else {
                standOrder++
            }
        }
    }
}, 500)

var junbae = new Junbae()

function animate() {
    requestAnimationFrame(animate)
    junbae.update()
}

document.getElementById('startBtn').addEventListener('click', (e) => {
    flex.style.display = 'none'
    flex1.style.display = 'none'
    T = true
})

addEventListener('keydown', ({ keyCode }) => {
    if(junbae.movement == true) {
        if(keyCode == 39) {
            junbae.velocity.x = 5
            A = true
        }
        if(keyCode == 37) {
            junbae.velocity.x = -5
            D = true
        }
        if(keyCode == 32) {
            if(jumping == false) {
                junbae.velocity.y = -8
                falling = true
                jumping = true
            }
        }
    }
})

addEventListener('keyup', ({ keyCode }) => {
    if(junbae.movement == true) {
        if(keyCode == 39) {
            A = false
            if(D == true) {
                junbae.velocity.x = -5
            } else {
                junbae.velocity.x = 0
            }
        }
        if(keyCode == 37) {
            D = false
            if(A == true) {
                junbae.velocity.x = 5
            } else {
                junbae.velocity.x = 0
            }
        }
        if(keyCode == 32) {
            falling = true
            if(falling = false) {
                junbae.velocity.y = 0
            }
        }
    }
})

addEventListener('resize', (e) => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

addEventListener('click', (e) => {
    if(T == true) {
        var Text = document.getElementById('Text')
        if(TeO != 4 && TeO != 12) {
            TeO++
            Text.style.display = 'inline'
            Text.innerText = TText[TeO]
            TF.appendChild(Text)
        } else if(TeO == 4) {
            TeO++
            var Answer = prompt('당신의 이름은?', '74 117 110 98 97 101')
            Text.innerText = TText[TeO]
            TF.appendChild(Text)
        } else if(TeO == 12) {
            T == false
            junbae.start = true
            console.log(junbae.start, junbae.drawing, junbae.movement)
            TF.style.display = 'none'
            window.onload = () => {
                animate()
            }
        }
    }
})
