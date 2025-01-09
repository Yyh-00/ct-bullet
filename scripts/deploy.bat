@echo off
echo start build:ui
@REM call pnpm run build:ui
echo end build:ui
echo start build:docs
@REM call pnpm run build:docs
echo end build:docs
cd /d docs\.vitepress\dist
echo * text=auto eol=lf > .gitattributes
echo start docs git
git add .
git commit -m "Update for deployment"
git push -f git@github.com:Yyh-00/ct-bullet-ui.git master:github-pages
echo end docs git
echo start code git
cd ../../../
git add .
git commit -m 'update'
git push
echo end code git
