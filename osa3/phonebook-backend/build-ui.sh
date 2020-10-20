#! /usr/bin/env bash

ui_dir="../puhelinluettelo/"

rm -rf build
(
  cd "${ui_dir}"
  npm run build --prod
)

cp -r "${ui_dir}/build" .