FROM node:alpine
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY . .
COPY --chown=nextjs:nodejs ./.next ./.next

USER nextjs

EXPOSE 3000

# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
