const addService = (tagName, serviceTime) => {
    return new Promise((resolve, reject) => {
      fetch( '/api/services', {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
            tagName : tagName, 
            serviceTime: serviceTime
        })
      })
        .then((res) => {
          if (!res.ok) {
            const error = new Error(`${res.status}: ${res.statusText}`);
            error.response = res;
            throw error;
          }
          resolve(res.json());
        })
        .catch((err) => {
            reject({ message: err.message });
        });
    });
  }

  export { addService }