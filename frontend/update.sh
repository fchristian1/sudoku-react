#!/bin/bash
git pull && docker stop sudoku
docker rm sudoku
docker build . -t sudoku:latest -t sudoku:0.0.2
docker run -d -p 9001:80 --name sudoku sudoku:latest
