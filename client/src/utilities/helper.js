const shallowCopyObj = (obj) => {
  return Object.assign({}, obj);
}

const formatMessageTimestamp = (timestamp) => {
  let date = new Date(timestamp);
  let dateString = date.toLocaleDateString();
  
  let mdy = dateString.split('/');
  mdy[2] = mdy[2] % 100; // converts 4-digit year to 2 digits
  dateString = mdy.join('/');
  
  let timeString = date.toLocaleTimeString();
  timeString = timeString.replace(/(:\d{2}\s)/, ' ');
  
  let formattedTimestamp = dateString + ' ' + timeString;
  return formattedTimestamp;
}

export {
  shallowCopyObj,
  formatMessageTimestamp
};