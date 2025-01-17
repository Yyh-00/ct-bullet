@echo off
echo start build:pack
@REM call pnpm run build:pack
echo end build:pack
echo start build:docs
@REM call pnpm run build:docs
echo end build:docs
cd /d docs\.vitepress\dist
echo * text=auto eol=lf > .gitattributes
echo start docs git
git add .
git commit -m "Update for deployment"
git push -f git@github.com:Yyh-00/ct-bullet.git master:github-pages
echo end docs git
echo start code git
cd ../../../
git add .
git commit -m "test beta update"
git push
echo end code git
