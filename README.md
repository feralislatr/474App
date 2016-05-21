## CISC474DeathCalcApp
# Running the APP
- You have to run the API on a different server than the webapp
- I will keep the API running on my workspace. However, if you do not get a cause of death, it could mean that the API is down. 
You can eamil me, and I will put it back up. Or, you can run it yourself.

# Create 2 workspaces.
# In the first Workspace:
- go into the folder API_MARK2 and run mongod. 
- run app.js from API_MARK2
- you may have to do multiple installs. 
- npm install express, npm install body-parser, npm install mongoose, npm install mongodb should take care of everything

# In the second Workspace:
- go into folder Web_App. 
- in js/death.js, set the API url to whatever your URL is from above.
- run Web_App/index.html

