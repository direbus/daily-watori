FROM node:16-alpine

ARG ENV=development
ARG PORT=3100

WORKDIR /usr/src/app

COPY ["*.json", "./"]

COPY ["./src/", "./src/"]
COPY ["./packages/", "./packages/"]

ENV NODE_ENV ${ENV}
ENV PORT ${PORT}
EXPOSE ${PORT}

RUN if [ "${ENV}" != "development" ]; then \
  yarn install; \
  fi

# Run build only when environment is not development.
# Also, limit build only for backend. Front end will be built by
# nextjs's internal.
RUN if [ "${ENV}" != "development" ]; then \
  yarn workspace @direbus/dailywatori-core run build; \
  fi

CMD ["yarn", "workspace", "@direbus/dailywatori-core", "run", "prod"]
