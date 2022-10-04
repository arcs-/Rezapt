FROM registry.gitlab.com/jkwebgmbh/base-images/vue-prerendering:node18_prerender_v1

# copy src
COPY ./ ./

# run build
RUN npm install
RUN npm run build
