#! /bin/bash

CWD=$(pwd)

nginx -p $CWD -c config/nginx.conf -s stop
