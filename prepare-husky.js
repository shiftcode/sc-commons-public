#!/usr/bin/env node

if (process.env.GITHUB_ACTIONS === 'true') {
    console.log(`won't install husky hooks since running in github action`)
} else {
    const husky = await import('husky')
    husky.install()
}
