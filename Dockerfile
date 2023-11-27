FROM nginx

# 映射 HTML
COPY ./src/.vuepress/dist ./usr/share/nginx/html
# Conf

COPY src/.vuepress/dist/conf/nginx.conf ./etc/nginx/conf.conf
COPY src/.vuepress/dist/conf/conf.d ./etc/nginx/conf.d

EXPOSE 82

