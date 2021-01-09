import createTable from '../helpers/table-helper';

const queryTimeText = document.getElementById('query-time-text');
const queryTimeVal = document.getElementById('query-time-val');
const statusSelect = document.getElementById('status');
const loanCountContainer = document.getElementById('loan-count-table');
const progressText = document.getElementById('no-records');
const loanCountTable = createTable(`#${loanCountContainer.id}`, {
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
    loanCountContainer.classList.add('d-none');
    progressText.innerHTML = xhr.statusText;
    progressText.classList.remove('d-none');
  },
  dataLoaded: data => {
    if (data.length) {
      queryTimeText.classList.remove('d-none');
      loanCountContainer.classList.remove('d-none');
      progressText.classList.add('d-none');
    } else {
      loanCountContainer.classList.add('d-none');
      progressText.innerHTML = 'No records found';
      progressText.classList.remove('d-none');
    }
  },
});

loanCountTable.setData('/api/loan-count', { status: statusSelect.value });

let optimized = document.getElementById('optimized');

statusSelect.onchange = e => {
  const status = statusSelect.value;
  loanCountTable.setData(loanCountTable.getAjaxUrl(), {
    status,
    optimized: optimized.checked,
  });
};

optimized.onclick = e => {
  loanCountTable.setData(loanCountTable.getAjaxUrl(), {
    status: statusSelect.value,
    optimized: optimized.checked,
  });
};
