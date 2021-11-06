#!/bin/bash
deploy() {
  FILE_NAME="${APP_NAME}_${APP_VERSION}+${APP_COMMIT}.tar.gz"
  ember build --environment production
  tar -czvf ${FILE_NAME} dist/
  scp -P${SSH_PORT} -i ${SSH_KEY_PATH} ${FILE_NAME} ${SSH_USER}@${SSH_HOST}:${SSH_DEST_FOLDER}
  ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "cd ${SSH_DEST_FOLDER} && mkdir -p ${RELEASE_FOLDER_NAME} && cd ${RELEASE_FOLDER_NAME}\\
  && tar -xzf ${SSH_DEST_FOLDER}/${FILE_NAME} && mv dist ${APP_NAME} && rm -rf ${SSH_DEST_FOLDER}/${FILE_NAME}"
  rm ${FILE_NAME}
  echo -e "Deployed \e[93m${FILE_NAME} \e[39mto \e[31m${SSH_HOST}:${SSH_PORT} \e[39min \e[96m${SSH_DEST_FOLDER} \e[39mfolder."
}

activate() {
  if [ -z "$1" ]
    then
      echo "No revision"
      exit 1
  fi
  echo -e "Activating \e[93m$1 \e[39mrevision..."
  ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "unlink ${SSH_DEST_FOLDER}/current && ln -s ${SSH_DEST_FOLDER}/releases/$1 ${SSH_DEST_FOLDER}/current"
  echo -e "Revision \e[96m$1 \e[39mactivated."
}

list() {
  echo -e "Listing \e[96m${SSH_DEST_FOLDER} \e[39mfolder..."
  ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "ls -lha ${SSH_DEST_FOLDER}/releases"
  RELEASED_REVISION_PATH=`ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "readlink -f ${SSH_DEST_FOLDER}/current"`
  RELEASED_REVISION=${RELEASED_REVISION_PATH#${SSH_DEST_FOLDER}}
  echo -e "Released revision is \e[93m${RELEASED_REVISION}\e[39m"
  echo -e "Listing \e[96m${SSH_DEST_FOLDER} \e[39mfolder DONE."
}

remove() {
  if [ -z "$1" ]
    then
      echo "No revision"
      exit 1
  fi
  RELEASED_REVISION_PATH=`ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "readlink -f ${SSH_DEST_FOLDER}/release"`
  RELEASED_REVISION=${RELEASED_REVISION_PATH#${SSH_DEST_FOLDER}}
  if [ "$1" == "$RELEASED_REVISION" ]
    then
      echo -e "Can't remove released version \e[31m$1\e[39m"
      exit 1
  fi
  echo -e "Removing \e[93m$1 \e[39mrevision..."
  ssh -p${SSH_PORT} -i ${SSH_KEY_PATH} ${SSH_USER}@${SSH_HOST} "rm -rf ${SSH_DEST_FOLDER}/$1"
  echo -e "Revision \e[96m$1 \e[39mremoved."
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
