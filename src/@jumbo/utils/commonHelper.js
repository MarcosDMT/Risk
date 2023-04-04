import { useEffect, useState } from 'react';

export const capitalizeFLetter = string => {
  return string[0].toUpperCase() + string.slice(1);
};
export const backGroundColors = [
  ['#22bb33 -18.96%', '#018c11 108.17%'],
  ['#e78617 -18.96%', '#d97604 108.17%'],
  ['#F25247 -18.96%', '#B72D23 108.17%'],
  ['#5AB9FE -18.96%', '#1372B7 108.17%'],
];

export const validatePermission = (permission, permissionsList) => {
  let can = false;
  if (Array.isArray(permissionsList) && permissionsList.length > 0) {
    can = permissionsList.includes(permission);
  }
  return can;
};

export const getAccountStatus = status => {
  let response = {
    label: 'Disabled',
    color: 'red',
  };
  if (status) {
    response.label = 'Active';
    response.color = 'green';
  }
  return response;
};

export const getComplianceStatus = status => {
  let response = {
    label: 'Not Complied',
    color: 'red',
  };
  if (status === 0) {
    response.label = 'Not Complied';
    response.color = 'red';
  } else if (status === 2) {
    response.label = 'Comply Now';
    response.color = 'orange';
  } else if (status === 1) {
    response.label = 'Complied';
    response.color = 'green';
  } else if (status === 3) {
    response.label = 'Waivered';
    response.color = 'green';
  }
  return response;
};

export const getApprovalStatus = status => {
  let response = {
    label: 'Pending Approval',
    color: 'red',
  };
  if (status === 'Approved') {
    response.label = 'Approved';
    response.color = 'green';
  }
  return response;
};

export function blendColors(color1, color2, percentage) {
  // check input
  color1 = color1 || '#000000';
  color2 = color2 || '#ffffff';
  percentage = percentage || 0.5;

  // output to canvas for proof
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = 90;
  cvs.height = 25;
  document.body.appendChild(cvs);
  if (color1.length === 4) color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
  else color1 = color1.substring(1);
  if (color2.length === 4) color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
  else color2 = color2.substring(1);

  // 3: we have valid input, convert colors to rgb
  color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
  color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];

  // 4: blend
  var color3 = [
    (1 - percentage) * color1[0] + percentage * color2[0],
    (1 - percentage) * color1[1] + percentage * color2[1],
    (1 - percentage) * color1[2] + percentage * color2[2],
  ];

  // console.log('c3 => [' + color3.join(', ') + ']');

  // 5: convert to hex
  color3 = '#' + int_to_hex(color3[0]) + int_to_hex(color3[1]) + int_to_hex(color3[2]);

  // // color3 in the middle
  // ctx.fillStyle = color3;
  // ctx.fillRect(30, 0, 30, 25);

  // return hex
  return color3;
}
function int_to_hex(num) {
  var hex = Math.round(num).toString(16);
  if (hex.length === 1) hex = '0' + hex;
  return hex;
}

export const isValidEmail = value => {
  return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(value);
};

// export const getAutoCompleteValue = (options, value, intVal = { id: '', name: '' }) => {
//   return Array.isArray(options) ? options.find(option => option.id === value) ?? null : null;
// };

export const getAutoCompleteValue = (options, value, filterField = 'id') => {
  return Array.isArray(options) ? options.find(option => option[filterField] === value) ?? null : null;
};

export const getFilteredOptions = (options, object, filterField, objectField = filterField) => {
  if (object) {
    return Array.isArray(options) ? options.filter(option => option[objectField] === object[filterField]) : [];
  }
  return [];
};

// export const mapData = (values, fields) => {

// }

export const idGenerator = () => {
  return Math.floor(Math.random() * 100000);
};

export const linkify = inputText => {
  let replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gim;
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z0-9\\-]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
};

export const geValidUrl = (url, ubSecureUrl = false) => {
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    if (ubSecureUrl) {
      return 'http://' + url;
    }
    return 'https://' + url;
  }

  return url;
};

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value, delay],
  );

  return debouncedValue;
};
