import createTable from '../helpers/table-helper';

const statusSelect = document.getElementById('status');
const loanCountContainer = document.getElementById('loan-count-table');
const noRecordsFound = document.getElementById('no-records');
const loanCountTable = createTable(`#${loanCountContainer.id}`, {
  // ajaxURL: '/api/loan-count',
  pagination: 'local',
  paginationSize: 10,
});

loanCountTable.setData('/api/loan-count', { status: 'A' });

statusSelect.onchange = e => {
  const status = statusSelect.value;
  console.log(status);
  loanCountTable.setData(loanCountTable.getAjaxUrl(), { status }).then(() => {
    const force = !loanCountTable.getDataCount();

    loanCountContainer.classList.toggle('d-none', force);
    noRecordsFound.classList.toggle('d-none', !force);
  });
};
