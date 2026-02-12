(function() {
  const addCustomPostOutdateNotice = () => {
    const ele = document.getElementById('custom-post-outdate-notice')
    if (!ele) return

    const limitDay = parseInt(ele.getAttribute('data-limit'))
    const postUpdate = ele.getAttribute('data-update')
    const postCreated = ele.getAttribute('data-created')
    
    const diffDate = (date) => {
      const dateNow = new Date()
      const datePost = new Date(date)
      const diffTime = dateNow.getTime() - datePost.getTime()
      return Math.floor(diffTime / (24 * 3600 * 1000))
    }

    const diffCreated = diffDate(postCreated)
    const diffUpdated = diffDate(postUpdate)

    if (diffUpdated >= limitDay) {
      ele.innerHTML = `请注意，本文编写于 ${diffCreated} 天前，最后修改于 ${diffUpdated} 天前，其中某些信息可能已经过时。`
      ele.style.display = 'block'
    } else {
      ele.style.display = 'none'
    }
  }

  addCustomPostOutdateNotice()
  document.addEventListener('pjax:complete', addCustomPostOutdateNotice)
})()
