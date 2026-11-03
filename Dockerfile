FROM docker.io/library/nginx:stable-alpine

# Only browser files are included in the image.
COPY web/ /usr/share/nginx/html/
RUN chmod -R a+rX /usr/share/nginx/html
EXPOSE 80
