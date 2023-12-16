FROM key-manager-base-node as dev

# Папка приложения
ARG APP_DIR=/home/key-manager
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

EXPOSE 443

EXPOSE 4200

COPY . .
RUN npm ci

ARG DOMAIN_NAME
ENV DOMAIN_NAME=$DOMAIN_NAME

RUN apk add openssl

RUN printf "[dn]\nCN=${DOMAIN_NAME}\n[req]\ndistinguished_name=dn\n[EXT]\nbasicConstraints=CA:TRUE\nsubjectAltName=DNS:${DOMAIN_NAME}\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth" > v3

RUN openssl req -x509 -out ${DOMAIN_NAME}.crt -keyout ${DOMAIN_NAME}.key -newkey rsa:4096 -nodes -sha256 -subj "/CN=${DOMAIN_NAME}" -extensions EXT -config v3

# CMD npm run ng:serve -- --host 0.0.0.0 --port 443

# CMD npm run ng:serve -- --host 0.0.0.0 --port 443 --disable-host-check --ssl --ssl-cert $DOMAIN_NAME.crt --ssl-key $DOMAIN_NAME.key

CMD npm run ng:serve:prod -- --host 0.0.0.0 --port 443 --disable-host-check --ssl --ssl-cert $DOMAIN_NAME.crt --ssl-key $DOMAIN_NAME.key

# CMD npm run ng:serve -- --host 0.0.0.0 --port 443 --disable-host-check --ssl

# CMD npm run ng:serve -- --host 0.0.0.0
