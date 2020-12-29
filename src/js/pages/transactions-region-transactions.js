import createTable from '../helpers/table-helper';

const ttypeSelect = document.getElementById('k_symbol');
const regionTransactionsContainer = document.getElementById(
  'region-transactions-table',
);
const noRecordsFound = document.getElementById('no-records');

const regionTransactionsTable = createTable(
  `#${regionTransactionsContainer.id}`,
  {
    pagination: 'local',
    paginationSize: 10,

    ajaxResponse: (url, params, response) => {
      const force = !response.length;

      regionTransactionsContainer.classList.toggle('d-none', force);
      noRecordsFound.classList.toggle('d-none', !force);

      return response;
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
