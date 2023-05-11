
import _ from 'lodash';

export default function pagination(users,pageSize ,pageNumber) {
    const startIndex = pageSize * pageNumber;
    return _(users).slice(startIndex).take(pageSize).value();
  
}

