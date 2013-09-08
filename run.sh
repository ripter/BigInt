#! /bin/bash

CWD=$(pwd)

nginx -p $CWD -c config/nginx.conf
echo "Running localhost:8080"
