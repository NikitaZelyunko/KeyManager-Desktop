FROM key-manager-base-node as dev

# Папка приложения
ARG APP_DIR=/home/key-manager
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

EXPOSE 4200

COPY . .
RUN npm ci
CMD npm run ng:serve -- --host 0.0.0.0
