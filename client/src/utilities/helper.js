const shallowCopyObj = (obj) => {
  return Object.assign({}, obj);
}

const deepCopyObj = (obj) => {
  const copyObj = () => {
    let copy = {};

    for (var key in obj) {
      copy[key] = deepCopyObj(obj[key]);
    }

    return copy;
  };

  const copyArr = () => {
    if (obj.length) {
      return obj.map(item => {
        return deepCopyObj(item);
      });
    } else {
      return [];
    }
  };

  let type = typeof obj;

  // typeof [Array] returns "object" so this is needed to check for arrays
  if (type === 'object' && Array.isArray(obj)) {
    type = 'array';
  }

  if (obj === null) {
    console.log('null type');
    return null;
  } else if (type === 'object') {
    return copyObj();
  } else if (type === 'array') {
    return copyArr();
  } else {
    return obj;
  }
}

const formatMessageTimestamp = (timestamp) => {
  let date = new Date(timestamp);
  let dateString = date.toLocaleDateString();
  
  let mdy = dateString.split('/');
  mdy[2] = mdy[2] % 100; // converts 4-digit year to 2 digits
  dateString = mdy.join('/');
  
  let timeString = date.toLocaleTimeString();
  timeString = timeString.replace(/(:\d{2}\s)/, ' '); // removes the seconds data from the timeString
  
  let formattedTimestamp = dateString + ' ' + timeString;
  return formattedTimestamp;
}

export {
  shallowCopyObj,
  deepCopyObj,
  formatMessageTimestamp
};