export default defineEventHandler(event => {
    
    console.log("------------------------------------------------------------------");
    console.log('New request: ' + getRequestURL(event))
    console.log("server middleware jsessionid.js: parseCookies(event)['JSESSIONID'] = ", parseCookies(event)['JSESSIONID']);
    console.log("------------------------------------------------------------------");
    // event.context.auth = { user: 123 }
})