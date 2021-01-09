import createTable from '../helpers/table-helper';

const queryTimeText = document.getElementById('query-time-text');
const queryTimeVal = document.getElementById('query-time-val');
const ctypeSelect = document.getElementById('type');
const thresholdInput = document.getElementById('threshold');
const issuanceContainer = document.getElementById('issuance-table');
const progressText = document.getElementById('progress-text');

const issuanceTable = createTable(`#${issuanceContainer.id}`, {
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
    issuanceContainer.classList.add('d-none');
    progressText.innerHTML = xhr.statusText;
    progressText.classList.remove('d-none');
  },
  dataLoaded: data => {
    if (data.length) {
      queryTimeText.classList.remove('d-none');
      issuanceContainer.classList.remove('d-none');
      progressText.classList.add('d-none');
    } else {
      issuanceContainer.classList.add('d-none');
      progressText.innerHTML = 'No records found';
      progressText.classList.remove('d-none');
    }
  },
});

issuanceTable.setData('/api/issuance', {
  type: ctypeSelect.value,
  threshold: thresholdInput.value,
});

let optimized = document.getElementById('optimized');

ctypeSelect.onchange = e => {
  const type = ctypeSelect.value;
  const threshold = thresholdInput.value;

  issuanceTable.setData(issuanceTable.getAjaxUrl(), {
    type,
    threshold,
    optimized: optimized.checked,
  });
};

thresholdInput.onchange = e => {
  const type = ctypeSelect.value;
  const threshold = thresholdInput.value;

  issuanceTable.setData(issuanceTable.getAjaxUrl(), {
    type,
    threshold,
    optimized: optimized.checked,
  });
};

optimized.onclick = e => {
  issuanceTable.setData(issuanceTable.getAjaxUrl(), {
    type: ctypeSelect.value,
    threshold: thresholdInput.value,
    optimized: optimized.checked,
  });
};
