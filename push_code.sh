#!/bin/bash
MESSAGE=${1:-"Updated code"}
git add .
git commit -m "$MESSAGE"
git push
