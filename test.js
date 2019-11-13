const moment = require("moment");

// // const moment = require("../my-api/node_modules/moment/moment")

// // // import moment from "moment"
// // // import "moment/locale/id"

// // // // const deadline = moment().add(1, 'h')
// // // // const dateNow = moment()

// // // // console.log('deadline', deadline)
// // // // console.log('now', dateNow)

// // // // console.log(new Date(dateNow).getTime())


// // // // let t = deadline - dateNow
// // // // let days = Math.floor(t / (1000 * 60 * 60 * 24)); 
// // // // let hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
// // // // let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
// // // // let seconds = Math.floor((t % (1000 * 60)) / 1000); 
// // // // console.log(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's')



// // // // let dateNow = 
// // // console.log(moment().locale('id').format('LL'))

// // // console.log(moment().format('YYYY-MM-DD') + ' ' + moment().format('kk:mm:ss'))
// // // console.log(moment().add(8, 'd').format('YYYY-MM-DD') + ' ' + moment().format('kk:mm:ss'))

// // // // console.log(moment('x'))

// // // // console.log(moment())

// // // console.log(new Date('2019-11-01T14:42:36.000Z').getTime())

// // // let x = moment().add(8, 'h').format('YYYY-MM-DDTkk:mm:ss.SSS')+ 'Z'
// // // console.log(new Date(x))


// // // if (state.deadline) {
// // //     let deadline = new Date(`${state.deadline}`).getTime()
// // //     let x = setInterval(() => {
// // //             let now = new Date().getTime()
// // //             let t = deadline - now
// // //             let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
// // //             let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
// // //             let seconds = Math.floor((t % (1000 * 60)) / 1000); 
// // //             if (t < 0) {
// // //                 clearInterval(x)
// // //                 mounted.current = true
// // //                 return
// // //             }
// // //             setCount({...count,
// // //             hour: hours,
// // //             minute: minutes,
// // //             second: seconds
// // //             })
// // //     }, 1000);
// // // }

// // let show

// // let x = 'teuing'
// // x += {
// //     1: false,
// //     2: false
// // }

// // show = x

// // console.log(x)

// // const arr = [{angka: 1}, {angka: 2}]
// // let count = 0

// // console.log(arr[0].angka)

// // val = arr[i]

// // for (let i = 0; i < arr.length; i++) {
// //     console.log(arr[i])
// //     // count += 1   
// // }

// // arr.forEach(val =>{
// //     console.log(val)
// // })

// // console.log('ini for each')

// // arr.map((val, index) => {
// //     console.log('ini val', val)
// //     console.log('ini index', index)
// // })

// // console.log(count)

// // console.log(moment().format('YYYY-MM-DD kk:mm:ss'))

// // const Membership = ()=> {
  
// //     const [plan, setPlan] = useState('')  

// //     if (!plan) {
// //           return (
// //             <Fragment>
// //             <Header/>
// //           <div className="container pricing-header px-3 py-3 pt-md-5 pb-md-5 mx-auto text-center">
// //             <h1 className="display-5 mt-4">Membership</h1>
// //             <br/>
// //             <p className="lead">You can simply choose program to fulfill your needs of education</p>
// //           </div>
// //           <div className="container">
// //             <div className="card-deck mb-4 text-center">
// //               <div className="card mb-4 box-shadow">
// //                 <div className="card-header">
// //                   <h4 className="my-0 font-weight-normal">TOEFL</h4>
// //                 </div>
// //                 <div className="card-body">
// //                   <h1 className="card-title pricing-card-title">500K<small className="text-muted">/2mo</small></h1>
// //                   <ul className="list-unstyled mt-3 mb-4 ">
// //                     <li>20 Videos</li>
// //                     <li>20 PDF</li>
// //                     <li>Tips and Tricks</li>
// //                   </ul>
  
// //                   <button type="button" className="searchcolor1" onClick={()=> setPlan('toefl')}>Select Membership</button>
                
// //                 </div>
// //               </div>
// //               <div className="card mb-4 box-shadow">
// //                 <div className="card-header">
// //                   <h4 className="my-0 font-weight-normal">IELTS</h4>
// //                 </div>
// //                 <div className="card-body">
// //                   <h1 className="card-title pricing-card-title">500K<small className="text-muted">/2mo</small></h1>
// //                   <ul className="list-unstyled mt-3 mb-4">
// //                     <li>20 Videos</li>
// //                     <li>20 PDF</li>
// //                     <li>Tips and Tricks</li>
// //                   </ul>
  
// //                   <button type="button" className="searchcolor1" onClick={()=> setPlan('ielts')}>Select Membership</button>
                
// //                 </div>
// //               </div>
// //               <div className="card mb-4 box-shadow">
// //                 <div className="card-header">
// //                   <h4 className="my-0 font-weight-normal">GMAT</h4>
// //                 </div>
// //                 <div className="card-body">
// //                   <h1 className="card-title pricing-card-title">500K<small className="text-muted">/2mo</small></h1>
// //                   <ul className="list-unstyled mt-3 mb-4">
// //                     <li>20 Videos</li>
// //                     <li>20 PDF</li>
// //                     <li>Tips and Tricks</li>
// //                   </ul>
  
// //                   <button type="button" className="searchcolor1" onClick={()=> setPlan('gmat')}>Select Membership</button>
                
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
      
// //           </Fragment>
// //     )
// //     } else {
// //         return <Redirect to={{ pathname: "/payment", state: plan }}/>
// //     }
          
// //   }
  
// //   export default Membership

// const data = [
//     {id: 1, nama: 'test1'},
//     {id: 2, nama: 'test2'},
//     {id: 3, nama: 'test3'},
//     {id: 4, nama: 'test4'},
//     {id: 5, nama: 'test5'},
//     {id: 6, nama: 'test6'},
//     {id: 7, nama: 'test7'},
//     {id: 8, nama: 'test8'},
//     {id: 9, nama: 'test9'},
//     {id: 10, nama: 'test10'},
// ]

// const newArr= []

// for (let i = 0; i < 5; i++) {
// }

// console.log(Math.ceil(Math.random()*10))

// console.log(moment().format('YYYY-MM-DD') + ' ' + moment().add(8, 'h').format('kk:mm:ss'))
// console.log(moment().add(8, 'h').format('YYYY-MM-DD kk:mm:ss'))

console.log(moment('2019-10-31 19:37:16').add(8, 'h').format('YYYY-MM-DD kk:mm:ss'))

setInterval(() => {
   console.log('masuk') 
}, 1000);
