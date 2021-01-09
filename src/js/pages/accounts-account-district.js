import createTable from '../helpers/table-helper';

const queryTimeText = document.getElementById('query-time-text');
const queryTimeVal = document.getElementById('query-time-val');
const accountIDInput = document.getElementById('account_id');
const accountDistrictContainer = document.getElementById(
  'account-district-table',
);
const progressText = document.getElementById('no-records');

const accountDistrictTable = createTable(`#${accountDistrictContainer.id}`, {
  pagination: 'local',
  paginationSize: 10,
  ajaxRequesting: (url, params) => {
    queryTimeText.classList.add('d-none');
    progressText.innerHTML = 'Loading...';
  },
  ajaxResponse: (url, params, response) => {
    queryTimeVal.innerHTML = response.duration;
    queryTimeText.classList.remove('d-none');

    return response.results;
  },
  ajaxError: (xhr, textStatus, errorThrown) => {
    queryTimeText.classList.add('d-none');
    accountDistrictContainer.classList.add('d-none');
    progressText.innerHTML = xhr.statusText;
    progressText.classList.remove('d-none');
  },
  dataLoaded: data => {
    if (data.length) {
      queryTimeText.classList.remove('d-none');
      accountDistrictContainer.classList.remove('d-none');
      progressText.classList.add('d-none');
    } else {
      accountDistrictContainer.classList.add('d-none');
      progressText.innerHTML = 'No records found';
      progressText.classList.remove('d-none');
    }
  },
});

accountDistrictTable.setData('/api/account-district', {
  account_id: accountIDInput.value,
});

document.getElementById('form-fnd-account-district').onsubmit = e => {
  e.preventDefault();
  let optimized = document.getElementById('optimized')
  accountDistrictTable.setData(accountDistrictTable.getAjaxUrl(), {
    account_id: accountIDInput.value,
    optimized: optimized.checked
  });
};
