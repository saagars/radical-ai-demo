# radical-ai-demo
A demo of using an ML model for Materials


# setup
Make sure you have python and npm installed
* Python: https://www.python.org/downloads/
* npm:
** Can use nvm: https://medium.com/@imvinojanv/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1 - 
    `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`

# running the app locally
* Install the appropriate dependencies: run `make install-server` to install python dependencies. Run `make install-frontend` to install the node dependencies.
* You'll need two terminals open in the main directory of this project. In one terminal, you can run the command `make run-server` which should start the python flask server on port 5000. In the other terminal, you can run `make run-frontend` to set up the react app on port 3000. This should automatically open the browser, but if not, you can go to localhost:3000 to see the application. The react app proxies requests to localhost:5000 (the python server) so this code cannot be deployed to production as is - but should work for a demo.
