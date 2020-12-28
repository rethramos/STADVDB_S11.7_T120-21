import createTable from '../helpers/table-helper';

const salaryContainer = document.getElementById('salary-table');
const noRecordsFound = document.getElementById('no-records');

const salaryTable = createTable(`#${salaryContainer.id}`, {
  ajaxURL: '/api/salary',
});

document.getElementById('form-avg-salary').onsubmit = e => {
  e.preventDefault();

  let region = document.getElementById('region').value;

  salaryTable
    .setData(salaryTable.getAjaxUrl(), {
      region,
    })
    .then(() => {
      let force = !salaryTable.getDataCount();

      salaryContainer.classList.toggle('d-none', force);
      noRecordsFound.classList.toggle('d-none', !force);
    });
};
