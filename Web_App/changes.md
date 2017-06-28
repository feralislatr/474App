# deathcalc
## Errors/Issues

 /results returns 404 

 "Possibly unhandled rejection: {"data":null,"status":-1,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"jsonpCallbackParam":"callback","url":"http://localhost:4200/api/getDeath?0=4&1=7&2=0&3=22","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":""}""

anchor scrolling does not work 


### index.html
- remove base tag

### death.html
- try ng-href and ng-mousedown
- fixed typo (worked)
	- stopped links from sending get request
	- also stopped scrolling animation however
- descend button erases data in input fields
- add target="_self" to all anchor links
- use /# for all links (including results)
- use ng-model for variables
- start over basically 
- use #
- add scrollTo

### death.js
- add != null clause to $http request (i think this worked)
- get returns empty reponse
- added $location, $anchorScroll, $routeParams to controller
- added preventdefault function (removed)
- start over basically & remove location provider & routeParams
- TAKE $location OUT OF CONTROLLER (this made it work)
- uncomment preventdefault

### app.js
- add scrolling function to handle anchor scrolling ($anchorscroll)
- requirebase false
- remove otherwise
- remove .run function
- commented out everything but config block
- put location back
- uncommented directive


### style.css
- ease-in to all-ease
- .ng-enter to #app.ng-enter

### package.json
- remove angular-scroll
