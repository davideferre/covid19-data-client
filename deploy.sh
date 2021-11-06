#!/bin/bash
deploy() {
  FILE_NAME="${APP_NAME}_${APP_VERSION}+${APP_COMMIT}.tar.gz"
  ember build --environment production
  tar -czvf ${FILE_NAME} dist/
  scp -P${SSH_PORT} -i ${SSH_KEY_PATH} ${FILE_NAME} ${SSH_USER}@${SSH_HOST}:${SSH_DEST_FOLDER}
  ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "cd ${SSH_DEST_FOLDER} && tar -xzf ${SSH_DEST_FOLDER}/${FILE_NAME} && mv dist ${SSH_DEST_FOLDER}/releases/${RELEASE_FOLDER_NAME} && rm -rf ${SSH_DEST_FOLDER}/${FILE_NAME}"
  rm ${FILE_NAME}
  echo -e "Deployed \033[93m${FILE_NAME} \033[39mto \033[31m${SSH_HOST}:${SSH_PORT} \033[39min \033[96m${SSH_DEST_FOLDER} \033[39mfolder."
}

activate() {
  if [ -z "$1" ]
    then
      echo "No revision"
      exit 1
  fi
  echo -e "Activating \033[93m$1 \033[39mrevision..."
  ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "unlink ${SSH_DEST_FOLDER}/current && ln -s ${SSH_DEST_FOLDER}/releases/$1 ${SSH_DEST_FOLDER}/current"
  echo -e "Revision \033[96m$1 \033[39mactivated."
}

list() {
  echo -e "Listing \033[96m${SSH_DEST_FOLDER} \033[39mfolder..."
  ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "ls -lha ${SSH_DEST_FOLDER}/releases"
  RELEASED_REVISION_PATH=`ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "readlink -f ${SSH_DEST_FOLDER}/current"`
  RELEASED_REVISION=${RELEASED_REVISION_PATH#${SSH_DEST_FOLDER}}
  echo -e "Released revision is \033[93m${RELEASED_REVISION}\033[39m"
  echo -e "Listing \033[96m${SSH_DEST_FOLDER} \033[39mfolder DONE."
}

remove() {
  if [ -z "$1" ]
    then
      echo "No revision"
      exit 1
  fi
  RELEASED_REVISION_PATH=`ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "readlink -f ${SSH_DEST_FOLDER}/current"`
  RELEASED_REVISION=${RELEASED_REVISION_PATH#"${SSH_DEST_FOLDER}/releases/"}
  if [ "$1" == "$RELEASED_REVISION" ]
    then
      echo -e "Can't remove released version \033[31m$1\033[39m"
      exit 1
  fi
  echo -e "Removing \033[93m$1 \033[39mrevision..."
  ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "rm -rf ${SSH_DEST_FOLDER}/releases/$1"
  echo -e "Revision \033[96m$1 \033[39mremoved."
}

DEPLOY_ENV_FILE='.env.deploy.production'
PACKAGE_JSON_FILE='package.json'
SSH_HOST=$(cat ${DEPLOY_ENV_FILE} | grep SSH_HOST | head -1 | awk -F= '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
SSH_PORT=$(cat ${DEPLOY_ENV_FILE} | grep SSH_PORT | head -1 | awk -F= '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
SSH_USER=$(cat ${DEPLOY_ENV_FILE} | grep SSH_USER | head -1 | awk -F= '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
SSH_KEY_PATH=$(cat ${DEPLOY_ENV_FILE} | grep SSH_KEY | head -1 | awk -F= '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
SSH_DEST_FOLDER=$(cat ${DEPLOY_ENV_FILE} | grep SSH_DEST_FOLDER | head -1 | awk -F= '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
APP_NAME=$(cat ${PACKAGE_JSON_FILE} | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
APP_VERSION=$(cat ${PACKAGE_JSON_FILE} | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
APP_COMMIT=`git rev-parse --short HEAD`
RELEASE_FOLDER_NAME="${APP_VERSION}+${APP_COMMIT}"

case "$1" in
  deploy)
    deploy
    ;;
  activate)
    activate "$2"
    ;;
  list)
    list
    ;;
  remove)
    remove "$2"
    ;;
  *)
    echo "Usage: $0 {deploy | activate REVISION}"
    exit 1
esac
