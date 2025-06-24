# deploy.sh
#!/bin/bash

# Build the site
hugo

# Go to public directory and push to gh-pages branch
cd public
git init
git remote add origin https://github.com/StephenBarker/stephenbarker.git
git checkout -b gh-pages
git add .
git commit -m "Deploy"
git push -f origin gh-pages

cd ..
