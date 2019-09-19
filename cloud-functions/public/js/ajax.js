const post = async (url, body) => {
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const response = await request.json()
    return Promise.resolve(response)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

const put = async (url, body) => {
  try {
    const request = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const response = await request.json()
    return Promise.resolve(response)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

const get = async url => {
  try {
    const request = await fetch(url)
    const response = await request.json()
    return Promise.resolve(response)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

const store = (storeName, store) => {
  localStorage.setItem(storeName, store)
}
