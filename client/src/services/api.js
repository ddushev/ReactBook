async function request(url, options) {
    try {
        const response = await fetch(url, options)
        if (response.status == 204) {
            return response;
        }

        if (response.ok != true) {
            throw await response.json();
        }

        return response.json();

    } catch (error) {
        throw (error);
    }
}

function createOptions(method, data, token, userId) {
    const options = {
        method,
        headers: {}
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if (token) {
        if ((data?.bookedBy && data?._ownerId != userId) || data?.bookedBy === '') {
            console.log('X-Admin');
            options.headers['X-Admin'] = token;
        } else {
            console.log('X-Authorization');
            options.headers['X-Authorization'] = token;
        }
    }

    return options;
}

export function requestFactory(token, userId) {
    function get(endpoint) {
        return request(endpoint, createOptions('get', null, token));
    }

    function post(endpoint, data) {
        return request(endpoint, createOptions('post', data, token, userId));
    }

    function update(endpoint, data) {
        return request(endpoint, createOptions('put', data, token, userId));
    }

    function del(endpoint) {
        return request(endpoint, createOptions('delete', null, token));
    }
    return {
        get,
        post,
        update,
        del
    }
}


