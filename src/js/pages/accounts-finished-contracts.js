import createTable from '../helpers/table-helper';

const finishedContractsContainer = document.getElementById(
  'finished-contracts-table',
);
const noRecordsFound = document.getElementById('no-records');

const finishedContractsTable = createTable(
  `#${finishedContractsContainer.id}`,
  {
    ajaxURL: '/api/finished-contracts',
    pagination: 'local',
    paginationSize: 10,
  },
);

document.getElementById('form-cnt-finished-contracts').onsubmit = e => {
  e.preventDefault();

  let account_id = document.getElementById('account_id').value;

  finishedContractsTable
    .setData(finishedContractsTable.getAjaxUrl(), {
      account_id,
    })
    .then(() => {
      let force = !finishedContractsTable.getDataCount();

      finishedContractsContainer.classList.toggle('d-none', force);
      noRecordsFound.classList.toggle('d-none', !force);
    });
};
