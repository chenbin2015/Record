module.exports = {
 root: true,
 parser: 'babel-eslint',
 parserOptions: {
   sourceType: 'module'
 },
 env: {
   browser: true,
 },
 plugins: [
   "html"
 ],
 extends: 'standard',
 rules: {
   "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
   "no-tabs": 0
 }
}