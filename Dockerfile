# المرحلة الأولى: استخدم خادم الويب Nginx كصورة أساسية
FROM nginx:1.25.3-alpine

# **السطر الجديد**: انسخ ملف إعدادات Nginx المخصص الذي أنشأناه
# هذا السطر يخبر Nginx بالاستماع على المنفذ 8080
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# انسخ ملفات موقعك إلى المجلد الذي يخدم منه Nginx الملفات
COPY . /usr/share/nginx/html

# المنفذ الذي سيعمل عليه الخادم الآن هو 8080
EXPOSE 8080

# الأمر الذي سيتم تشغيله عند بدء الحاوية
CMD ["nginx", "-g", "daemon off;"]
