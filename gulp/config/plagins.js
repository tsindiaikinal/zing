import replace from "gulp-replace"; // поиск и замена
import plumber from "gulp-plumber"; // обработка ошибок
import notify from "gulp-notify"; // сообщения (пдсказки)
import newer from "gulp-newer"; // проверка обновления
import ifPlug from "gulp-if"; // для управления потоком виниловых объектов
import browsersync from "browser-sync";

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  newer: newer,
  if: ifPlug,
  browsersync: browsersync,
};
