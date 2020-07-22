#! /bin/bash
yarn build
rm -rf quiz
rm quiz.zip
mv build quiz
zip -r quiz.zip quiz