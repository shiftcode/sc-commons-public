if(process.env.GITHUB_ACTIONS === 'true'){
  console.log(`won't install husky hooks since running in github action`)
}else{
  console.log('install husky hooks')
  require('husky').install()
}