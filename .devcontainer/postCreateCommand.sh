#!/bin/bash

git clone https://github.com/zachlankton/connext-stack.git . 
npm install 
echo "SECRET=$(openssl rand -hex 32)" >> .env.example 
cp .env.example .env.local
npm run seed --yes-destroy-all-my-data