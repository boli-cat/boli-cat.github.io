//移动模块
let flag = false
let timer
let str1 = 'd'
let speed = 150
let num = 0

function move(str) {

	//拒绝反方向指令
	if (str != 'w' &&
		str != 's' &&
		str != 'a' &&
		str != 'd') {
		return
	}

	if (str1 == 'w') {
		if (str == 's') {
			return
		}
	}
	if (str1 == 's') {
		if (str == 'w') {
			return
		}
	}
	if (str1 == 'a') {
		if (str == 'd') {
			return
		}
	}
	if (str1 == 'd') {
		if (str == 'a') {
			return
		}
	}

	stop(true, true)
	//开始移动
	timer = setInterval(function() {
		let direction = {
			'w': {
				'top': '-=25'
			},
			's': {
				'top': '+=25'
			},
			'd': {
				'left': '+=25',

			},
			'a': {
				'left': '-=25'
			}

		}
		//保存每次移动蛇的位置
		let bodys = $('.body')
		let arr = []
		let newarr = []
		for (var i = 0; i < bodys.length; i++) {
			newarr.push([bodys.eq(i).css('left'), bodys.eq(i).css('top')])
		}
		arr = newarr

		for (var i = 1; i < bodys.length; i++) {
			bodys.eq(i).animate({
				left: arr[i - 1][0],
				top: arr[i - 1][1]
			}, 0)
		}
		$('#header').animate(direction[str], 0);

		//越界
		if ($('#header').css('left') == "600px" ||
			$('#header').css('top') == "600px" ||
			$('#header').css('top') == "-25px" ||
			$('#header').css('left') == "-25px"
		) {
			$('.waring').html('越界')
			$('.waring').css('line-height', '300px')
			$('.waring').show()
			$('#header').stop()
			clearInterval(timer)
			$('body').off()
		}
		//食物
		if ($('#header').css('left') == $('.food').css('left') &&
			$('#header').css('top') == $('.food').css('top')
		) {
			$('.food').before($('<div class="body"></div>'))
			$('.food').prev().css({
				left: arr[arr.length - 1][0],
				top: arr[arr.length - 1][1]
			})
			num += 10
			$('#score').text(num)

			food()
			if (num % 50 == 0) {
				speed -= 10
				if (speed == 100) {
					speed = 120
				}
			}
		}

		//自杀
		for (var i = 1; i < bodys.length; i++) {
			if (bodys.eq(i).css('left') == $('#header').css('left') &&
				bodys.eq(i).css('top') == $('#header').css('top')
			) {
				$('.waring').html('碰到<br>自身')
				$('.waring').css('line-height', '150px')
				$('.waring').show()
				$('#header').stop()
				clearInterval(timer)
				$('body').off()
			}
		}
		str1 = str
	}, speed)

}


//停止
function stop() {
	clearInterval(timer)
	$('#header').stop()
}
//食物
function food() {
	let random1 = Math.floor(Math.random() * 23) * 25
	let random2 = Math.floor(Math.random() * 23) * 25
	if (random1 == 0 || random2 == 0 ||
		random1 == 575 || random2 == 575) {
		food()
		// return
	} else {
		let flag = true
		let bodys = $('.body')
		for (var i = 1; i < bodys.length; i++) {
			if (
				bodys.eq(i).css('left') == (random1 + 'px') &&
				bodys.eq(i).css('top') == (random2 + 'px')
			) {
				flag = false
				break
			}
		}

		if (flag) {
			$('.food').css({
				left: random1 + 'px',
				top: random2 + 'px'
			})
		} else {
			food()
			return
		}
	}
}


//开始
$('#start').click(function() {
	$('body').keydown(function(res) {
		let key = res.originalEvent.key
		move(key)
	})
	fn1()
})


//重启
$('#reset').click(fn1)


//开始与重启公共代码
function fn1() {
	food()
	speed = 150
	num = 0
	$('#score').text(num)
	stop()
	str1 = 'd'
	let arr = [
		['75px', 0],
		['50px', 0],
		['25px', 0],
		['0px', 0]
	]
	let nextAll = $('#last').nextAll()
	for (var i = 0; i < nextAll.length - 1; i++) {
		nextAll[i].remove()
	}
	let bodys = $('.body')
	for (var i = 0; i < bodys.length; i++) {
		bodys.eq(i).css({
			left: arr[i][0],
			top: arr[i][1]
		})
	}
	$('.waring').hide()

	$('body').keydown(function(res) {
		let key = res.originalEvent.key
		move(key)
	})
}