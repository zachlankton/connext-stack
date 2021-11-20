#!/bin/bash

git clone https://github.com/zachlankton/connext-stack.git . 
npm install 
cp .env.example .env.local
echo "SECRET=$(openssl rand -hex 32)" >> .env.local 
npm run seed --yes-destroy-all-my-data