export const datetostr = (year,month,day,format) => {
  const replaceStrArray = {
    'YYYY': year,
    'Y': year,
    'MM': ('0' + (month)).slice(-2),
    'M': month,
    'DD': ('0' + (day)).slice(-2),
    'D': day,
  };

  const replaceStr = '(' + Object.keys(replaceStrArray).join('|') + ')';
  const regex = new RegExp(replaceStr, 'g');

  const ret = format.replace(regex, function (str) {
    return replaceStrArray[str];
  });

  return ret;
}

export const displayDate = (d) => {
  if(d==null){
    return "";    
  }
  const dt = new Date(d);
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const date = dt.getDate();

  return (year + "年" + month + "月" + date + "日");
}

export const formatDate = (d) => {
  if(d==null){
    return "";
  }
  const dt = new Date(d);
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const date = dt.getDate();

  return (year + "/" + month + "/" + date);
}
