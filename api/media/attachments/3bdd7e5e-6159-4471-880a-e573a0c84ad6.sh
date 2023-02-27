#!/bin/bash
FIRST_ARG="$1"

W_DIR=~/Desktop/zen8/"$FIRST_ARG"

if [ -d "$W_DIR" ]; then
	echo "Open vscode" $FIRST_ARG
	cd $W_DIR
	code .
else
	echo $W_DIR "does not exist"
	exit
fi


