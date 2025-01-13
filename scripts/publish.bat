@echo off
echo start build:pack
call pnpm run build:pack
echo end build:pack
echo start publish hooks
cd /d packages\hooks
call npm publish
echo end publish hooks
echo start publish shared
cd ../../
cd /d packages/shared
call npm publish
echo end publish shared
echo start publish ui
cd ../../
cd /d packages/ui
call npm publish
echo end publish ui