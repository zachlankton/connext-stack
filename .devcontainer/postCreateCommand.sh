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
npm install 
cp .env.example .env.local
echo "SECRET=$(openssl rand -hex 32)" >> .env.local 
npm run seed -- --yes-destroy-all-my-data

exit 0