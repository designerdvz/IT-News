export const getData = unix => {
	let a = new Date(unix * 1000)
	let months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	]
	let year = a.getFullYear()
	let month = months[a.getMonth()]
	let date = a.getDate()
	let hour = a.getHours().toString()
	let min = a.getMinutes().toString()
	let sec = a.getSeconds().toString()
	if (hour.length < 2) {
		hour = '0' + hour
	}
	if (min.length < 2) {
		min = '0' + min
	}
	if (sec.length < 2) {
		sec = '0' + sec
	}
	let normalTime =
		date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
	return normalTime
}
