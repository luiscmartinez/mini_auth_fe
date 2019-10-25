export function createPopup(
  url,
  redirectUrl = '/',
  redirectCB,
  title = 'OAuth',
  w = 460,
  h = 560
) {
  //* Extra OStack trickier, to handel dual screens. Sets x (left) and y (top) position of window on screen.
  const dualScreenLeft = window.screenLeft ? window.screenLeft : window.screenX
  const dualScreenTop = window.screenTop ? window.screenTop : window.screenY

  const width = window.outerWidth
  const height = window.outerHeight

  // Centers popup on screen
  const left = (width - w) / 2 + dualScreenLeft
  const top = (height - h) / 2 + dualScreenTop
  // Creates and opens auth popup.
  const popUpWindow = window.open(
    url,
    title,
    `resizable=no,titlebar=yes,menubar=no,dependent=no,scrollbars=no,width=${w},height=${h},top=${top},left=${left}`
  )

  // Sets focus on the auth popup if window exist
  if (window.focus && !popUpWindow) popUpWindow.focus()
  // Check to see if auth popup has closed every 0.5s. If so, clear interval interval
  // and force refresh to root to check if user has successfully authenticated.
  const timer = setInterval(() => {
    if (popUpWindow.closed) {
      redirectCB()
      clearInterval(timer)
    }
  }, 1000)
}
