// Reclap = (function(){

//   var private = {
//     notice:function(anything){console.log(anything)},
//     followState:function(){
//       var state = public.getState()
//       private.notice(state)
//     }
//   }

//   var public = {
//     getState:function(){
//       var state = window.location.hash
//       if( state[0] == '#' )
//         state = state.slice( 1 );
//       return state
//     },
//     pushState:function(newState){
//       window.history.pushState({rad:"shit"},"","#"+newState)
//       private.followState()
//     },
//     setResponder:function(callback){
//       private.notice = callback
//     }
//   }

//   var init = function(){
//     window.addEventListener("popstate", function(a, b, c, d){
//       private.followState()
//     })
//   }
//   init()

//   return public
// })()