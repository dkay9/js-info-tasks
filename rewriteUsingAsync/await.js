async function loadJson(url){
    let response = await fetch(url)

    if(response.status == 2){
        let json = await response.json()
        return json
    }
    throw new Error(response.status)
}
loadJson('https://javascript.info/no-such-user.json')
    .catch(alert)


class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    let response = await fetch(url)
    if(response.status == 200){
        return response.json()
    } else{
        throw new HttpError(response)
    }
}

async function demoGitubUser() {
    let user;
    while(true) {
      let name = prompt("Enter a name?", "iliakan");
  
      try {
        user = await loadJson(`https://api.github.com/users/${name}`);
        break; // no error, exit loop
      } catch(err) {
        if (err instanceof HttpError && err.response.status == 404) {
          // loop continues after the alert
          alert("No such user, please reenter.");
        } else {
          // unknown error, rethrow
          throw err;
        }
      }
    }
}

//     Call async from non-async
//We have a “regular” function called f. How can you call the async function wait() and use its result inside of f?

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  wait().then(result => alert(result))
}

f()