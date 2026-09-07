FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json ./
# Install production dependencies only
RUN npm install --omit=dev --ignore-scripts

COPY dist ./dist
COPY data ./data
COPY firebase-applet-config.json ./

EXPOSE 3000

CMD ["node", "dist/server.cjs"]
