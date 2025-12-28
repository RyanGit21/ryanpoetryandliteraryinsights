import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const { data: posts } = await sb
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false })

/* ---------- GENERATE POSTS ---------- */

posts.forEach(post => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${post.title}</title>
<meta name="description" content="${post.meta_description}">
<link rel="canonical" href="https://poeticandliteraryinsights.com/posts/${post.slug}">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<article>
  <h1>${post.title}</h1>
  <div class="content">${post.content}</div>
</article>

</body>
</html>
`
  fs.writeFileSync(`public/posts/${post.slug}.html`, html)
})

/* ---------- GENERATE INDEX ---------- */

const indexHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Poetic & Literary Insights</title>
<meta name="description" content="Modern poetry, reflection, and clarity through words.">
<link rel="canonical" href="https://poeticandliteraryinsights.com/">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<main>
${posts.map(p => `
  <article>
    <h2><a href="/posts/${p.slug}.html">${p.title}</a></h2>
    <p>${p.excerpt}</p>
  </article>
`).join('')}
</main>

</body>
</html>
`

fs.writeFileSync('public/index.html', indexHTML)