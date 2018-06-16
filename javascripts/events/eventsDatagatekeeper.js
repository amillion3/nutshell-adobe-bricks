const eventsDom = require('./eventsDom');
const {getConfig,} = require('../firebase/firebaseApi');

//  --------- GET GET GET GET  ---------  //
const eventToGET = () => {
  let eventsArray = [];
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: `${getConfig().databaseURL}/events.json`,
    })
      .done(allEvents => {
        if (allEvents !== null) {
          eventsArray = Object.values(allEvents);
        }
        resolve(eventsArray);
      })
      .fail(error => {
        console.error('Error in promise', error);
        reject(error);
      });
  });
};
const requestEventGET = () => {
  eventToGET()
    .then(allEvents => {
      return allEvents;
    })
    .then(allEvents => {
      eventsDom.buildAllEventsString(allEvents);
    })
    .catch(error => {
      console.error('Error during Firebase request', error);
    });
};
//  ------end GET GET GET GET  ---------  //

//  ---------  POST POST POST  ---------  //
const eventToPOST = addThisEvent => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${getConfig().databaseURL}/events.json`,
      data: JSON.stringify(addThisEvent),
    })
      .done(result => {
        resolve(result);
      })
      .fail(err => {
        console.error(err);
        reject(err);
      });
  });
};
const requestEventPOST = addThisEvent => {
  eventToPOST(addThisEvent)
    .then(results => {
      // print to DOM
    })
    .catch(err => {
      console.error('Error on POST process, ', err);
    });
};
//  ------end  POST POST POST  ---------  //

//  ---------  DELETE DELETE   ---------  //
const eventToDELETE = deleteThisEvent => {};
const requestEventDELETE = deleteThisEvent => {
  eventToDELETE(deleteThisEvent).then().catch();
};
//  ------end  DELETE DELETE   ---------  //

//  --------- PUT PUT PUT PUT  ---------  //
const eventToPUT = updateThisEvent => {};
const requestEventPUT = updateThisEvent => {
  eventToPUT(updateThisEvent).then().catch();
};
//  ------end PUT PUT PUT PUT  ---------  //

module.exports = {
  requestEventGET,
  requestEventPOST,
  requestEventDELETE,
  requestEventPUT,
};
