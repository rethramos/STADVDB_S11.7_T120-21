import createTable from '../helpers/table-helper';

const unemploymentRateContainer = document.getElementById(
  'unemployment-rate-table',
);
const noRecordsFound = document.getElementById('no-records');

const unemploymentRateTable = createTable(`#${unemploymentRateContainer.id}`, {
  ajaxURL: '/api/unemployment-rate',
});

document.getElementById('form-region').onsubmit = e => {
  e.preventDefault();

  let region = document.getElementById('region').value;

  unemploymentRateTable
    .setData(unemploymentRateTable.getAjaxUrl(), {
      region,
    })
    .then(() => {
      let force = !unemploymentRateTable.getDataCount();

      unemploymentRateContainer.classList.toggle('d-none', force);
      noRecordsFound.classList.toggle('d-none', !force);
    });
};
