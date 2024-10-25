import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const nul = [null, undefined, false, "", [], {},NaN];

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  // console.log(process.env.vueRouterMode,'envttwwwwwwww')

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath    
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  
  //will check if incoming(routes has matched informations(meta,params,name...) as already defined routes)
  //then it would tell use if any match is founded inside out definitions of route and require params(privileges)
  Router.beforeEach((to, from, next) => {


    return  next()

    const toMatched = nul.includes(to.matched) ? [] : to.matched //do we have..matched routes for coming 
    const LastmatchedMeta = toMatched.length > 1 ? toMatched[toMatched.length-1] : false

    if (LastmatchedMeta && (LastmatchedMeta.meta._isauthenticated ?? false)) { //is this route require authentications _usercompanyID _user_id

      const _thisusertoken = from.params._thisusertoken ?? false
      const _user_id =  from.params._user_id ?? false
      const _companyID = from.params._companyID ?? false
      const acctype = from.params.acctype ?? false 

      //acctype
      if(_thisusertoken || _user_id || _companyID  || acctype){
        
      }

      // //const requestype = `${ process.env.VUE_APP_TITLE } - ${to.name}-${to.query._request_id}`
      // const privAccess = LastmatchedMeta.meta.acctype ?? false
      // if(!nul.includes(privAccess.venum) && privAccess.venum.length > 1 ){
      // //  console.log('yaaa routing incoming with matched privileges of to this route')
      // }else if(!nul.includes(privAccess.enum) && privAccess.enum.length > 1 ){

      // }

      try{  //extrac privileges &&& check if true, unless, go to catch
      //  console.log(to.meta._isauthenticated,_thisusertoken,'Routing into Authenticated, && Priviledged Pages..')
        return next()
      }catch{ //if authenticated but, to privileged tasks
    //    console.log(to.meta._isauthenticated,to,'Routing into Authenticated, but Unpriviledged Pages..')
        return next()
      }
      
    }else{
    //  console.log(to.meta._isauthenticated,from,to,'Routing into Non Authenticated Pages..')
     // Router.push({  name: 'login', });
     return  next()
     
    }
  })
  

/*
  Router.beforeEach(async (to, from, next) => {

    //console.log(from,to,'requestsssGGGGGG')
    let isCommingwith = {}
    isCommingwith =from //{path:'',name'',params:{},query:{},hash:'',fullPath:'',matched:[],meta:{},redirectedFrom:""} // is carried inside the page_url(URL_params)
    //-----------------------
    let foundedRoutesto = {}//is telles us the_list of matched_route links in our router_table
    foundedRoutesto =to //{path:'',name'',params:{},query:{},hash:'',fullPath:'',matched:[],meta:{},redirectedFrom:""} // is carried inside the page_url(URL_params)
    //-----------------------

    //console.log(to,from,next,"Entering ... hooooooooooooooooooooooks check for acctypeations")

    if ( Object.keys(isCommingwith.meta)) {

     // let incomingacctype = Object.keys(isCommingwith.meta.acctype).length
      //let incoming_auth = Object.keys(isCommingwith.meta._isauthenticated)

     // console.log(foundedRoutesto,"request urlParams are carring acctype object values")
    
        //return next({ name: "_isauthenticated" });
      
    }
    else if (Object.keys(foundedRoutesto.meta)) { //is
     
        console.log(foundedRoutesto.acctype,foundedRoutesto.matched,"possible routes of forwarding is founded!!! & require useer3A is passed");
       // return next({ name: "logHome" });
      
    }
    else  {
    
      //  console.log("_isauthenticateding.....");
       // return next({ name: "logHome" });
     
    }


  let allowedRoutesto ={}//is telles us the_list of matched_route links in our router_table
  allowedRoutesto['name'] =foundedRoutesto.name;//[1] //{path:'',name'',params:{},query:{},hash:'',fullPath:'',matched:[],meta:{},redirectedFrom:""} // is carried inside the page_url(URL_params)

  console.log(from,to,'Before Route is Calling for CheckUp ( blocko)')

  */
  //return  next({'name':foundedRoutesto.name});//is posible identifing routes by thier name (if route only have unique layoute or noLayout all in One)
 // return  next();//if single layout having multiple_pages...next(routes)...should be the whole matched_object [ no Children_format]
    //let it go into founded route_value

  
// });

  return Router

})

/*
From ======is Hoding Meta of
path: '/',
  name: undefined,
  params: {},
  query: {},
  hash: '',
  fullPath: '/',
  matched: [],
  meta: {},
  redirectedFrom: undefined

  */