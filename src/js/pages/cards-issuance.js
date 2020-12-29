import createTable from '../helpers/table-helper';

const ctypeSelect = document.getElementById('type');
const thresholdInput = document.getElementById('threshold');
const issuanceContainer = document.getElementById('issuance-table');
const progressText = document.getElementById('progress-text');

const issuanceTable = createTable(`#${issuanceContainer.id}`, {
  ajaxRequesting: (url, params) => {
    progressText.innerHTML = 'Loading...';
  },
  ajaxResponse: (url, params, response) => {
    return response;
  },
  ajaxError: (xhr, textStatus, errorThrown) => {
    issuanceContainer.classList.add('d-none');
    progressText.innerHTML = xhr.statusText;
    progressText.classList.remove('d-none');
  },
  dataLoaded: data => {
    if (data.length) {
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

ctypeSelect.onchange = e => {
  const type = ctypeSelect.value;
  const threshold = thresholdInput.value;

  issuanceTable.setData(issuanceTable.getAjaxUrl(), {
    type,
    threshold,
  });
};

thresholdInput.onchange = e => {
  const type = ctypeSelect.value;
  const threshold = thresholdInput.value;

  issuanceTable.setData(issuanceTable.getAjaxUrl(), {
    type,
    threshold,
  });
};
