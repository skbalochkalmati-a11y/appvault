[netlify.toml.txt](https://github.com/user-attachments/files/32479766/netlify.toml.txt)

[build]
  publish = "."
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
