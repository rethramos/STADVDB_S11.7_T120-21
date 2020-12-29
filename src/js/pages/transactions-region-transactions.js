import createTable from '../helpers/table-helper';

const ttypeSelect = document.getElementById('k_symbol');
const regionTransactionsContainer = document.getElementById(
  'region-transactions-table',
);
const noRecordsFound = document.getElementById('no-records');

const regionTransactionsTable = createTable(
  `#${regionTransactionsContainer.id}`,
  {
    ajaxResponse: (url, params, response) => {
      return response;
    },
    dataLoaded: data => {
      const force = !data.length;

      regionTransactionsContainer.classList.toggle('d-none', force);
      noRecordsFound.classList.toggle('d-none', !force);
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
