FROM --platform=${BUILDPLATFORM} alpine:latest

RUN ["apk", "update"]

RUN ["apk", "add", "bind"]

CMD ["named", "-c", "/etc/bind/named.conf", "-g", "-u", "named"]

EXPOSE 53
EXPOSE 443
EXPOSE 80
