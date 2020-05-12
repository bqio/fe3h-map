@echo off
SET dir=%~dp0
if [%1]==[] goto :eof
:loop
echo %1
node %dir:~0,-1%/src/unpack %1
shift
if not [%1]==[] goto loop
@pause