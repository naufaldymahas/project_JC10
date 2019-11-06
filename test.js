const moment = require("../my-api/node_modules/moment/moment")

// import moment from "moment"
// import "moment/locale/id"

// // const deadline = moment().add(1, 'h')
// // const dateNow = moment()

// // console.log('deadline', deadline)
// // console.log('now', dateNow)

// // console.log(new Date(dateNow).getTime())


// // let t = deadline - dateNow
// // let days = Math.floor(t / (1000 * 60 * 60 * 24)); 
// // let hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
// // let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
// // let seconds = Math.floor((t % (1000 * 60)) / 1000); 
// // console.log(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's')



// // let dateNow = 
// console.log(moment().locale('id').format('LL'))

// console.log(moment().format('YYYY-MM-DD') + ' ' + moment().format('kk:mm:ss'))
// console.log(moment().add(8, 'd').format('YYYY-MM-DD') + ' ' + moment().format('kk:mm:ss'))

// // console.log(moment('x'))

// // console.log(moment())

// console.log(new Date('2019-11-01T14:42:36.000Z').getTime())

// let x = moment().add(8, 'h').format('YYYY-MM-DDTkk:mm:ss.SSS')+ 'Z'
// console.log(new Date(x))


// if (state.deadline) {
//     let deadline = new Date(`${state.deadline}`).getTime()
//     let x = setInterval(() => {
//             let now = new Date().getTime()
//             let t = deadline - now
//             let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
//             let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
//             let seconds = Math.floor((t % (1000 * 60)) / 1000); 
//             if (t < 0) {
//                 clearInterval(x)
//                 mounted.current = true
//                 return
//             }
//             setCount({...count,
//             hour: hours,
//             minute: minutes,
//             second: seconds
//             })
//     }, 1000);
// }

let show

let x = 'teuing'
x += {
    1: false,
    2: false
}

show = x

console.log(x)