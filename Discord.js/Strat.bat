@echo off 
cd /d %~dp0
:menu 
node index.js
goto :menu