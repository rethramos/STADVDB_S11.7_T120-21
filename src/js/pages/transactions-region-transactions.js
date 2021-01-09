import createTable from '../helpers/table-helper';

const queryTimeText = document.getElementById('query-time-text');
const queryTimeVal = document.getElementById('query-time-val');
const ttypeSelect = document.getElementById('k_symbol');
const regionTransactionsContainer = document.getElementById(
  'region-transactions-table',
);
const progressText = document.getElementById('progress-text');

const regionTransactionsTable = createTable(
  `#${regionTransactionsContainer.id}`,
  {
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
      regionTransactionsContainer.classList.add('d-none');
      progressText.innerHTML = xhr.statusText;
      progressText.classList.remove('d-none');
    },
    dataLoaded: data => {
      if (data.length) {
        queryTimeText.classList.remove('d-none');
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

let optimized = document.getElementById('optimized');

ttypeSelect.onchange = e => {
  regionTransactionsTable.setData(regionTransactionsTable.getAjaxUrl(), {
    k_symbol: ttypeSelect.value,
    optimized: optimized.checked,
  });
};

optimized.onclick = e => {
  regionTransactionsTable.setData(regionTransactionsTable.getAjaxUrl(), {
    k_symbol: ttypeSelect.value,
    optimized: optimized.checked,
  });
};
