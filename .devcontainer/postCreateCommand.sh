#!/bin/bash

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'exit_check' EXIT

exit_check() {
    ecode=$?
    if test $ecode -ne 0; then
        echo "\"${last_command}\" command failed with exit code ${ecode}."
        echo "Fix Errors and rerun ./.devcontainer/postCreateCommand.sh"
    fi
}

git clone https://github.com/zachlankton/connext-stack.git . 
set -e
apt update -y
apt install -y ruby-full
gem install bundler jekyll
apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
npm install 
cp .env.example .env.local
echo "SECRET=$(openssl rand -hex 32)" >> .env.local 
npm run seed -- --yes-destroy-all-my-data

exit 0