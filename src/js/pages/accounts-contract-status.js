import createTable from '../helpers/table-helper';

const contractStatusContainer = document.getElementById(
  'contract-status-table',
);
const noRecordsFound = document.getElementById('no-records');

const contractStatusTable = createTable(
  `#${contractStatusContainer.id}`,
  {
    ajaxURL: '/api/contract-status',
    pagination: 'local',
    paginationSize: 10,
  },
);

document.getElementById('form-cnt-contract-status').onsubmit = e => {
  e.preventDefault();

  let account_id = document.getElementById('account_id').value;

  contractStatusTable
    .setData(contractStatusTable.getAjaxUrl(), {
      account_id,
    })
    .then(() => {
      let force = !contractStatusTable.getDataCount();

      contractStatusContainer.classList.toggle('d-none', force);
      noRecordsFound.classList.toggle('d-none', !force);
    });
};
