;(function () {
  function shouldShow (cfg) {
    if (!cfg || cfg.enable === false) return false
    var freq = cfg.frequency || 'daily'
    var date = new Date().toISOString().slice(0, 10)
    var base = (cfg.key || 'site_popup_seen')
    var dailyKey = base + '_' + date
    var snoozeKey = base + '_snooze_' + date
    if (freq === 'daily') {
      if (localStorage.getItem(dailyKey)) return false
      localStorage.setItem(dailyKey, '1')
      return true
    } else {
      if (localStorage.getItem(snoozeKey)) return false
      return true
    }
  }

  function mount () {
    if (!window.__POPUP_HTML__) return
    var cfg = window.__POPUP_CFG__ || {}
    if (!shouldShow(cfg)) return
    var old = document.getElementById('site-popup-mask')
    if (old) old.remove()
    var mask = document.createElement('div')
    mask.id = 'site-popup-mask'
    var box = document.createElement('div')
    box.id = 'site-popup-box'
    var close = document.createElement('button')
    close.id = 'site-popup-close'
    close.type = 'button'
    close.textContent = (cfg.close_text || '关闭')
    var actions = document.createElement('div')
    actions.id = 'site-popup-actions'
    var check = document.createElement('input')
    check.type = 'checkbox'
    check.id = 'site-popup-check'
    var label = document.createElement('label')
    label.htmlFor = 'site-popup-check'
    label.textContent = (cfg.check_text || '今日不再提示')
    var content = document.createElement('div')
    content.id = 'site-popup-content'
    content.innerHTML = window.__POPUP_HTML__
    actions.appendChild(check)
    actions.appendChild(label)
    box.appendChild(actions)
    box.appendChild(close)
    box.appendChild(content)
    mask.appendChild(box)
    document.body.appendChild(mask)
    function hide () {
      mask.remove()
    }
    close.addEventListener('click', hide)
    mask.addEventListener('click', function (e) {
      if (e.target === mask) hide()
    })
    check.addEventListener('change', function () {
      if (check.checked) {
        var date = new Date().toISOString().slice(0, 10)
        var key = (((cfg && cfg.key) || 'site_popup_seen')) + '_snooze_' + date
        localStorage.setItem(key, '1')
        hide()
      }
    })
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount)
  } else {
    mount()
  }
  document.addEventListener('pjax:complete', mount)
})()
