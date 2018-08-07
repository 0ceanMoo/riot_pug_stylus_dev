app-header
  h1 header
  style(type="stylus").
    h1
      background red
      color white
app-content
  p Hello {opts.title}
  button(onclick="{hello}") Click me
  script.
    hello() {
      const msg = `Hello ${opts.title}`
      alert(msg)
    }
app-footer
  small footer
  style(type="stylus").
    small
      display block
      text-align center
app
  app-header
  app-content(title="{opts.title}")
  app-footer
