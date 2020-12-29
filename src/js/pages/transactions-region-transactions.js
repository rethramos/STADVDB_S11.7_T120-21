import createTable from '../helpers/table-helper';

const ttypeSelect = document.getElementById('k_symbol');
const regionTransactionsContainer = document.getElementById(
  'region-transactions-table',
);
const progressText = document.getElementById('progress-text');

const regionTransactionsTable = createTable(
  `#${regionTransactionsContainer.id}`,
  {
    ajaxRequesting: (url, params) => {
      progressText.innerHTML = 'Loading...';
    },
    ajaxResponse: (url, params, response) => {
      return response;
    },
    ajaxError: (xhr, textStatus, errorThrown) => {
      regionTransactionsContainer.classList.add('d-none');
      progressText.innerHTML = xhr.statusText;
      progressText.classList.remove('d-none');
    },
    dataLoaded: data => {
      if (data.length) {
        regionTransactionsContainer.classList.remove('d-none');
        progressText.classList.add('d-none');
      } else {
        regionTransactionsContainer.classList.add('d-none');
        progressText.innerHTML = 'No records found';
        progressText.classList.remove('d-none');
      }
    },
  },
);

regionTransactionsTable.setData('/api/region-transactions', {
  k_symbol: ttypeSelect.value,
});

ttypeSelect.onchange = e => {
  const k_symbol = ttypeSelect.value;

  regionTransactionsTable.setData(regionTransactionsTable.getAjaxUrl(), {
    k_symbol,
  });
};
