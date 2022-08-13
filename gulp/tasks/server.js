export const serv = () => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.path.build.html}`,
    },
    notify: true,
    port: 3000,
  });
}