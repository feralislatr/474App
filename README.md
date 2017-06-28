# CISC474DeathCalcApp
## Running the APP
- Install Docker on your machine (if you have not done so already)
- Run `docker-compose up` in root directory of project
- Navigate to http://localhost:8080
- You may need to install a browser extension to enable CORS

## About our APP
We found a database of deaths in the United States on Kaggle.com. We used a machine learning algorithm written by one of our group members in order to be able to tell you with your age, education level, gender, and month of death, what is statistically the most probable way you would die. There are 7 possible answers including Suicide, Homicide, Accident, Natural, Under Investigation, Unknown, and Not Specified. 

We wrote a data manipulation app, which simply changes the data into medium that can be parsed using the machine learning. for example, combining multiple fields that track the same thing, turning words into numbers (e.g., male ->0, female->1)

The machine learning algorithm we wrote uses information gain and entropy algorithms to build a decision tree. This tree can answer question posed to it, even if the original data did not have the specific case. The core of the machine learning was written by Ryan during an AI class, and he changed it in order to make it work for this project.

We saved this decision tree in a mongodb. Each node is represented as an entry, and it also includes whether the node is a goal node, the goal category, split category if it is not a goal, splitvalue, and left and right children.

When we get a query, we go to the first node of the tree. if the node is not a goal, we check the split category. We then compare the value of that category in the request with the splitvalue. If the value of the request is lower than the splitvalue, we go to the left child. If the value is greater, we go to the right child. We continue to do this until we hit a goal, when we return the goalcategory. We return this as a JSON object, which is then written to the screen by the WebApp. 

## Group Members
- Ryan Serva
- Briana Slater
- Eluamuno Enenmo
- Krzysztof Czerwinski
- David Law
