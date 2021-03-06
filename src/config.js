const env = process.env;

module.exports = {
  port: env.PORT || 3000,
  host: env.HOST || 'localhost',
  isDev: env.NODE_ENV !== 'production',
  isBrowser: typeof window !== 'undefined',
};
