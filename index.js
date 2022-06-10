const YOU_RPM_ACCOUNT = 000000;
let APIKEY = 'NRAK-.....';

if (typeof $http === 'undefined') {
  var $http = require("request");
  APIKEY = 'NRAK-.....';
} else {
  APIKEY = $secure.APIKEY
}

const genericServiceCall = function (responseCodes, options, success) {
  !('timeout' in options) && (options.timeout = 10000) //add a timeout if not already specified
  let possibleResponseCodes = responseCodes
  if (typeof (responseCodes) == 'number') { //convert to array if not supplied as array
    possibleResponseCodes = [responseCodes]
  }
  return new Promise((resolve, reject) => {
    $http(options, function callback(error, response, body) {
      if (error) {
        reject(`Connection error on url '${options.url}'`)
      } else {
        if (!possibleResponseCodes.includes(response.statusCode)) {
          let errmsg = `Expected [${possibleResponseCodes}] response code but got '${response.statusCode}' from url '${options.url}'`
          reject(errmsg)
        } else {
          resolve(success(body, response, error))
        }
      }
    });
  })
}


async function getEnvironmentAttributes(accountId, apikey) {
  let hasNext = true;
  let results = [];
  let nextCursor = '';
  let keys = [];
  do {
    const graphQLQuery = `{
    actor {
      account(id: ${accountId}) {
        agentEnvironment {
          environmentAttributes (filter: {contains: "Version"}, cursor: "${nextCursor}"){
            nextCursor
            results {
              attributes {
                attribute
                value
              }
              details {
                name
                host
                language
                id
              }
              applicationGuids
            }
          }
        }
      }
    }
  }`;

    const options = {
      url: `https://api.newrelic.com/graphql`,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "API-Key": apikey
      },
      json: {
        query: graphQLQuery
      }
    };
    const result = await genericServiceCall([200], options, (body) => body);

    const records = result.data.actor.account.agentEnvironment.environmentAttributes.results.map(x => ({
      guid: x.applicationGuids[0],
      ...x.details,
      name: `"${x.details.name}"`,
      ...x.attributes.reduce((prev, curr) => {
        if (keys.indexOf(curr.attribute) < 0) {
          keys.push(curr.attribute)
        }

        return {
          ...prev,
          [curr.attribute]: '"' + curr.value.replaceAll('\n', '').replaceAll('"', '') + '"',
        }
      }, {})
    }));

    results = [
      ...results,
      ...records
    ];

    nextCursor = result.data.actor.account.agentEnvironment.environmentAttributes.nextCursor;
    hasNext = !!nextCursor;
  } while (hasNext);


  const flatten = results.map(x => {
    let obj = {
      guid: x.guid,
      name: x.name,
      host: x.host,
      language: x.language,
      id: x.id,
    };

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      obj = {
        ...obj,
        [key]: x[key] || null
      }
    }

    return obj;
  });

  return flatten;
}

getEnvironmentAttributes(YOU_RPM_ACCOUNT, APIKEY).then(x => {
  const headers = Object.keys(x[0]);
  let csv = headers.join(',') + '\n';

  for (let u = 0; u < x.length; u++) {
    const row = Object.values(x[u]);
    csv += row.join(',') + '\n';
  }

  console.log(csv);
});