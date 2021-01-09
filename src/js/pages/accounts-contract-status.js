import createTable from '../helpers/table-helper';

const queryTimeText = document.getElementById('query-time-text');
const queryTimeVal = document.getElementById('query-time-val');
const contractStatusForm = document.getElementById('form-cnt-contract-status');
const accountIDInput = document.getElementById('account_id');
const statusSelect = document.getElementById('status');
const contractStatusContainer = document.getElementById(
  'contract-status-table',
);
const progressText = document.getElementById('progress-text');

const contractStatusTable = createTable(`#${contractStatusContainer.id}`, {
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
    contractStatusContainer.classList.add('d-none');
    progressText.innerHTML = xhr.statusText;
    progressText.classList.remove('d-none');
  },
  dataLoaded: data => {
    if (data.length) {
      queryTimeText.classList.remove('d-none');
      contractStatusContainer.classList.remove('d-none');
      progressText.classList.add('d-none');
    } else {
      contractStatusContainer.classList.add('d-none');
      progressText.innerHTML = 'No records found';
      progressText.classList.remove('d-none');
    }
  },
});

contractStatusTable.setData('/api/contract-status', {
  account_id: accountIDInput.value,
  status: statusSelect.value,
});

contractStatusForm.onchange = e => {
  let account_id = accountIDInput.value;
  let status = statusSelect.value;
  let optimized = document.getElementById('optimized');

  contractStatusTable.setData(contractStatusTable.getAjaxUrl(), {
    account_id,
    status,
    optimized: optimized.checked,
  });
};

contractStatusForm.onsubmit = e => {
  e.preventDefault();
};
